import { useState } from "react";
import { TimeSlotSelector } from "@/components/TimeSlotSelector";
import { AreaFilters } from "@/components/AreaFilters";
import { TableMap } from "@/components/TableMap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

// Define tables with their properties
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
  // Garden area
  { id: 1, seats: 4, x: 50, y: 50, area: "Garden", width: 120, height: 80 },
  { id: 2, seats: 6, x: 250, y: 50, area: "Garden", width: 150, height: 80 },
  { id: 3, seats: 4, x: 50, y: 180, area: "Garden", width: 120, height: 80 },
  { id: 4, seats: 4, x: 250, y: 180, area: "Garden", width: 120, height: 80 },
  // Fountain area
  { id: 5, seats: 8, x: 50, y: 320, area: "Fountain", width: 180, height: 80 },
  { id: 6, seats: 6, x: 280, y: 320, area: "Fountain", width: 150, height: 80 },
  // 1st Floor
  { id: 7, seats: 2, x: 50, y: 460, area: "1st Floor", width: 80, height: 80 },
  { id: 8, seats: 2, x: 160, y: 460, area: "1st Floor", width: 80, height: 80 },
  { id: 9, seats: 4, x: 280, y: 460, area: "1st Floor", width: 120, height: 80 },
  // 2nd Floor
  { id: 10, seats: 4, x: 50, y: 590, area: "2nd Floor", width: 120, height: 80 },
  { id: 11, seats: 6, x: 220, y: 590, area: "2nd Floor", width: 150, height: 80 },
];

export type BookingState = Record<string, Record<number, boolean>>;

const Index = () => {
  const [currentTimeSlotIndex, setCurrentTimeSlotIndex] = useState(0);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [bookings, setBookings] = useState<BookingState>({});

  const currentTimeSlot = TIME_SLOTS[currentTimeSlotIndex];

  const handlePreviousSlot = () => {
    setCurrentTimeSlotIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextSlot = () => {
    setCurrentTimeSlotIndex((prev) => Math.min(TIME_SLOTS.length - 1, prev + 1));
  };

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Restaurant Table Booking</h1>
          <p className="text-muted-foreground">Manage table availability across different time slots</p>
        </div>

        {/* Time Slot Navigation */}
        <div className="mb-6 flex items-center justify-between bg-card rounded-2xl p-4 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePreviousSlot}
            disabled={currentTimeSlotIndex === 0}
            className="rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 text-center">
            <p className="text-sm text-muted-foreground mb-1">Current Time Slot</p>
            <p className="text-xl font-semibold text-foreground">{currentTimeSlot}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextSlot}
            disabled={currentTimeSlotIndex === TIME_SLOTS.length - 1}
            className="rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Area Filters */}
        <AreaFilters
          areas={AREAS}
          selectedArea={selectedArea}
          onAreaSelect={setSelectedArea}
        />

        {/* Legend */}
        <div className="mb-6 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-table-available border-2 border-table-available-border" />
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-table-booked" />
            <span className="text-muted-foreground">Booked</span>
          </div>
        </div>

        {/* Table Map */}
        <TableMap
          tables={filteredTables}
          bookings={currentBookings}
          onTableClick={handleTableClick}
        />
      </div>
    </div>
  );
};

export default Index;
