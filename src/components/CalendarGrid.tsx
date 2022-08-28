import { Grid, GridItem } from "@chakra-ui/react";
import { CalendarGridItem } from "./CalendarGridItem";
import type { Schedule } from "~/pages/CalendarPage";

export type Props = {
  currentPageDate: Date;
  scheduleList: Schedule[];
  onChange: (set: React.SetStateAction<Schedule[]>) => void;
};

export const CalendarGrid: React.FC<Props> = ({
  currentPageDate,
  scheduleList,
  onChange,
}: Props): JSX.Element => {
  const now = new Date();
  const firstDate = currentPageDate.getDay();
  const lastDate = new Date(
    currentPageDate.getFullYear(),
    currentPageDate.getMonth() + 1,
    0
  ).getDate();

  return (
    <Grid
      templateColumns="repeat(7, 1fr)"
      templateRows="auto repeat(6, 1fr)"
      flexGrow="1"
    >
      <GridItem borderTop="1px solid gray" borderRight="1px solid gray">
        日曜日
      </GridItem>
      <GridItem borderTop="1px solid gray" borderRight="1px solid gray">
        月曜日
      </GridItem>
      <GridItem borderTop="1px solid gray" borderRight="1px solid gray">
        火曜日
      </GridItem>
      <GridItem borderTop="1px solid gray" borderRight="1px solid gray">
        水曜日
      </GridItem>
      <GridItem borderTop="1px solid gray" borderRight="1px solid gray">
        木曜日
      </GridItem>
      <GridItem borderTop="1px solid gray" borderRight="1px solid gray">
        金曜日
      </GridItem>
      <GridItem borderTop="1px solid gray">土曜日</GridItem>
      {[...Array<undefined>(42)].map((_, index) => {
        const border = "1px solid gray";
        const borderRight = index % 7 == 6 ? undefined : border;
        const borderTop = border;
        const dateDiff = index - firstDate;

        // 空欄
        if (dateDiff < 0 || lastDate <= dateDiff) {
          return <GridItem key={index} {...{ borderRight, borderTop }} />;
        }

        // 各日付
        const date = new Date(currentPageDate);
        date.setDate(dateDiff + 1);
        const isToday =
          date.getFullYear() === now.getFullYear() &&
          date.getMonth() === now.getMonth() &&
          date.getDate() === now.getDate();

        // 日毎のスケジュール抽出
        const dayScheduleList = scheduleList
          .filter((schedule) => {
            return (
              date.getFullYear() === schedule.startDate.getFullYear() &&
              date.getMonth() === schedule.startDate.getMonth() &&
              date.getDate() === schedule.startDate.getDate()
            );
          })
          .sort((a, b) => (a > b ? 1 : -1));

        return (
          <CalendarGridItem
            key={index}
            date={date}
            isToday={isToday}
            scheduleList={dayScheduleList}
            sx={{ borderRight, borderTop }}
            onChange={onChange}
          />
        );
      })}
    </Grid>
  );
};
