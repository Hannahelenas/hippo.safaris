import styled from 'styled-components';
import React from 'react';
import { useCart } from '../context/CartContext';
import { Button,  IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from 'react-router-dom';

/* import { NavLink } from 'react-router-dom';  */

const Cart: React.FC = () => {
    const {
        cartQuantity,
        cartItems,
        decreaseCartQuantity,
        increaseCartQuantity,
        removeFromCart
    } = useCart();
    const totalCost = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <>
            <Background>
                <CartWrapper>
                    <CartItems>
                        <h2>Your cart</h2>
                        {cartQuantity ? (
                            <ul>
                                {cartItems.map((item) => (
                                    <CartItem key={item.id}>
                                        <ItemDetails>
                                            <p>{item.name}</p>
                                            <p>Travel start: {item.date}</p>
                                            {/* <p>Participants: {item.quantity}</p> */}
                                            <Participants>
                                                <span>Tickets: {item.quantity}</span>
                                                <ButtonGroup>
                                                    <Button
                                                        variant="contained"
                                                        disableElevation
                                                        size="small"
                                                        color="primary"
                                                        onClick={() => decreaseCartQuantity(item.id)}
                                                    >
                                                        -
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        disableElevation
                                                        size="small"
                                                        color="primary"
                                                        onClick={() => increaseCartQuantity(item.id, item.name, item.price, item.date)}
                                                    >
                                                        +
                                                    </Button>
                                                </ButtonGroup>
                                            </Participants>
                                            <p>
                                                Total:
                                                {item.price * item.quantity}$
                                            </p>
                                            {/* <ButtonGroup>
                                                <Button
                                                    variant="contained"
                                                    disableElevation
                                                    color="primary"
                                                    size="small"
                                                    onClick={() =>
                                                        decreaseCartQuantity(
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    -
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    disableElevation
                                                    color="primary"
                                                    size="small"
                                                    onClick={() =>
                                                        increaseCartQuantity(
                                                            item.id,
                                                            item.name,
                                                            item.price,
                                                            item.date
                                                        )
                                                    }
                                                >
                                                    +
                                                </Button>
                                            </ButtonGroup> */}
                                        </ItemDetails>
                                        <RemoveButtonContainer>
                                           {/*  <Button
                                                variant="outlined"
                                                disableElevation
                                                color="inherit"
                                                startIcon={<CloseIcon />}
                                                onClick={() =>
                                                    removeFromCart(item.id)
                                                }
                                            >
                                                Remove
                                            </Button> */}
                                            <IconButton
                                                aria-label="delete"
                                                color="inherit"
                                                onClick={() =>
                                                    removeFromCart(item.id)
                                                }
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
                            {/* <h3>Total</h3>
                            <p>{totalCost}</p> */}
                            <h2>Total</h2>
                            <p>{totalCost}</p>
                            <ButtonContainer>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    color="primary"
                                    component={NavLink} to="/checkout"
                                >
                                    Checkout
                                </Button>
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
    height: auto;
    width: 100vw;
    position: relative;
    background: grey;
    background-size: cover;
    background-position: center;
    z-index: 0;
    overflow-x: hidden !important;
    box-sizing: border-box !important;
    display: flex;
    justify-content: center;
`;

const CartWrapper = styled.div`
    background-color: rgba(240, 240, 240, 1);
    width: 100vw;
    margin-top: 11vh;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px;
    flex-wrap: wrap;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        width: 100vw;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        /* padding: 5px; */
    }
`;

const CartItems = styled.div`
    background-color: rgba(255, 255, 255, 1);
    width: 50vw;
    margin-left: 3rem;
    h2,
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
    margin-right: 3rem;
    h2,
    p {
        margin: 1rem;
    }

    @media (max-width: 768px) {
        width: 90vw;
        margin: 0;
    }
`;

const ButtonContainer = styled.div`
    margin-top: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding: 1rem; */
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        width: 100%;
    }
`;
