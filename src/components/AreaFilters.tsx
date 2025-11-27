import { Button } from "@/components/ui/button";
import { TreeDeciduous, Droplets, Building, Building2 } from "lucide-react";

interface AreaFiltersProps {
  areas: string[];
  selectedArea: string | null;
  onAreaSelect: (area: string | null) => void;
}

const areaIcons: Record<string, React.ReactNode> = {
  Garden: <TreeDeciduous className="h-4 w-4" />,
  Fountain: <Droplets className="h-4 w-4" />,
  "1st Floor": <Building className="h-4 w-4" />,
  "2nd Floor": <Building2 className="h-4 w-4" />,
};

export const AreaFilters = ({ areas, selectedArea, onAreaSelect }: AreaFiltersProps) => {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {areas.map((area) => {
        const isSelected = selectedArea === area;
        return (
          <Button
            key={area}
            variant={isSelected ? "default" : "outline"}
            onClick={() => onAreaSelect(isSelected ? null : area)}
            className="rounded-full gap-2 transition-all"
            size="sm"
          >
            {areaIcons[area]}
            {area}
          </Button>
        );
      })}
      {selectedArea && (
        <Button
          variant="ghost"
          onClick={() => onAreaSelect(null)}
          className="rounded-full text-muted-foreground hover:text-foreground"
          size="sm"
        >
          Clear Filter
        </Button>
      )}
    </div>
  );
};
