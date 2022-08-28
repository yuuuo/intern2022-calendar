import { memo, useCallback, useMemo, useRef, useState } from "react";
import {
  Box,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import type { Schedule } from "~/pages/CalendarPage";
import { DetailPopoverBody } from "./DetailPopoverBody";
import {
  RiCloseLine,
  RiDeleteBinLine,
  RiEdit2Line,
  RiSave2Line,
} from "react-icons/ri";
import type { FormValue } from "./ScheduleInput";
import { ScheduleInput } from "./ScheduleInput";
import ReactFocusLock from "react-focus-lock";

export type Props = {
  schedule: Schedule;
  onChange: (set: React.SetStateAction<Schedule[]>) => void;
};

export const ScheduleItem: React.FC<Props> = memo(
  ({ schedule, onChange }: Props): JSX.Element => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const defaultValue: FormValue = useMemo(() => {
      const startTime = `${String(schedule.startDate.getHours()).padStart(
        2,
        "0"
      )}:${String(schedule.startDate.getMinutes()).padStart(2, "0")}`;
      const endTime = `${String(schedule.endDate.getHours()).padStart(
        2,
        "0"
      )}:${String(schedule.endDate.getMinutes()).padStart(2, "0")}`;
      return {
        date: `${String(schedule.startDate.getFullYear()).padStart(
          4,
          "0"
        )}-${String(schedule.startDate.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(schedule.startDate.getDate()).padStart(2, "0")}`,
        detail: schedule.detail,
        title: schedule.title,
        startTime,
        endTime,
      };
    }, [schedule]);

    const [formValue, setFormValue] = useState<FormValue>(defaultValue);
    const firstFieldRef = useRef<HTMLInputElement>(null);

    const handleOpenClick = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        onOpen();
        setIsEdit(false);
        event.stopPropagation();
      },
      [onOpen]
    );

    const handleCloseClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClose();
        setIsEdit(false);
        event.stopPropagation();
      },
      [onClose]
    );

    const handleEditClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsEdit(true);
        event.stopPropagation();
      },
      []
    );

    const handleDeleteClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsEdit(true);
        onChange((prev) => {
          return prev.filter((prevSchedule) => prevSchedule.id !== schedule.id);
        });
        event.stopPropagation();
      },
      [onChange, schedule.id]
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
        const editedSchedule: Schedule = {
          id: schedule.id,
          title: formValue.title,
          startDate,
          endDate,
          detail: formValue.detail,
        };
        onChange((prev) => {
          return prev.map((prevSchedule) => {
            if (prevSchedule.id === schedule.id) {
              return editedSchedule;
            }
            return prevSchedule;
          });
        });
        setIsEdit(false);
        event.stopPropagation();
      },
      [
        formValue.date,
        formValue.detail,
        formValue.endTime,
        formValue.startTime,
        formValue.title,
        onChange,
        schedule.id,
      ]
    );

    return (
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
      >
        <PopoverTrigger>
          <Box
            key={schedule.title}
            bg="green.400"
            borderRadius="4px"
            textColor="white"
            px={1}
            onClick={handleOpenClick}
          >
            {schedule.title}
          </Box>
        </PopoverTrigger>
        <PopoverContent
          width="480px"
          onClick={(event) => event.stopPropagation()}
        >
          <ReactFocusLock returnFocus persistentFocus={false}>
            <PopoverHeader fontWeight="semibold">
              <HStack spacing={0}>
                <Text>予定の詳細</Text>
                <Spacer />
                {isEdit ? (
                  <IconButton
                    aria-label="save"
                    icon={<RiSave2Line size="1.2rem" />}
                    variant="ghost"
                    onClick={handleSaveClick}
                  />
                ) : (
                  <IconButton
                    aria-label="edit"
                    icon={<RiEdit2Line size="1.2rem" />}
                    variant="ghost"
                    onClick={handleEditClick}
                  />
                )}
                <IconButton
                  aria-label="delete"
                  icon={<RiDeleteBinLine size="1.2rem" />}
                  variant="ghost"
                  onClick={handleDeleteClick}
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
              {isEdit ? (
                <ScheduleInput
                  firstFieldRef={firstFieldRef}
                  value={formValue}
                  onChange={handleFromChange}
                />
              ) : (
                <DetailPopoverBody schedule={schedule} />
              )}
            </PopoverBody>
          </ReactFocusLock>
        </PopoverContent>
      </Popover>
    );
  }
);
