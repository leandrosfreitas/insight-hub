interface DateFilterProps {
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}

export default function DateFilter({
  startDate,
  endDate,
  setStartDate,
  setEndDate
}: DateFilterProps) {
  return (
    <div className="flex gap-4 flex-wrap">

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="
          border rounded px-3 py-2
          bg-white text-gray-900
          dark:bg-gray-800 dark:text-white dark:border-gray-600
        "
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="
          border rounded px-3 py-2
          bg-white text-gray-900
          dark:bg-gray-800 dark:text-white dark:border-gray-600
        "
      />

    </div>
  );
}
