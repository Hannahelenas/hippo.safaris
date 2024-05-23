import { ReactNode, createContext, useContext } from 'react';
import { useState } from 'react';

type CartProviderProps = {
    children: ReactNode;
};

type CartContext = {
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number, name: string, price: number, date: string) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    cartQuantity: number;
    cartItems: CartItem[];
};

type CartItem = {
    id: number;
    quantity: number;
    name: string;
    price: number;
    date: string;
};

const CartContext = createContext({} as CartContext);

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    );

    function getItemQuantity(id: number) {
        return cartItems.find((item) => item.id === id)?.quantity || 0;
    }

    function increaseCartQuantity(id: number, name: string, price: number, date: string ) {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id) == null) {
                return [...currItems, { id, name, price, quantity: 1,  date }];
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1, date };
                    } else {
                        return item;
                    }
                });
            }
        });
    }
    function decreaseCartQuantity(id: number) {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id)?.quantity === 1) {
                return currItems.filter((item) => item.id !== id);
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    }
    function removeFromCart(id: number) {
        setCartItems((currItems) => {
            return currItems.filter((item) => item.id !== id);
        });
    }

    return (
        <CartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                cartItems,
                cartQuantity
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
