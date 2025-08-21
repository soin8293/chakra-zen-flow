import { useEffect } from 'react';
import { AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useOfflineStatus, useServiceWorker, useOfflineStorage } from '@/hooks/useOffline';
import { toast } from '@/hooks/use-toast';

interface OfflineIndicatorProps {
  onUpdateAvailable?: () => void;
}

export const OfflineIndicator = ({ onUpdateAvailable }: OfflineIndicatorProps) => {
  const isOnline = useOfflineStatus();
  const { isUpdateAvailable, updateApp } = useServiceWorker();
  const { syncOfflineData } = useOfflineStorage();

  // Show notifications for connection status changes
  useEffect(() => {
    if (!isOnline) {
      toast({
        title: "You're offline",
        description: "Your meditation progress will be saved locally and synced when you reconnect.",
        duration: 4000,
      });
    } else {
      // Auto-sync when coming back online
      syncOfflineData();
      toast({
        title: "Back online",
        description: "Syncing your meditation data...",
        duration: 2000,
      });
    }
  }, [isOnline, syncOfflineData]);

  // Handle app updates
  useEffect(() => {
    if (isUpdateAvailable) {
      onUpdateAvailable?.();
      toast({
        title: "Update available",
        description: "A new version of ZenFlow is ready to install.",
        action: (
          <Button
            size="sm"
            onClick={updateApp}
            className="ml-2"
          >
            Update
          </Button>
        ),
        duration: 8000,
      });
    }
  }, [isUpdateAvailable, updateApp, onUpdateAvailable]);

  // Don't show indicator if online and no updates
  if (isOnline && !isUpdateAvailable) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      {!isOnline && (
        <Alert className="bg-warning/10 border-warning text-warning-foreground mb-2">
          <WifiOff className="h-4 w-4" />
          <AlertDescription>
            Offline mode - your progress will sync when reconnected
          </AlertDescription>
        </Alert>
      )}
      
      {isUpdateAvailable && (
        <Alert className="bg-primary/10 border-primary text-primary-foreground">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>New update available</span>
            <Button
              size="sm"
              variant="secondary"
              onClick={updateApp}
              className="ml-2"
            >
              Update Now
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};