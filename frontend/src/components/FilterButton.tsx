import { Button } from "@mui/material";
import styled from "styled-components";

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const CustomFilterButton = styled(Button)`
background-color: rgba(255, 255, 255, 0.8) !important;
  color: black !important;
  width: 154.41px !important;
  padding: 0.8rem 2.5rem !important;
  font-weight: bold !important;
  font-family: 'Nunito Sans', 'Roboto', 'Oxygen' !important;
  text-transform: none !important;
  border-radius: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.9) !important;
    text-decoration: none !important;
  }

`;

const FilterButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <CustomFilterButton onClick={onClick} variant="contained" disableElevation size="large">
      {text}
    </CustomFilterButton>
  );
};

export default FilterButton;
