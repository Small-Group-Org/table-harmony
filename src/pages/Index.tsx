import { useState, useMemo } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { TableMap } from "@/components/TableMap";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

// Define time slots
const TIME_SLOTS = [
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
  "6:00 PM - 7:00 PM",
  "7:00 PM - 8:00 PM",
  "8:00 PM - 9:00 PM",
  "9:00 PM - 10:00 PM",
];

// Define areas
const AREAS = ["Garden", "Fountain", "1st Floor", "2nd Floor"];

// Define tables with their properties - more spread out and realistic
export interface Table {
  id: number;
  seats: number;
  x: number;
  y: number;
  area: string;
  width?: number;
  height?: number;
}

const TABLES: Table[] = [
  // Garden area (top-left quadrant) - outdoor tables
  { id: 1, seats: 4, x: 80, y: 80, area: "Garden", width: 100, height: 70 },
  { id: 2, seats: 2, x: 220, y: 80, area: "Garden", width: 70, height: 70 },
  { id: 3, seats: 6, x: 80, y: 200, area: "Garden", width: 130, height: 80 },
  { id: 4, seats: 4, x: 250, y: 200, area: "Garden", width: 100, height: 70 },
  
  // Fountain area (top-right quadrant) - premium tables
  { id: 5, seats: 8, x: 480, y: 80, area: "Fountain", width: 160, height: 90 },
  { id: 6, seats: 4, x: 680, y: 80, area: "Fountain", width: 100, height: 70 },
  { id: 7, seats: 6, x: 480, y: 220, area: "Fountain", width: 130, height: 80 },
  { id: 8, seats: 4, x: 650, y: 220, area: "Fountain", width: 100, height: 70 },
  
  // 1st Floor (bottom-left quadrant) - main dining
  { id: 9, seats: 2, x: 80, y: 420, area: "1st Floor", width: 70, height: 70 },
  { id: 10, seats: 4, x: 190, y: 420, area: "1st Floor", width: 100, height: 70 },
  { id: 11, seats: 4, x: 80, y: 540, area: "1st Floor", width: 100, height: 70 },
  { id: 12, seats: 6, x: 220, y: 540, area: "1st Floor", width: 130, height: 80 },
  
  // 2nd Floor (bottom-right quadrant) - private dining
  { id: 13, seats: 4, x: 480, y: 420, area: "2nd Floor", width: 100, height: 70 },
  { id: 14, seats: 6, x: 620, y: 420, area: "2nd Floor", width: 130, height: 80 },
  { id: 15, seats: 8, x: 480, y: 560, area: "2nd Floor", width: 160, height: 90 },
  { id: 16, seats: 2, x: 680, y: 580, area: "2nd Floor", width: 70, height: 70 },
];

export type BookingState = Record<string, Record<number, boolean>>;

const Index = () => {
  const [currentTimeSlotIndex, setCurrentTimeSlotIndex] = useState(0);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [bookings, setBookings] = useState<BookingState>({});

  const currentTimeSlot = TIME_SLOTS[currentTimeSlotIndex];

  const handleTableClick = (tableId: number) => {
    setBookings((prev) => {
      const timeSlotBookings = prev[currentTimeSlot] || {};
      return {
        ...prev,
        [currentTimeSlot]: {
          ...timeSlotBookings,
          [tableId]: !timeSlotBookings[tableId],
        },
      };
    });
  };

  const filteredTables = selectedArea
    ? TABLES.filter((table) => table.area === selectedArea)
    : TABLES;

  const currentBookings = bookings[currentTimeSlot] || {};

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalTables = filteredTables.length;
    const bookedTables = filteredTables.filter((table) => currentBookings[table.id]).length;
    const availableTables = totalTables - bookedTables;

    return { totalTables, bookedTables, availableTables };
  }, [filteredTables, currentBookings]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar
          areas={AREAS}
          selectedArea={selectedArea}
          onAreaSelect={setSelectedArea}
          timeSlots={TIME_SLOTS}
          currentTimeSlotIndex={currentTimeSlotIndex}
          onTimeSlotChange={setCurrentTimeSlotIndex}
          statistics={statistics}
        />

        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card flex items-center px-6 gap-4 shrink-0">
            <SidebarTrigger className="lg:hidden">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-foreground">
                {currentTimeSlot}
              </h1>
              <p className="text-sm text-muted-foreground">
                {selectedArea ? `${selectedArea} Area` : "All Areas"}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-table-available border border-table-available-border" />
                <span className="text-muted-foreground">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-table-booked" />
                <span className="text-muted-foreground">Booked</span>
              </div>
            </div>
          </header>

          {/* Table Map - fills remaining space */}
          <div className="flex-1 overflow-hidden p-6">
            <TableMap
              tables={filteredTables}
              bookings={currentBookings}
              onTableClick={handleTableClick}
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
