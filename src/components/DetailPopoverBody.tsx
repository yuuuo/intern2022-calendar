import { memo } from "react";
import { HStack, Stack, Text } from "@chakra-ui/react";
import type { Schedule } from "~/pages/CalendarPage";
import { RiText } from "react-icons/ri";
import { RiCalendar2Fill } from "react-icons/ri";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";

export type Props = {
  schedule: Schedule;
};

export const DetailPopoverBody: React.FC<Props> = memo(
  ({ schedule }: Props): JSX.Element => {
    return (
      <Stack p={4} spacing={4}>
        <HStack spacing={6}>
          <RiText />
          <Text>{schedule.title}</Text>
        </HStack>
        <HStack spacing={6}>
          <RiCalendar2Fill />
          <Text>
            {`${schedule.startDate.getFullYear()} / ${
              schedule.startDate.getMonth() + 1
            } / ${schedule.startDate.getDate()}`}
          </Text>
        </HStack>
        <HStack spacing={6}>
          <AiOutlineClockCircle />
          <HStack>
            <Text>{`${String(schedule.startDate.getHours()).padStart(
              2,
              "0"
            )}:${String(schedule.startDate.getMinutes()).padStart(
              2,
              "0"
            )}`}</Text>
            <Text>~</Text>
            <Text>{`${String(schedule.startDate.getHours()).padStart(
              2,
              "0"
            )}:${String(schedule.startDate.getMinutes()).padStart(
              2,
              "0"
            )}`}</Text>
          </HStack>
        </HStack>
        <HStack spacing={6}>
          <BiDetail />
          <Text>{schedule.detail}</Text>
        </HStack>
      </Stack>
    );
  }
);
