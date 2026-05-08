"use client"

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function ServiceWorkerRegistration() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Register service worker only once
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Check if already registered to prevent duplicate registrations
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        const existingSw = registrations.find(r => r.scope.includes("/sw.js") || r.active);
        if (!existingSw) {
          navigator.serviceWorker
            .register("/sw.js")
            .then((registration) => {
              console.log("Service Worker registered:", registration.scope);

              // Check for updates
              registration.addEventListener("updatefound", () => {
                const newWorker = registration.installing;
                if (newWorker) {
                  newWorker.addEventListener("statechange", () => {
                    if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                      console.log("New content available, please refresh.");
                    }
                  });
                }
              });
            })
            .catch((error) => {
              console.error("Service Worker registration failed:", error);
            });
        } else {
          console.log("Service Worker already registered");
        }
      });
    }

    // Handle install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Handle online/offline status
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log("User response to install prompt:", outcome);
    } catch (error) {
      console.error("Install prompt error:", error);
    } finally {
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleDismissInstall = () => {
    setShowInstallPrompt(false);
    localStorage.setItem("pwa-install-dismissed", Date.now().toString());
  };

  useEffect(() => {
    const dismissed = localStorage.getItem("pwa-install-dismissed");
    if (dismissed) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissed)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        setShowInstallPrompt(false);
      }
    }
  }, []);

  // PWA install prompt disabled - no longer showing install banner
  // Service worker still registered for offline support
  return (
    <>
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-yellow-500 text-yellow-900 px-4 py-2 text-center text-sm font-medium">
          You are currently offline. Some features may be limited.
        </div>
      )}
    </>
  );
}

export default ServiceWorkerRegistration;

