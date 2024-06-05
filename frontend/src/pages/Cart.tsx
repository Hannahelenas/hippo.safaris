import styled from "styled-components";
import React from "react";
import { useCart } from "../context/CartContext";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  // Using cart to access cartcontext functionality.
  const {
    cartQuantity,
    cartItems,
    decreaseCartQuantity,
    increaseCartQuantity,
    removeFromCart,
  } = useCart();
  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  // Usenavigate hook for navigation
  const navigate = useNavigate();

  return (
    <>
      <Background>
        <CartWrapper>
          <CartItems>
            <h2>Your cart</h2>
            <hr />
            {cartQuantity ? (
              <ul>
                {cartItems.map((item) => (
                  <CartItem key={item.id}>
                    <ItemDetails>
                      <p>{item.name}</p>
                      <p>Travel start: {item.date}</p>
                      <Participants>
                        <span>Tickets: {item.quantity}</span>
                        <ButtonGroup>
                          <AmountButton
                            onClick={() => decreaseCartQuantity(item.id)}
                          >
                            -
                          </AmountButton>
                          <AmountButton
                            onClick={() =>
                              increaseCartQuantity(
                                item.id,
                                item.name,
                                item.price,
                                item.date,
                              )
                            }
                          >
                            +
                          </AmountButton>
                        </ButtonGroup>
                      </Participants>
                      <p>
                        Product total:
                        {item.price * item.quantity}$
                      </p>
                    </ItemDetails>
                    <RemoveButtonContainer>
                      <IconButton
                        aria-label="delete"
                        color="inherit"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </RemoveButtonContainer>
                  </CartItem>
                ))}
              </ul>
            ) : (
              <p>Your Cart is empty!</p>
            )}
          </CartItems>
          {cartQuantity > 0 && (
            <CartSummary>
              <h2>Total</h2>
              <hr />
              <p>{totalCost}$</p>
              <ButtonContainer>
                <StyledButton onClick={() => navigate("/checkout")}>
                  Checkout
                </StyledButton>
              </ButtonContainer>
            </CartSummary>
          )}
        </CartWrapper>
      </Background>
    </>
  );
};

export default Cart;

const Background = styled.div`
  margin-top: 0;
  min-height: 90vh;
  width: 100vw;
  position: relative;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0)
    ),
    url("andrew-liu-EunFGVJLPmQ-unsplash.jpg");
  background-size: cover;
  background-position: center;
  z-index: 0;
  overflow-x: hidden !important;
  box-sizing: border-box !important;
  display: flex;
  justify-content: center;
`;

const CartWrapper = styled.div`
  background-color: rgba(240, 240, 240, 0);
  width: 100vw;
  margin-top: 10vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  padding: 20px;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    width: 100vw;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const CartItems = styled.div`
  background-color: rgba(255, 255, 255, 1);
  width: 50vw;
  height: auto;
  margin-left: 3rem;
  h2 {
    margin: 1rem;
  }
  hr {
    width: 100%;
    border: 0;
    border-top: 1px solid #ccc;
    margin-top: 1rem;
  }
  p {
    margin: 1rem;
  }

  @media (max-width: 768px) {
    width: 90vw;
    margin-left: 0;
    margin-bottom: 1rem;
  }
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 0.5rem;
`;

const ItemDetails = styled.div`
  flex: 3;

  p {
    margin: 0.5rem 0;
    margin-left: 1rem;
  }
`;

const Participants = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-right: 1rem;
    margin-left: 1rem;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 1rem;
`;

const RemoveButtonContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-self: flex-start;
`;

const CartSummary = styled.div`
  background-color: rgba(255, 255, 255, 1);
  width: 30vw;
  margin-right: 4rem;
  h2 {
    margin: 1rem;
  }
  hr {
    width: 100%;
    border: 0;
    border-top: 1px solid #ccc;
    margin-top: 1rem;
  }
  p {
    margin: 1rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    width: 90vw;
    margin: 0;
  }
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* padding: 1rem; */
  margin-bottom: 2rem;
  margin-right: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledButton = styled.button`
  background-color: #595959;
  color: white;
  display: flex;
  justify-content: space-between;
  text-decoration: none !important;
  align-items: center;
  padding: 0.8rem 3rem;
  margin-right: 0.5rem;
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
    background-color: rgba(89, 89, 89, 0.9);
    color: white;
  }
  @media (max-width: 768px) {
    margin-right: 1.5rem;
  }

}
`;

const AmountButton = styled.button`
  background-color: #595959;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  width: 50px;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    background-color: rgba(89, 89, 89, 0.9);
    color: white;
  }
`;
