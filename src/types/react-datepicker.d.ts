declare module 'react-datepicker' {
  import React from 'react';

  export interface ReactDatePickerProps {
    selected?: Date | null;
    onChange?: (date: Date | null) => void;
    startDate?: Date | null;
    endDate?: Date | null;
    selectsRange?: boolean;
    minDate?: Date;
    maxDate?: Date;
    dateFormat?: string;
    className?: string;
    placeholderText?: string;
    isClearable?: boolean;
    showTimeSelect?: boolean;
    timeFormat?: string;
    timeIntervals?: number;
    timeCaption?: string;
  }

  declare const ReactDatePicker: React.ComponentType<ReactDatePickerProps>;
  export default ReactDatePicker;
}
