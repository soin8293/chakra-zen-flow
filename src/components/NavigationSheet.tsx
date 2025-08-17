import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { User, Book, MoreHorizontal, ChevronUp } from "lucide-react";

interface NavigationSheetProps {
  children?: ReactNode;
  onProfileClick: () => void;
  onChakraInfoClick: () => void;
}

export function NavigationSheet({ onProfileClick, onChakraInfoClick }: NavigationSheetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSheet = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Bottom Sheet */}
      <div 
        data-bottom-sheet
        className={cn(
          "fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-elevation z-50",
          "transition-transform duration-300 ease-out will-change-transform",
          isOpen ? "translate-y-0" : "translate-y-[calc(100%-80px)]"
        )}
      >
        {/* More trigger button */}
        <div 
          className="w-full py-4 flex justify-center cursor-pointer group"
          onClick={toggleSheet}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-1 bg-muted-foreground/30 rounded-full group-hover:bg-muted-foreground/50 transition-colors" />
            <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
              <MoreHorizontal className="h-4 w-4" />
              <span className="text-sm font-medium">More</span>
              <ChevronUp className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
            </div>
          </div>
        </div>

        {/* Menu content */}
        <div className="px-6 pb-8">
          <div className="grid grid-cols-2 gap-4">
            {/* Profile */}
            <button
              onClick={() => {
                onProfileClick();
                setIsOpen(false);
              }}
              className={cn(
                "flex flex-col items-center p-6 rounded-2xl",
                "bg-muted/50 hover:bg-muted transition-colors duration-200",
                "group touch-manipulation"
              )}
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/30 transition-colors">
                <User className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium text-card-foreground">Profile</span>
              <span className="text-sm text-muted-foreground">Your progress</span>
            </button>

            {/* Chakra Info */}
            <button
              onClick={() => {
                onChakraInfoClick();
                setIsOpen(false);
              }}
              className={cn(
                "flex flex-col items-center p-6 rounded-2xl",
                "bg-muted/50 hover:bg-muted transition-colors duration-200",
                "group touch-manipulation"
              )}
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/30 transition-colors">
                <Book className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium text-card-foreground">Chakra Guide</span>
              <span className="text-sm text-muted-foreground">Learn more</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}