import styled from "styled-components";

interface ButtonProps {
  text: string;
  onClick: () => void;
 /*  selected: boolean; */
}


const DefaultButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  return <StyledDefaultButton onClick={onClick}>{text}</StyledDefaultButton >;
};

export default DefaultButton;
const StyledDefaultButton = styled.button`
  backgrund-color: white;
  color: #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 3rem;
  border-radius: 40px;
  font-family: "Lora", "Nunito Sans", "Roboto", "Oxygen";
  text-transform: none;
  font-size: 17px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
  &:hover {
    background-color: #F9F6F3;
    color: #000000;
  }
`;
