import type React from "react";
import { memo, useCallback } from "react";
import {
  FormControl,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { RiText } from "react-icons/ri";
import { RiCalendar2Fill } from "react-icons/ri";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";

export type Props = {
  value: FormValue;
  defaultValue?: FormValue;
  onChange: (set: React.SetStateAction<FormValue>) => void;
  firstFieldRef: React.RefObject<HTMLInputElement>;
};

export type FormValue = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  detail: string;
};

export const ScheduleInput: React.FC<Props> = memo(
  ({ value, firstFieldRef, defaultValue, onChange }: Props): JSX.Element => {
    const handleTitleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange((prev) => {
          return {
            ...prev,
            title: event.target.value,
          };
        });
      },
      [onChange]
    );
    const handleDateChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange((prev) => {
          return {
            ...prev,
            date: event.target.value,
          };
        });
      },
      [onChange]
    );
    const handleStartTimeChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange((prev) => {
          return {
            ...prev,
            startTime: event.target.value,
          };
        });
      },
      [onChange]
    );
    const handleEndTimeChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange((prev) => {
          return {
            ...prev,
            endTime: event.target.value,
          };
        });
      },
      [onChange]
    );
    const handleDetailChange = useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange((prev) => {
          return {
            ...prev,
            detail: event.target.value,
          };
        });
      },
      [onChange]
    );
    return (
      <Stack p={4} spacing={4}>
        <FormControl>
          <HStack spacing={6}>
            <RiText />
            <Input
              ref={firstFieldRef}
              value={value?.title}
              defaultValue={defaultValue?.title}
              onChange={handleTitleChange}
            />
          </HStack>
        </FormControl>
        <FormControl>
          <HStack spacing={6}>
            <RiCalendar2Fill />
            <Input
              type="date"
              value={value?.date}
              defaultValue={defaultValue?.date}
              onChange={handleDateChange}
            />
          </HStack>
        </FormControl>
        <FormControl>
          <HStack spacing={6}>
            <AiOutlineClockCircle />
            <HStack>
              <Input
                type="time"
                value={value?.startTime}
                defaultValue={defaultValue?.startTime}
                onChange={handleStartTimeChange}
              />
              <Text>~</Text>
              <Input
                type="time"
                value={value?.endTime}
                defaultValue={defaultValue?.endTime}
                onChange={handleEndTimeChange}
              />
            </HStack>
          </HStack>
        </FormControl>
        <FormControl>
          <HStack spacing={6}>
            <BiDetail />
            <Textarea
              value={value?.detail}
              defaultValue={defaultValue?.detail}
              onChange={handleDetailChange}
            />
          </HStack>
        </FormControl>
      </Stack>
    );
  }
);
