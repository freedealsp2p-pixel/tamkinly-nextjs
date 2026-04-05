import { WifiOff, Home, RefreshCw } from 'lucide-react';
import { Link } from '@/components/navigation/LocaleLink';

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-6">
            <WifiOff className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">You're Offline</h1>
          <p className="text-muted-foreground">
            It looks like you've lost your internet connection. 
            Don't worry - some content may still be available from cache.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>

        <div className="mt-12 p-4 bg-muted/50 rounded-lg">
          <h2 className="font-semibold mb-2">Available Offline:</h2>
          <ul className="text-sm text-muted-foreground text-left space-y-1">
            <li>• Previously visited pages</li>
            <li>• Identity Gap Quiz</li>
            <li>• Daily Reflection prompts</li>
            <li>• Saved progress</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
