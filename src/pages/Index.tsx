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

// Define tables with proper spacing - single restaurant floor
export interface Table {
  id: number;
  seats: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

const TABLES: Table[] = [
  // Row 1 - Top
  { id: 1, seats: 4, x: 60, y: 60, width: 100, height: 70 },
  { id: 2, seats: 2, x: 220, y: 60, width: 70, height: 70 },
  { id: 3, seats: 6, x: 350, y: 60, width: 130, height: 80 },
  { id: 4, seats: 4, x: 540, y: 60, width: 100, height: 70 },
  { id: 5, seats: 8, x: 700, y: 60, width: 160, height: 90 },
  
  // Row 2
  { id: 6, seats: 4, x: 60, y: 200, width: 100, height: 70 },
  { id: 7, seats: 4, x: 220, y: 200, width: 100, height: 70 },
  { id: 8, seats: 6, x: 380, y: 200, width: 130, height: 80 },
  { id: 9, seats: 4, x: 570, y: 200, width: 100, height: 70 },
  { id: 10, seats: 2, x: 730, y: 200, width: 70, height: 70 },
  
  // Row 3
  { id: 11, seats: 6, x: 60, y: 340, width: 130, height: 80 },
  { id: 12, seats: 4, x: 250, y: 340, width: 100, height: 70 },
  { id: 13, seats: 4, x: 410, y: 340, width: 100, height: 70 },
  { id: 14, seats: 8, x: 570, y: 340, width: 160, height: 90 },
  
  // Row 4 - Bottom
  { id: 15, seats: 2, x: 60, y: 490, width: 70, height: 70 },
  { id: 16, seats: 4, x: 190, y: 490, width: 100, height: 70 },
  { id: 17, seats: 6, x: 350, y: 490, width: 130, height: 80 },
  { id: 18, seats: 4, x: 540, y: 490, width: 100, height: 70 },
  { id: 19, seats: 4, x: 700, y: 490, width: 100, height: 70 },
];

export type BookingState = Record<string, Record<number, boolean>>;

const Index = () => {
  const [currentTimeSlotIndex, setCurrentTimeSlotIndex] = useState(0);
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

  const currentBookings = bookings[currentTimeSlot] || {};

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalTables = TABLES.length;
    const bookedTables = TABLES.filter((table) => currentBookings[table.id]).length;
    const availableTables = totalTables - bookedTables;

    return { totalTables, bookedTables, availableTables };
  }, [currentBookings]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar
          timeSlots={TIME_SLOTS}
          currentTimeSlotIndex={currentTimeSlotIndex}
          onTimeSlotChange={setCurrentTimeSlotIndex}
          statistics={statistics}
        />

        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card flex items-center px-6 gap-4 shrink-0 shadow-sm">
            <SidebarTrigger className="lg:hidden">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-foreground">
                {currentTimeSlot}
              </h1>
              <p className="text-sm text-muted-foreground">
                Restaurant Floor Plan
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-table-available border-2 border-table-available-border" />
                <span className="text-muted-foreground font-medium">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-table-booked" />
                <span className="text-muted-foreground font-medium">Booked</span>
              </div>
            </div>
          </header>

          {/* Table Map - fills remaining space */}
          <div className="flex-1 overflow-hidden p-6">
            <TableMap
              tables={TABLES}
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
