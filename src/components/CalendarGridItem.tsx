import type React from "react";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import type { SystemStyleObject } from "@chakra-ui/react";
import { HStack, IconButton, Spacer, Stack } from "@chakra-ui/react";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
  Box,
  Text,
  GridItem,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import type { Schedule } from "~/pages/CalendarPage";
import { ScheduleItem } from "./ScheduleItem";
import type { FormValue } from "./ScheduleInput";
import { ScheduleInput } from "./ScheduleInput";
import ReactFocusLock from "react-focus-lock";
import { RiCloseLine, RiSave2Line } from "react-icons/ri";

export type Props = {
  scheduleList: Schedule[];
  date: Date;
  isToday: boolean;
  sx: SystemStyleObject;
  onChange: (set: React.SetStateAction<Schedule[]>) => void;
};

export const CalendarGridItem: React.FC<Props> = memo(
  ({ scheduleList, date, sx, isToday, onChange }: Props): JSX.Element => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const defaultValue: FormValue = useMemo(() => {
      return {
        date: `${String(date.getFullYear()).padStart(4, "0")}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
        detail: "",
        endTime: "",
        startTime: "",
        title: "",
      };
    }, [date]);

    const [formValue, setFormValue] = useState<FormValue>(defaultValue);
    const firstFieldRef = useRef<HTMLInputElement>(null);

    const handleClose = useCallback(() => {
      onClose();
      setFormValue(defaultValue);
    }, [defaultValue, onClose]);

    const handleOpenClick = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        onOpen();
        event.stopPropagation();
      },
      [onOpen]
    );

    const handleCloseClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        handleClose();
        event.stopPropagation();
      },
      [handleClose]
    );

    const handleFromChange = useCallback(
      (value: React.SetStateAction<FormValue>) => {
        setFormValue(value);
      },
      []
    );

    const handleSaveClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        const startDate = new Date(`${formValue.date} ${formValue.startTime}`);
        const endDate = new Date(`${formValue.date} ${formValue.endTime}`);
        const schedule: Schedule = {
          id: uuidv4(),
          title: formValue.title,
          startDate,
          endDate,
          detail: formValue.detail,
        };
        onChange((prev) => {
          return [...prev, schedule];
        });
        handleClose();
        event.stopPropagation();
      },
      [
        formValue.date,
        formValue.detail,
        formValue.endTime,
        formValue.startTime,
        formValue.title,
        handleClose,
        onChange,
      ]
    );

    return (
      <GridItem sx={sx} onClick={handleOpenClick}>
        {isToday ? (
          <Box mt={1} h="5px" bg="green.400" />
        ) : (
          <Box mt={1} h="5px" />
        )}
        <Stack mx={1} spacing={0.5}>
          <Text>{date.getDate()}日</Text>
          {scheduleList.map((schedule) => {
            return (
              <Box key={schedule.id}>
                <ScheduleItem schedule={schedule} onChange={onChange} />
              </Box>
            );
          })}
          <Box>
            <Popover
              isOpen={isOpen}
              initialFocusRef={firstFieldRef}
              onOpen={onOpen}
              onClose={handleClose}
              placement="right"
            >
              <PopoverTrigger>
                {isOpen ? (
                  <Box
                    bg="green.200"
                    borderRadius="4px"
                    textColor="white"
                    px={1}
                  >
                    新規作成...
                  </Box>
                ) : (
                  <></>
                )}
              </PopoverTrigger>
              <PopoverContent width="480px">
                <ReactFocusLock returnFocus persistentFocus={false}>
                  <PopoverHeader fontWeight="semibold">
                    <HStack spacing={0}>
                      <Text>予定の追加</Text>
                      <Spacer />
                      <IconButton
                        aria-label="save"
                        icon={<RiSave2Line size="1.2rem" />}
                        variant="ghost"
                        onClick={handleSaveClick}
                      />
                      <IconButton
                        aria-label="close"
                        icon={<RiCloseLine size="1.2rem" />}
                        variant="ghost"
                        onClick={handleCloseClick}
                      />
                    </HStack>
                  </PopoverHeader>
                  <PopoverArrow />
                  <PopoverBody>
                    <ScheduleInput
                      firstFieldRef={firstFieldRef}
                      value={formValue}
                      onChange={handleFromChange}
                    />
                  </PopoverBody>
                </ReactFocusLock>
              </PopoverContent>
            </Popover>
          </Box>
        </Stack>
      </GridItem>
    );
  }
);
