import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

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

  const [selectedIndicators, setSelectedIndicators] = useState<number[]>(() => {
    const saved = localStorage.getItem("selectedIndicators");
    return saved ? JSON.parse(saved) : [];
  });

  const [startDate, setStartDate] = useState(() => {
    return localStorage.getItem("startDate") || "";
  });

  const [endDate, setEndDate] = useState(() => {
    return localStorage.getItem("endDate") || "";
  });

  useEffect(() => {
    localStorage.setItem("selectedIndicators", JSON.stringify(selectedIndicators));
  }, [selectedIndicators]);

  useEffect(() => {
    localStorage.setItem("startDate", startDate);
  }, [startDate]);

  useEffect(() => {
    localStorage.setItem("endDate", endDate);
  }, [endDate]);

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
