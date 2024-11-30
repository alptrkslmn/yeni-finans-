import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useTheme } from '../hooks/useTheme';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (range: DateRange) => void;
}

export function DateRangePicker({ startDate, endDate, onChange }: DateRangePickerProps) {
  const { isDarkMode } = useTheme();

  const handleStartDateChange = (date: Date | null) => {
    onChange({
      startDate: date,
      endDate
    });
  };

  const handleEndDateChange = (date: Date | null) => {
    onChange({
      startDate,
      endDate: date
    });
  };

  return (
    <div className="flex gap-2">
      <ReactDatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Başlangıç tarihi"
        className={`flex-1 px-3 py-2 rounded-lg border ${
          isDarkMode 
            ? 'bg-gray-700 border-gray-600 text-gray-200' 
            : 'bg-white border-gray-300 text-gray-900'
        }`}
        dateFormat="dd.MM.yyyy"
      />
      <ReactDatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="Bitiş tarihi"
        className={`flex-1 px-3 py-2 rounded-lg border ${
          isDarkMode 
            ? 'bg-gray-700 border-gray-600 text-gray-200' 
            : 'bg-white border-gray-300 text-gray-900'
        }`}
        dateFormat="dd.MM.yyyy"
      />
    </div>
  );
}
