#!/bin/bash

# ============================================
# WordPress-WooCommerce Integration Setup
# ============================================
# This script configures WordPress to work with Tamkinly
# Run after WordPress is installed and WooCommerce is activated
#
# Usage: bash setup-woocommerce-integration.sh
# ============================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}  WooCommerce-Tamkinly Integration${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

# Configuration
TAMKINLY_DIR="/var/www/tamkinly"
TAMKINLY_URL=""

# Load env if exists
if [ -f "$TAMKINLY_DIR/.env" ]; then
    export $(grep -v '^#' "$TAMKINLY_DIR/.env" | xargs)
    TAMKINLY_URL="${NEXT_PUBLIC_SITE_URL:-http://localhost:3000}"
fi

# Detect WordPress
WORDPRESS_DIR=""
for path in "/var/www/html" "/var/www/wordpress" "/usr/share/wordpress" "/opt/wordpress"; do
    if [ -d "$path" ] && [ -f "$path/wp-config.php" ]; then
        WORDPRESS_DIR="$path"
        break
    fi
done

if [ -z "$WORDPRESS_DIR" ]; then
    echo -e "${RED}Error: WordPress not found!${NC}"
    exit 1
fi

echo -e "${GREEN}WordPress found at: $WORDPRESS_DIR${NC}"
echo ""

# ============================================
# Step 1: Install Required Plugins
# ============================================
echo -e "${YELLOW}Step 1: Checking required plugins...${NC}"
echo ""
echo "Required WordPress plugins for integration:"
echo ""
echo "  1. WooCommerce - E-commerce functionality"
echo "  2. WooCommerce REST API - Built-in with WooCommerce"
echo "  3. JWT Authentication for WP REST API - For user auth"
echo "  4. WP CORS - For cross-origin requests"
echo ""
echo "Install these plugins via WordPress Admin:"
echo "  $WORDPRESS_DIR/wp-admin/plugins.php"
echo ""

# ============================================
# Step 2: Create Custom Plugin for Integration
# ============================================
echo -e "${YELLOW}Step 2: Creating integration plugin...${NC}"

PLUGIN_DIR="$WORDPRESS_DIR/wp-content/plugins/tamkinly-integration"
mkdir -p "$PLUGIN_DIR"

cat > "$PLUGIN_DIR/tamkinly-integration.php" << 'PHPEOF'
<?php
/**
 * Plugin Name: Tamkinly Integration
 * Description: Integrates WordPress/WooCommerce with Tamkinly Next.js App
 * Version: 1.0.0
 * Author: Tamkinly
 */

if (!defined('ABSPATH')) {
    exit;
}

class Tamkinly_Integration {
    
    private static $instance = null;
    private $secret_key;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        $this->secret_key = defined('TAMKINLY_SECRET') ? TAMKINLY_SECRET : 'change-this-secret';
        
        // Hooks
        add_action('woocommerce_order_status_completed', array($this, 'on_order_completed'));
        add_action('rest_api_init', array($this, 'register_routes'));
        add_filter('determine_current_user', array($this, 'authenticate_from_token'));
    }
    
    /**
     * Generate access code when order is completed
     */
    public function on_order_completed($order_id) {
        $order = wc_get_order($order_id);
        
        if (!$order) {
            return;
        }
        
        $customer_email = $order->get_billing_email();
        $customer_name = $order->get_billing_first_name() . ' ' . $order->get_billing_last_name();
        
        // Determine tier based on products
        $tier = $this->get_tier_from_order($order);
        
        // Generate access code
        $access_code = $this->generate_access_code($tier);
        
        // Send to Tamkinly API
        $this->send_access_code($customer_email, $customer_name, $access_code, $tier, $order_id);
        
        // Add note to order
        $order->add_order_note(
            sprintf('Tamkinly Access Code: %s (Tier: %s)', $access_code, $tier)
        );
        
        // Send email to customer
        $this->send_customer_email($order, $access_code, $tier);
    }
    
    /**
     * Get access tier from order products
     */
    private function get_tier_from_order($order) {
        $tier = 'PLANNER'; // Default
        
        foreach ($order->get_items() as $item) {
            $product_id = $item->get_product_id();
            $sku = get_post_meta($product_id, '_sku', true);
            
            // Map product SKUs to tiers
            $tier_mapping = array(
                'TRIAL' => 'TRIAL',
                'PLANNER' => 'PLANNER',
                'PREMIUM' => 'PREMIUM',
                'BUNDLE' => 'BUNDLE',
            );
            
            if (isset($tier_mapping[$sku])) {
                $tier = $tier_mapping[$sku];
                break;
            }
            
            // Check by price
            $product = $item->get_product();
            $price = $product ? $product->get_price() : 0;
            
            if ($price >= 47) {
                $tier = 'BUNDLE';
            } elseif ($price >= 27) {
                $tier = 'PREMIUM';
            } elseif ($price >= 17) {
                $tier = 'PLANNER';
            } elseif ($price >= 7) {
                $tier = 'TRIAL';
            }
        }
        
        return $tier;
    }
    
    /**
     * Generate unique access code
     */
    private function generate_access_code($tier) {
        $prefix = 'TMLY';
        $segments = array(
            strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 4)),
            strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 4)),
        );
        return $prefix . '-' . implode('-', $segments);
    }
    
    /**
     * Send access code to Tamkinly API
     */
    private function send_access_code($email, $name, $code, $tier, $order_id) {
        $api_url = get_option('tamkinly_api_url', 'http://localhost:3000');
        
        $data = array(
            'email' => $email,
            'customerName' => $name,
            'code' => $code,
            'tier' => $tier,
            'orderId' => strval($order_id),
            'secret' => $this->secret_key,
        );
        
        $response = wp_remote_post($api_url . '/api/access/generate', array(
            'method' => 'POST',
            'body' => json_encode($data),
            'headers' => array(
                'Content-Type' => 'application/json',
            ),
        ));
        
        if (is_wp_error($response)) {
            error_log('Tamkinly API Error: ' . $response->get_error_message());
        }
    }
    
    /**
     * Send email to customer with access code
     */
    private function send_customer_email($order, $access_code, $tier) {
        $to = $order->get_billing_email();
        $subject = 'Your Tamkinly Access Code';
        
        $message = sprintf(
            "Dear %s,\n\n" .
            "Thank you for your purchase!\n\n" .
            "Your Tamkinly Access Code: %s\n" .
            "Access Tier: %s\n\n" .
            "To activate your access:\n" .
            "1. Visit our app portal\n" .
            "2. Create an account or sign in\n" .
            "3. Enter your access code\n\n" .
            "Access URL: %s\n\n" .
            "Enjoy your transformation journey!\n\n" .
            "Best regards,\n" .
            "Tamkinly Team",
            $order->get_billing_first_name(),
            $access_code,
            $tier,
            get_option('tamkinly_app_url', 'https://tamkinly.com/apps')
        );
        
        wp_mail($to, $subject, $message);
    }
    
    /**
     * Register custom REST API routes
     */
    public function register_routes() {
        // Verify access code
        register_rest_route('tamkinly/v1', '/verify-code', array(
            'methods' => 'POST',
            'callback' => array($this, 'verify_access_code'),
            'permission_callback' => '__return_true',
        ));
        
        // Get products
        register_rest_route('tamkinly/v1', '/products', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_products'),
            'permission_callback' => '__return_true',
        ));
        
        // Sync user
        register_rest_route('tamkinly/v1', '/sync-user', array(
            'methods' => 'POST',
            'callback' => array($this, 'sync_user'),
            'permission_callback' => array($this, 'verify_secret'),
        ));
    }
    
    /**
     * Verify access code via API
     */
    public function verify_access_code($request) {
        global $wpdb;
        
        $code = sanitize_text_field($request->get_param('code'));
        $email = sanitize_email($request->get_param('email'));
        
        // Check in custom table or Tamkinly API
        // This is a placeholder - actual implementation would verify with Next.js API
        
        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'Verification handled by Next.js API',
        ), 200);
    }
    
    /**
     * Get products for display
     */
    public function get_products($request) {
        $args = array(
            'status' => 'publish',
            'limit' => 20,
        );
        
        $products = wc_get_products($args);
        $data = array();
        
        foreach ($products as $product) {
            $data[] = array(
                'id' => $product->get_id(),
                'name' => $product->get_name(),
                'price' => $product->get_price(),
                'sku' => $product->get_sku(),
                'description' => $product->get_description(),
                'image' => wp_get_attachment_url($product->get_image_id()),
            );
        }
        
        return new WP_REST_Response($data, 200);
    }
    
    /**
     * Sync user from Next.js
     */
    public function sync_user($request) {
        $email = sanitize_email($request->get_param('email'));
        $name = sanitize_text_field($request->get_param('name'));
        
        // Create WordPress user if not exists
        $user_id = email_exists($email);
        
        if (!$user_id) {
            $user_id = wp_create_user(
                $email,
                wp_generate_password(),
                $email
            );
            
            wp_update_user(array(
                'ID' => $user_id,
                'display_name' => $name,
            ));
        }
        
        return new WP_REST_Response(array(
            'success' => true,
            'userId' => $user_id,
        ), 200);
    }
    
    /**
     * Verify secret for internal API calls
     */
    public function verify_secret($request) {
        $secret = $request->get_header('X-Tamkinly-Secret');
        return $secret === $this->secret_key;
    }
    
    /**
     * Authenticate user from JWT token
     */
    public function authenticate_from_token($user_id) {
        if ($user_id) {
            return $user_id;
        }
        
        $auth_header = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';
        
        if (preg_match('/Bearer\s+(.*)$/i', $auth_header, $matches)) {
            $token = $matches[1];
            // Verify JWT token with Next.js API
            // This is a placeholder for JWT verification
        }
        
        return $user_id;
    }
}

// Initialize plugin
Tamkinly_Integration::get_instance();

// Add settings page
add_action('admin_menu', function() {
    add_options_page(
        'Tamkinly Integration',
        'Tamkinly Integration',
        'manage_options',
        'tamkinly-integration',
        'tamkinly_integration_settings_page'
    );
});

function tamkinly_integration_settings_page() {
    ?>
    <div class="wrap">
        <h1>Tamkinly Integration Settings</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('tamkinly_integration_settings');
            do_settings_sections('tamkinly_integration_settings');
            submit_button();
            ?>
        </form>
        
        <h2>Configuration Instructions</h2>
        <ol>
            <li>Set the API URL to your Tamkinly Next.js app</li>
            <li>Add the secret key (must match JWT_SECRET in .env)</li>
            <li>Configure WooCommerce webhooks to point to your Next.js API</li>
        </ol>
        
        <h2>WooCommerce Webhook Setup</h2>
        <p>Go to <a href="<?php echo admin_url('admin.php?page=wc-settings&tab=advanced&section=webhooks'); ?>">WooCommerce > Settings > Advanced > Webhooks</a></p>
        <p>Create a webhook with these settings:</p>
        <ul>
            <li><strong>Name:</strong> Tamkinly Order Created</li>
            <li><strong>Topic:</strong> Order created</li>
            <li><strong>Delivery URL:</strong> <code id="webhook-url"><?php echo get_option('tamkinly_api_url'); ?>/api/webhook/woocommerce</code></li>
            <li><strong>Secret:</strong> <code id="webhook-secret"><?php echo defined('TAMKINLY_SECRET') ? 'Set in wp-config.php' : 'Click Save below to generate'; ?></code></li>
        </ul>
    </div>
    <?php
}

add_action('admin_init', function() {
    register_setting('tamkinly_integration_settings', 'tamkinly_api_url');
    register_setting('tamkinly_integration_settings', 'tamkinly_app_url');
    
    add_settings_section(
        'tamkinly_main_section',
        'API Configuration',
        null,
        'tamkinly_integration_settings'
    );
    
    add_settings_field(
        'tamkinly_api_url',
        'Tamkinly API URL',
        function() {
            $value = get_option('tamkinly_api_url', 'http://localhost:3000');
            echo '<input type="url" name="tamkinly_api_url" value="' . esc_attr($value) . '" class="regular-text">';
            echo '<p class="description">The URL of your Tamkinly Next.js application (e.g., https://tamkinly.com)</p>';
        },
        'tamkinly_integration_settings',
        'tamkinly_main_section'
    );
    
    add_settings_field(
        'tamkinly_app_url',
        'App Portal URL',
        function() {
            $value = get_option('tamkinly_app_url', 'https://tamkinly.com/apps');
            echo '<input type="url" name="tamkinly_app_url" value="' . esc_attr($value) . '" class="regular-text">';
            echo '<p class="description">The URL where users access their apps</p>';
        },
        'tamkinly_integration_settings',
        'tamkinly_main_section'
    );
});
PHPEOF

echo -e "${GREEN}✓ Integration plugin created at: $PLUGIN_DIR${NC}"

# ============================================
# Step 3: Add constants to wp-config.php
# ============================================
echo -e "${YELLOW}Step 3: Configuring wp-config.php...${NC}"

WP_CONFIG="$WORDPRESS_DIR/wp-config.php"
SECRET_KEY=$(openssl rand -hex 32)

if ! grep -q "TAMKINLY_SECRET" "$WP_CONFIG"; then
    # Find where to insert (before "That's all, stop editing!")
    sed -i "/\/\* That's all, stop editing!/i\\
// Tamkinly Integration\\
define('TAMKINLY_SECRET', '$SECRET_KEY');\\
" "$WP_CONFIG"
    
    echo -e "${GREEN}✓ Secret key added to wp-config.php${NC}"
else
    echo -e "${GREEN}✓ Secret key already configured${NC}"
fi

# ============================================
# Step 4: Set file permissions
# ============================================
echo -e "${YELLOW}Step 4: Setting permissions...${NC}"

if command -v chown &> /dev/null; then
    # Detect web server user
    WEB_USER="www-data"
    if id -u nginx &>/dev/null; then
        WEB_USER="nginx"
    elif id -u apache &>/dev/null; then
        WEB_USER="apache"
    fi
    
    chown -R "$WEB_USER:$WEB_USER" "$PLUGIN_DIR"
    echo -e "${GREEN}✓ Permissions set for user: $WEB_USER${NC}"
fi

# ============================================
# Step 5: Activation Instructions
# ============================================
echo ""
echo -e "${BLUE}============================================${NC}"
echo -e "${GREEN}  Integration Setup Complete!${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo ""
echo "1. Activate the plugin in WordPress Admin:"
echo "   $WORDPRESS_DIR/wp-admin/plugins.php"
echo ""
echo "2. Configure settings in:"
echo "   $WORDPRESS_DIR/wp-admin/options-general.php?page=tamkinly-integration"
echo ""
echo "3. Add WooCommerce API keys to Tamkinly .env:"
echo "   WOO_CONSUMER_KEY=ck_xxxxx"
echo "   WOO_CONSUMER_SECRET=cs_xxxxx"
echo ""
echo "4. Set up webhook in WooCommerce:"
echo "   URL: ${TAMKINLY_URL}/api/webhook/woocommerce"
echo "   Secret: $SECRET_KEY"
echo ""
echo -e "${GREEN}Secret Key: $SECRET_KEY${NC}"
echo -e "${YELLOW}(Add this to Tamkinly .env as WOO_WEBHOOK_SECRET)${NC}"
echo ""
