import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TimeSlotSelectorProps {
  currentSlot: string;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export const TimeSlotSelector = ({
  currentSlot,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: TimeSlotSelectorProps) => {
  return (
    <div className="flex items-center justify-between bg-card rounded-2xl p-6 shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="rounded-full"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <div className="flex-1 text-center">
        <p className="text-sm text-muted-foreground mb-1">Current Time Slot</p>
        <p className="text-2xl font-semibold text-foreground">{currentSlot}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        disabled={!canGoNext}
        className="rounded-full"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};
