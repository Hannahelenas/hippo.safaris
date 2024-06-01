import styled from "styled-components";

interface ButtonProps {
  text: string;
  onClick: () => void;
  selected: boolean;
}

const CustomFilterButton = styled.button<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? "#595959" : "#efebe8")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => (props.selected ? "white" : "black")};
  padding: 0.8rem 2rem;
  border-radius: 40px;
  font-family: "Lora", "Nunito Sans", "Roboto", "Oxygen";
  text-transform: none;
  font-size: 17px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: #595959;
    color: white;
  }
`;

const FilterButton: React.FC<ButtonProps> = ({ text, onClick, selected }) => {
  return (
    <CustomFilterButton onClick={onClick} selected={selected}>
      {text}
    </CustomFilterButton>
  );
};

export default FilterButton;
