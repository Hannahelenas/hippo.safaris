import { Dayjs } from "dayjs";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import { PickersCalendarHeaderProps } from "@mui/x-date-pickers/PickersCalendarHeader";

const CustomCalendarHeaderRoot = styled("div")({
    "& .MuiTypography-root": {
        fontFamily:"'Nunito Sans', 'Roboto', 'Oxygen', sans-serif !important",
        fontSize: "16px",
    },
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 16px",
  alignItems: "center",
  backgroundColor: "white",
});

const StyledIconButton = styled(IconButton)({
  "& .MuiSvgIcon-root": {
    fontSize: "1.25rem",
    color: "#595959 !important",
  },
  "&:hover": {
    backgroundColor: "white !important",
  },
  "&:active": {
    backgroundColor: "white !important",
  },
  "&:focus": {
    backgroundColor: "white !important",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "white !important",
  },
  "&.MuiIconButton-root:focus": {
    backgroundColor: "white !important",
  },
  "&.MuiIconButton-root:active": {
    backgroundColor: "white !important",
  },
  "& .MuiTouchRipple-root": {
    color: "white !important",
  },
});

function CustomCalendarHeader(props: PickersCalendarHeaderProps<Dayjs>) {
  const { currentMonth, onMonthChange } = props;

  const selectNextMonth = () =>
    onMonthChange(currentMonth.add(1, "month"), "left");
  const selectNextYear = () =>
    onMonthChange(currentMonth.add(1, "year"), "left");
  const selectPreviousMonth = () =>
    onMonthChange(currentMonth.subtract(1, "month"), "right");
  const selectPreviousYear = () =>
    onMonthChange(currentMonth.subtract(1, "year"), "right");

  return (
    <CustomCalendarHeaderRoot>
      <Stack spacing={1} direction="row">
        <StyledIconButton
          onClick={selectPreviousYear}
          title="Previous year"
          size="small"
        >
          <KeyboardDoubleArrowLeftIcon />
        </StyledIconButton>
        <StyledIconButton
          onClick={selectPreviousMonth}
          title="Previous month"
          size="small"
        >
          <ChevronLeft />
        </StyledIconButton>
      </Stack>
      <Typography variant="body2">
        {currentMonth.format("MMMM YYYY")}
      </Typography>
      <Stack spacing={1} direction="row">
        <StyledIconButton
          onClick={selectNextMonth}
          title="Next month"
          size="small"
        >
          <ChevronRight />
        </StyledIconButton>
        <StyledIconButton
          onClick={selectNextYear}
          title="Next year"
          size="small"
        >
          <KeyboardDoubleArrowRightIcon />
        </StyledIconButton>
      </Stack>
    </CustomCalendarHeaderRoot>
  );
}

export default CustomCalendarHeader;
