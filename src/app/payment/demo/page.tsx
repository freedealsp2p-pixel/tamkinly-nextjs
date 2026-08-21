import { redirect } from 'next/navigation';

// Demo payment page is disabled in production
// This route should NEVER be accessible to real users
export default function PaymentDemoPage() {
  if (process.env.NODE_ENV === 'production') {
    redirect('/products');
  }
  
  // In development, also redirect - use the API directly for testing
  redirect('/products');
}
