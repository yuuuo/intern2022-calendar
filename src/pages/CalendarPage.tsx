import { useCallback, useState } from "react";
import { Stack } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { Header } from "~/components/Header";
import { CalendarGrid } from "~/components/CalendarGrid";

export type Schedule = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  detail: string;
};

export const CalendarPage: React.FC = (): JSX.Element => {
  const now = new Date();
  const [currentPageDate, setCurrentPageDate] = useState<Date>(
    new Date(now.getFullYear(), now.getMonth())
  );
  const [scheduleList, setScheduleList] = useState<Schedule[]>([
    {
      id: uuidv4(),
      startDate: now,
      endDate: now,
      detail: "詳細",
      title: "こんにちは",
    },
  ]);
  const handleDateChange = useCallback((date: Date) => {
    setCurrentPageDate(date);
  }, []);
  const handleScheduleListChange = useCallback(
    (set: React.SetStateAction<Schedule[]>) => {
      setScheduleList(set);
    },
    []
  );
  return (
    <Stack h="100vh" spacing={0}>
      <Header
        currentPageDate={currentPageDate}
        onDateChange={handleDateChange}
      />
      <CalendarGrid
        currentPageDate={currentPageDate}
        scheduleList={scheduleList}
        onChange={handleScheduleListChange}
      />
    </Stack>
  );
};
