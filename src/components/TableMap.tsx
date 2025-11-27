import { Table } from "@/pages/Index";
import { cn } from "@/lib/utils";

interface TableMapProps {
  tables: Table[];
  bookings: Record<number, boolean>;
  onTableClick: (tableId: number) => void;
}

export const TableMap = ({ tables, bookings, onTableClick }: TableMapProps) => {
  const getChairPositions = (seats: number, width: number, height: number) => {
    const chairs = [];
    const chairSize = 20;
    
    // Calculate how many chairs on each side
    const topBottomChairs = Math.ceil(seats / 2);
    const sideChairs = Math.floor(seats / 2);

    // Top chairs
    const topSpacing = width / (topBottomChairs + 1);
    for (let i = 0; i < topBottomChairs; i++) {
      chairs.push({
        x: topSpacing * (i + 1) - chairSize / 2,
        y: -chairSize - 6,
      });
    }

    // Bottom chairs
    const bottomSpacing = width / (sideChairs + 1);
    for (let i = 0; i < sideChairs; i++) {
      chairs.push({
        x: bottomSpacing * (i + 1) - chairSize / 2,
        y: height + 6,
      });
    }

    return chairs;
  };

  return (
    <div className="w-full h-full bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      <svg
        viewBox="0 0 850 700"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background grid areas */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.1" />
          </pattern>
        </defs>
        <rect width="850" height="700" fill="url(#grid)" />

        {/* Area labels (background) */}
        <text x="200" y="40" textAnchor="middle" className="fill-muted-foreground text-xs font-medium" opacity="0.5">
          GARDEN
        </text>
        <text x="600" y="40" textAnchor="middle" className="fill-muted-foreground text-xs font-medium" opacity="0.5">
          FOUNTAIN
        </text>
        <text x="200" y="380" textAnchor="middle" className="fill-muted-foreground text-xs font-medium" opacity="0.5">
          1ST FLOOR
        </text>
        <text x="600" y="380" textAnchor="middle" className="fill-muted-foreground text-xs font-medium" opacity="0.5">
          2ND FLOOR
        </text>

        {/* Dividing lines */}
        <line x1="400" y1="0" x2="400" y2="700" stroke="hsl(var(--border))" strokeWidth="2" opacity="0.3" strokeDasharray="10,5" />
        <line x1="0" y1="350" x2="850" y2="350" stroke="hsl(var(--border))" strokeWidth="2" opacity="0.3" strokeDasharray="10,5" />

        {/* Tables */}
        {tables.map((table) => {
          const isBooked = bookings[table.id];
          const width = table.width || 100;
          const height = table.height || 80;
          const chairs = getChairPositions(table.seats, width, height);

          return (
            <g
              key={table.id}
              onClick={() => onTableClick(table.id)}
              className="cursor-pointer transition-all duration-200"
              style={{ 
                transformOrigin: `${table.x + width / 2}px ${table.y + height / 2}px`,
              }}
            >
              {/* Hover effect background */}
              <rect
                x={table.x - 8}
                y={table.y - 8}
                width={width + 16}
                height={height + 16}
                rx="16"
                className="fill-accent opacity-0 hover:opacity-10 transition-opacity duration-200"
              />

              {/* Table */}
              <rect
                x={table.x}
                y={table.y}
                width={width}
                height={height}
                rx="12"
                className={cn(
                  "transition-all duration-300",
                  isBooked
                    ? "fill-table-booked stroke-table-booked shadow-lg"
                    : "fill-table-available stroke-table-available-border hover:stroke-primary"
                )}
                strokeWidth="2.5"
                filter={isBooked ? "drop-shadow(0 4px 6px rgba(59, 130, 246, 0.3))" : ""}
              />

              {/* Table Number */}
              <text
                x={table.x + width / 2}
                y={table.y + height / 2 - 8}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cn(
                  "text-3xl font-bold transition-all duration-300",
                  isBooked ? "fill-table-booked-foreground" : "fill-primary"
                )}
              >
                {table.id}
              </text>

              {/* Seats indicator */}
              <text
                x={table.x + width / 2}
                y={table.y + height / 2 + 14}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cn(
                  "text-xs font-medium transition-all duration-300",
                  isBooked ? "fill-table-booked-foreground opacity-80" : "fill-muted-foreground"
                )}
              >
                {table.seats} seats
              </text>

              {/* Chairs */}
              {chairs.map((chair, index) => (
                <g key={index}>
                  <rect
                    x={table.x + chair.x}
                    y={table.y + chair.y}
                    width="20"
                    height="20"
                    rx="5"
                    className={cn(
                      "transition-all duration-300",
                      isBooked 
                        ? "fill-chair-occupied stroke-chair-occupied" 
                        : "fill-chair stroke-border"
                    )}
                    strokeWidth="1.5"
                  />
                </g>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
