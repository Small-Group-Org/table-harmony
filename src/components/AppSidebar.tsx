import { Clock, Users, CheckCircle2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  timeSlots: string[];
  currentTimeSlotIndex: number;
  onTimeSlotChange: (index: number) => void;
  statistics: {
    totalTables: number;
    bookedTables: number;
    availableTables: number;
  };
}

export function AppSidebar({
  timeSlots,
  currentTimeSlotIndex,
  onTimeSlotChange,
  statistics,
}: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-border">
      <SidebarContent className="p-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-1">Table Manager</h2>
          <p className="text-sm text-muted-foreground">Restaurant booking system</p>
        </div>

        {/* Statistics */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider mb-3">
            Current Status
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">Total Tables</span>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-3xl font-bold text-foreground">{statistics.totalTables}</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Booked</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">{statistics.bookedTables}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-400">Available</span>
                  <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">{statistics.availableTables}</p>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-6" />

        {/* Time Slots */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" />
            Time Slots
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {timeSlots.map((slot, index) => (
                <SidebarMenuItem key={slot}>
                  <Button
                    variant={currentTimeSlotIndex === index ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start text-sm font-medium",
                      currentTimeSlotIndex === index && "shadow-sm"
                    )}
                    onClick={() => onTimeSlotChange(index)}
                  >
                    {slot}
                  </Button>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
