import "@mantine/dates/styles.css";
import { Calendar } from "@mantine/dates";
import { useState } from "react";
import { useMantineTheme, Indicator } from "@mantine/core";

 const MiniCalendar = () => {
  const [selectedDates, setSelectedDates] = useState([1,2,4,5,6,7,10,14,16]);
  const theme = useMantineTheme();

  return (
    <Calendar
      static
      renderDay={(date) => {
        const day = date.getDate();
        const currentMonth = new Date().getMonth();
        const isCurrentMonth = date.getMonth() === currentMonth;
        const isHighlighted = isCurrentMonth && selectedDates.includes(day);
        return (
          <>
            <Indicator
              size={6}
              color={theme.colors.customRed[0]}
              offset={-2}
              disabled={!isHighlighted}
            >
              <div>{day}</div>
            </Indicator>
          </>
        );
      }}
    />
  );
}

export default MiniCalendar;
