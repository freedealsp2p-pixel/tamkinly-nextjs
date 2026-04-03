/**
 * WordPress Integration Helper
 * Handles user authentication and registration with WordPress via JWT
 */

const WP_URL = process.env.WOOCOMMERCE_URL || 'https://tamkinly.com';

interface WordPressUser {
  id: number;
  username: string;
  name: string;
  email: string;
  first_name?: string;
  last_name?: string;
  nickname?: string;
  avatar_urls?: {
    '24': string;
    '48': string;
    '96': string;
  };
}

interface JWTResponse {
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
}

interface WordPressAuthResult {
  success: boolean;
  user?: WordPressUser;
  token?: string;
  error?: string;
}

/**
 * Authenticate user with WordPress via JWT
 */
export async function authenticateWithWordPress(
  username: string,
  password: string
): Promise<WordPressAuthResult> {
  try {
    const response = await fetch(`${WP_URL}/wp-json/jwt-auth/v1/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || 'Authentication failed',
      };
    }

    const data: JWTResponse = await response.json();
    
    // Get user details with the token
    const userResponse = await fetch(`${WP_URL}/wp-json/wp/v2/users/me`, {
      headers: {
        'Authorization': `Bearer ${data.token}`,
      },
    });

    if (!userResponse.ok) {
      return {
        success: true,
        token: data.token,
        user: {
          id: 0,
          username: data.user_nicename,
          name: data.user_display_name,
          email: data.user_email,
        },
      };
    }

    const user: WordPressUser = await userResponse.json();

    return {
      success: true,
      token: data.token,
      user,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Connection failed',
    };
  }
}

/**
 * Register a new user in WordPress
 */
export async function registerWithWordPress(
  email: string,
  password: string,
  name?: string
): Promise<WordPressAuthResult> {
  try {
    const username = email.split('@')[0] + '_' + Date.now().toString(36);
    const firstName = name?.split(' ')[0] || '';
    const lastName = name?.split(' ').slice(1).join(' ') || '';

    // First, try to register via WooCommerce API (if we have credentials)
    const WC_CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
    const WC_CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

    if (WC_CONSUMER_KEY && WC_CONSUMER_SECRET) {
      const credentials = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');
      
      const response = await fetch(`${WP_URL}/wp-json/wc/v3/customers`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password,
          first_name: firstName,
          last_name: lastName,
        }),
      });

      if (response.ok) {
        const user: WordPressUser = await response.json();
        
        // Now get JWT token
        const authResult = await authenticateWithWordPress(username, password);
        
        return {
          success: true,
          user,
          token: authResult.token,
        };
      }

      // Check if user already exists
      const error = await response.json();
      if (error.code === 'registration_email_exists' || error.code === 'registration_username_exists') {
        // Try to authenticate instead
        const authResult = await authenticateWithWordPress(email, password);
        if (authResult.success) {
          return authResult;
        }
      }

      return {
        success: false,
        error: error.message || 'Registration failed',
      };
    }

    // Fallback: Try WordPress REST API registration (requires non-privileged endpoint)
    // This typically requires a plugin like "WP REST User" to be installed
    const response = await fetch(`${WP_URL}/wp-json/wp/v2/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        username,
        password,
        first_name: firstName,
        last_name: lastName,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || 'Registration failed',
      };
    }

    const user: WordPressUser = await response.json();
    
    // Get JWT token
    const authResult = await authenticateWithWordPress(username, password);
    
    return {
      success: true,
      user,
      token: authResult.token,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Connection failed',
    };
  }
}

/**
 * Validate a JWT token
 */
export async function validateWordPressToken(token: string): Promise<WordPressAuthResult> {
  try {
    const response = await fetch(`${WP_URL}/wp-json/jwt-auth/v1/token/validate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return {
        success: false,
        error: 'Invalid token',
      };
    }

    const data = await response.json();
    
    return {
      success: data.data?.status === 200,
      token,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Token validation failed',
    };
  }
}

/**
 * Get user info from WordPress
 */
export async function getWordPressUser(token: string): Promise<WordPressUser | null> {
  try {
    const response = await fetch(`${WP_URL}/wp-json/wp/v2/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
}

/**
 * WordPress Integration Helper
 * Handles user authentication and registration with WordPress via JWT
 */

const WordPressIntegration = {
  authenticateWithWordPress,
  registerWithWordPress,
  validateWordPressToken,
  getWordPressUser,
};

export default WordPressIntegration;
