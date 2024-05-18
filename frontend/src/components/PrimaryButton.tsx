import { Button } from "@mui/material";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

interface ButtonProps {
    text: string;
    to: string;
}

const CustomButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.8) !important;
  color: black !important;
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

const PrimaryButton: React.FC<ButtonProps> = ({ text, to }) => {
  return (
    <CustomButton variant="contained" disableElevation size="large" as={RouterLink} to={to}>
      {text}
    </CustomButton>
  );
};

export default PrimaryButton;
