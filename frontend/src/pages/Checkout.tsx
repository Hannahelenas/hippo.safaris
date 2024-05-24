import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

const Checkout = () => {
    const { cartQuantity, cartItems } = useCart();

    const totalCost = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const validationSchema = yup.object({
        email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
        name: yup.string().required('Name is required'),
        lastName: yup.string().required('Lastname is required'),
        phone: yup.string().required('Phone is required')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            lastName: '',
            phone: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const orderData = {
                    email: values.email,
                    name: values.name,
                    lastName: values.lastName,
                    phone: values.phone,
                    totalCost: totalCost,
                    products: cartItems.map((item) => ({
                        name: item.name,
                        quantity: item.quantity,
                        date: item.date
                    }))
                };

                const response = await axios.post(
                    'http://localhost:3000/orders',
                    orderData
                );

                console.log('Order placed successfully:', response.data);
                console.log('Order data:', orderData);

                formik.resetForm();
            } catch (error) {
                console.error('Error handling form submission:', error);
            }
        }
    });

    return (
        <Wrapper>
            <CheckoutTitle>Checkout</CheckoutTitle>
            <ContentWrapper>
                <OrderSummary>
                    <h2>Order summary</h2>
                    {cartQuantity ? (
                        <div>
                            {cartItems.map((item) => (
                                <div key={item.id}>
                                    <p>
                                        {item.name} - {item.price} - Tickets:{' '}
                                        {item.quantity} Total:{' '}
                                        {item.price * item.quantity}
                                        {item.date}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Din varukorg är tom.</p>
                    )}
                    <p>Total: {totalCost}</p>

                </OrderSummary>
                <FormWrapper>
                <h2>Contact details</h2>
                    <Form onSubmit={formik.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            required
                            fullWidth
                            margin="normal"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                            helperText={
                                formik.touched.email && formik.errors.email
                            }
                        />
                        <TextField
                            id="name"
                            name="name"
                            label="Name"
                            type="text"
                            required
                            fullWidth
                            margin="normal"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.name &&
                                Boolean(formik.errors.name)
                            }
                            helperText={
                                formik.touched.name && formik.errors.name
                            }
                        />
                        <TextField
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            type="text"
                            required
                            fullWidth
                            margin="normal"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.lastName &&
                                Boolean(formik.errors.lastName)
                            }
                            helperText={
                                formik.touched.lastName &&
                                formik.errors.lastName
                            }
                        />
                        <TextField
                            id="phone"
                            name="phone"
                            label="Phone"
                            type="tel"
                            required
                            fullWidth
                            margin="normal"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.phone &&
                                Boolean(formik.errors.phone)
                            }
                            helperText={
                                formik.touched.phone && formik.errors.phone
                            }
                        />
                        <Button
                            color="primary"
                            variant="contained"
                            disableElevation
                            type="submit"
                            style={{ marginTop: '1rem' }}
                        >
                            Place Order
                        </Button>
                    </Form>
                </FormWrapper>
            </ContentWrapper>
        </Wrapper>
    );
};

export default Checkout;

const Wrapper = styled.div`
    margin-top: 5rem;
    background-color: rgba(240, 240, 240, 1);
`;

const CheckoutTitle = styled.h1`
    margin-left: 5rem;

    @media (max-width: 768px) {
        margin-left: 0;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 5rem;

    @media (max-width: 768px) {
        flex-direction: column;
        margin: 1rem;
    }
`;

const OrderSummary = styled.div`
    flex: 1;
    margin-right: 2rem;
    margin-bottom: auto;
    background-color: rgba(255, 255, 255, 1);
    @media (max-width: 768px) {
        margin-right: 0;
        margin-bottom: 2rem;
    }
`;

const FormWrapper = styled.div`
    flex: 1;
    background-color: rgba(255, 255, 255, 1);
    margin-bottom: 1rem;
    @media (max-width: 768px) {
        margin-top: 2rem;
    }
`;

const Form = styled.form`
    width: 100%;

`;
