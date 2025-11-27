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
    const chairSize = 18;
    
    // Calculate how many chairs on each side
    const topBottomChairs = Math.ceil(seats / 2);
    const sideChairs = Math.floor(seats / 2);

    // Top chairs
    const topSpacing = width / (topBottomChairs + 1);
    for (let i = 0; i < topBottomChairs; i++) {
      chairs.push({
        x: topSpacing * (i + 1) - chairSize / 2,
        y: -chairSize - 8,
      });
    }

    // Bottom chairs
    const bottomSpacing = width / (sideChairs + 1);
    for (let i = 0; i < sideChairs; i++) {
      chairs.push({
        x: bottomSpacing * (i + 1) - chairSize / 2,
        y: height + 8,
      });
    }

    return chairs;
  };

  return (
    <div className="w-full h-full bg-card rounded-2xl border border-border shadow-sm overflow-hidden p-4">
      <svg
        viewBox="0 0 920 620"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.08" />
          </pattern>
        </defs>
        <rect width="920" height="620" fill="url(#grid)" />

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
                x={table.x - 10}
                y={table.y - 10}
                width={width + 20}
                height={height + 20}
                rx="16"
                className={cn(
                  "transition-opacity duration-200",
                  isBooked 
                    ? "fill-emerald-100 dark:fill-emerald-900/30 opacity-0 hover:opacity-30"
                    : "fill-primary/5 opacity-0 hover:opacity-100"
                )}
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
                    ? "fill-table-booked stroke-emerald-600 dark:stroke-emerald-500"
                    : "fill-table-available stroke-table-available-border hover:stroke-primary hover:fill-table-hover"
                )}
                strokeWidth="3"
                style={{
                  filter: isBooked ? "drop-shadow(0 4px 12px rgba(34, 197, 94, 0.25))" : "none"
                }}
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
                y={table.y + height / 2 + 16}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cn(
                  "text-xs font-semibold transition-all duration-300",
                  isBooked ? "fill-table-booked-foreground opacity-90" : "fill-muted-foreground"
                )}
              >
                {table.seats} SEATS
              </text>

              {/* Chairs */}
              {chairs.map((chair, index) => (
                <g key={index}>
                  <rect
                    x={table.x + chair.x}
                    y={table.y + chair.y}
                    width="18"
                    height="18"
                    rx="4"
                    className={cn(
                      "transition-all duration-300",
                      isBooked 
                        ? "fill-chair-occupied stroke-emerald-600 dark:stroke-emerald-500" 
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
