import { TreeDeciduous, Droplets, Building, Building2, Clock, Users, CheckCircle2 } from "lucide-react";
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
  areas: string[];
  selectedArea: string | null;
  onAreaSelect: (area: string | null) => void;
  timeSlots: string[];
  currentTimeSlotIndex: number;
  onTimeSlotChange: (index: number) => void;
  statistics: {
    totalTables: number;
    bookedTables: number;
    availableTables: number;
  };
}

const areaIcons: Record<string, React.ReactNode> = {
  Garden: <TreeDeciduous className="h-4 w-4" />,
  Fountain: <Droplets className="h-4 w-4" />,
  "1st Floor": <Building className="h-4 w-4" />,
  "2nd Floor": <Building2 className="h-4 w-4" />,
};

export function AppSidebar({
  areas,
  selectedArea,
  onAreaSelect,
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
            Overview
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="grid grid-cols-1 gap-2">
              <div className="bg-card rounded-xl p-3 border border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Total Tables</span>
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold text-foreground">{statistics.totalTables}</p>
              </div>
              <div className="bg-primary/10 rounded-xl p-3 border border-primary/20">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-primary">Booked</span>
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-primary">{statistics.bookedTables}</p>
              </div>
              <div className="bg-muted rounded-xl p-3 border border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Available</span>
                  <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold text-foreground">{statistics.availableTables}</p>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-4" />

        {/* Time Slots */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" />
            Time Slots
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {timeSlots.map((slot, index) => (
                <SidebarMenuItem key={slot}>
                  <Button
                    variant={currentTimeSlotIndex === index ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start text-sm",
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

        <Separator className="my-4" />

        {/* Area Filters */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider mb-3">
            Filter by Area
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {areas.map((area) => {
                const isSelected = selectedArea === area;
                return (
                  <SidebarMenuItem key={area}>
                    <Button
                      variant={isSelected ? "secondary" : "ghost"}
                      className="w-full justify-start text-sm gap-2"
                      onClick={() => onAreaSelect(isSelected ? null : area)}
                    >
                      {areaIcons[area]}
                      {area}
                    </Button>
                  </SidebarMenuItem>
                );
              })}
              {selectedArea && (
                <SidebarMenuItem>
                  <Button
                    variant="ghost"
                    onClick={() => onAreaSelect(null)}
                    className="w-full justify-start text-sm text-muted-foreground"
                  >
                    Clear Filter
                  </Button>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
