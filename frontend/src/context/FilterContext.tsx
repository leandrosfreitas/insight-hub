import { createContext, useContext, useState, type ReactNode } from "react";

interface FilterContextType {
  selectedIndicators: number[];
  setSelectedIndicators: (ids: number[]) => void;

  startDate: string;
  setStartDate: (date: string) => void;

  endDate: string;
  setEndDate: (date: string) => void;
}

const FilterContext = createContext<FilterContextType | null>(null);

export const FilterProvider = ({ children }: { children: ReactNode }) => {

  const [selectedIndicators, setSelectedIndicators] = useState<number[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <FilterContext.Provider
      value={{
        selectedIndicators,
        setSelectedIndicators,
        startDate,
        setStartDate,
        endDate,
        setEndDate
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error("useFilters must be used within FilterProvider");
  return context;
};
