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
    const chairSize = 24;
    const spacing = width / Math.ceil(seats / 2);

    // Top chairs
    for (let i = 0; i < Math.ceil(seats / 2); i++) {
      chairs.push({
        x: i * spacing + spacing / 2 - chairSize / 2,
        y: -chairSize - 4,
      });
    }

    // Bottom chairs
    for (let i = 0; i < Math.floor(seats / 2); i++) {
      chairs.push({
        x: i * spacing + spacing / 2 - chairSize / 2,
        y: height + 4,
      });
    }

    return chairs;
  };

  return (
    <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
      <svg
        viewBox="0 0 500 700"
        className="w-full h-auto"
        style={{ maxHeight: "700px" }}
      >
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
              style={{ transformOrigin: `${table.x + width / 2}px ${table.y + height / 2}px` }}
            >
              {/* Table */}
              <rect
                x={table.x}
                y={table.y}
                width={width}
                height={height}
                rx="12"
                className={cn(
                  "transition-all duration-200",
                  isBooked
                    ? "fill-table-booked stroke-table-booked"
                    : "fill-table-available stroke-table-available-border hover:fill-table-hover"
                )}
                strokeWidth="2"
              />

              {/* Table Number */}
              <text
                x={table.x + width / 2}
                y={table.y + height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cn(
                  "text-2xl font-semibold transition-all duration-200",
                  isBooked ? "fill-table-booked-foreground" : "fill-foreground"
                )}
              >
                {table.id}
              </text>

              {/* Chairs */}
              {chairs.map((chair, index) => (
                <rect
                  key={index}
                  x={table.x + chair.x}
                  y={table.y + chair.y}
                  width="24"
                  height="24"
                  rx="6"
                  className={cn(
                    "transition-all duration-200",
                    isBooked ? "fill-chair-occupied" : "fill-chair"
                  )}
                />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
