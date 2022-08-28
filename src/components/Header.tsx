import { memo, useCallback } from "react";
import {
  HStack,
  Heading,
  Text,
  IconButton,
  Spacer,
  theme,
} from "@chakra-ui/react";
import { RiCalendar2Fill } from "react-icons/ri";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

export type Props = {
  currentPageDate: Date;
  onDateChange: (date: Date) => void;
};

export const Header: React.FC<Props> = memo(
  ({ currentPageDate, onDateChange }: Props): JSX.Element => {
    const handlePrevClick = useCallback(() => {
      const prev = new Date(
        currentPageDate.getFullYear(),
        currentPageDate.getMonth() - 1
      );
      onDateChange(prev);
    }, [currentPageDate, onDateChange]);

    const handleNextClick = useCallback(() => {
      const next = new Date(
        currentPageDate.getFullYear(),
        currentPageDate.getMonth() + 1
      );
      onDateChange(next);
    }, [currentPageDate, onDateChange]);

    return (
      <HStack px={10} py={2} w="100vw">
        <RiCalendar2Fill color={theme.colors.green[400]} size="3rem" />
        <Heading as="h1" size="lg">
          カレンダー
        </Heading>
        <Spacer />
        <IconButton
          aria-label="prev month"
          variant="ghost"
          icon={<MdOutlineNavigateBefore size="2rem" />}
          onClick={handlePrevClick}
        />
        <Text fontSize="2xl">
          {currentPageDate.getFullYear()}年 {currentPageDate.getMonth() + 1}月
        </Text>
        <IconButton
          aria-label="next month"
          variant="ghost"
          icon={<MdOutlineNavigateNext size="2rem" />}
          onClick={handleNextClick}
        />
      </HStack>
    );
  }
);
