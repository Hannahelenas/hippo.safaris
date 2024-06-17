import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Interface form error text
interface ErrorTextProps {
  visible: boolean;
}

const Checkout = () => {
  // Use cart for context functionality.
  const { cartQuantity, cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  // Form validation
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    name: yup.string().required("Name is required"),
    lastName: yup.string().required("Lastname is required"),
    phone: yup
      .string()
      .required("Phone is required")
      .min(10, "Phone must be at least 10 characters")
      .max(12, "Phone must be at most 12 characters"),
  });

  // Initializing formik to handle form submission.
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      lastName: "",
      phone: "",
    },
    validationSchema: validationSchema,
    // Handle submit.
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
            date: item.date,
          })),
        };
        // POST request to server
         /* const response = await axios.post(
          "http://localhost:3000/orders",
          orderData,
        ); */
        const response = await axios.post(
          "https://hippo-safaris.onrender.com/orders",
          orderData,
        );

        console.log("Order placed successfully:", response.data);
        console.log("Order data:", orderData);
        // Reset form.
        formik.resetForm();
        // Clear the cart.
        clearCart();
        // Navigate to confirmation page.
        navigate("/confirmation");
        // Catch erros.
      } catch (error) {
        console.error("Error handling form submission:", error);
      }
    },
  });

  return (
    <Background>
      <CheckoutWrapper>
        <OrderSummary>
          <h2>Order summary</h2>
          <hr />
          {cartQuantity ? (
            <div>
              {cartItems.map((item) => (
                <div key={item.id}>
                  <p>Tour: {item.name}</p>
                  <p>Price: {item.price}</p>
                  <p>Tickets: {item.quantity}</p>
                  <p>Total: {item.price * item.quantity}</p>
                  <p>Travel start date: {item.date}</p>
                  <hr />
                </div>
              ))}

              <p>
                <strong>Order total: {totalCost}$</strong>
              </p>
              <hr />
            </div>
          ) : (
            <p>No summary to show.</p>
          )}
          {/* <hr/> */}
        </OrderSummary>
        <FormWrapper>
          <h2>Contact details</h2>
          <hr />
          <Form onSubmit={formik.handleSubmit}>
            <StyledInput
              id="email"
              name="email"
              placeholder="Email*"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <ErrorText
                visible={!!(formik.touched.email && formik.errors.email)}
              >
                {formik.errors.email}
              </ErrorText>
            )}
            <StyledInput
              id="name"
              name="name"
              placeholder="Name*"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <ErrorText
                visible={!!(formik.touched.name && formik.errors.name)}
              >
                {formik.errors.name}
              </ErrorText>
            )}
            <StyledInput
              id="lastname"
              name="lastName"
              type="text"
              placeholder="Lastname*"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <ErrorText
                visible={!!(formik.touched.lastName && formik.errors.lastName)}
              >
                {formik.errors.lastName}
              </ErrorText>
            )}

            <StyledInput
              id="phone"
              name="phone"
              placeholder="Phone*"
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <ErrorText
                visible={!!(formik.touched.phone && formik.errors.phone)}
              >
                {formik.errors.phone}
              </ErrorText>
            )}
            <ButtonWrapper>
              <StyledButton
                type="submit"
                disabled={!formik.isValid || !formik.dirty}
              >
                Place order
              </StyledButton>
            </ButtonWrapper>
          </Form>
        </FormWrapper>
      </CheckoutWrapper>
    </Background>
  );
};

export default Checkout;

const Background = styled.div`
  margin-top: 0;
  min-height: 100vh;
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
  @media (max-width: 768px) {
    height: auto;
  }
`;

const CheckoutWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 10vh;
  padding: 20px;

  @media (max-width: 768px) {
    margin-top: 7vh;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    align-items: center;
    gap: 2px;
  }
`;

const OrderSummary = styled.div`
  background-color: rgba(255, 255, 255, 1);
  width: 40vw;
  /*  min-height: 50vh !important; */
  height: auto;
  margin-left: 3rem;
  margin-bottom: 1rem;
  p {
    margin: 1rem;
  }
  h2 {
    margin: 1rem;
  }
  hr {
    width: 100%;
    border: 0;
    border-top: 1px solid #ccc;
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    width: 90vw;
    margin-left: 0;
    margin-bottom: 1rem;
    height: auto;
  }
`;

const FormWrapper = styled.div`
  background-color: rgba(255, 255, 255, 1);
  width: 40vw;
  height: 70vh;
  margin-right: 4rem;
  margin-bottom: 2rem;
  h2 {
    margin: 1rem;
    /*   margin-left: 1rem; */
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
  @media (max-width: 1024px) {
    max-height: 45vh;
  }

  @media (max-width: 768px) {
    width: 90vw;
    margin: 0;
    height: auto;
  }
`;

const Form = styled.form`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const StyledInput = styled.input`
  width: auto;
  height: 40px;
  border: none;
  border-radius: 5px;
  color: black;
  margin: 0.5rem;
  padding: 8px;
  background-color: #f9f6f3;
  box-sizing: border-box;
  outline: none;

  &::placeholder {
    color: #000000;
    opacity: 1;
  }

  &:focus {
    border: 1px solid #c02b0a;
  }

  /* WebKit specific styles for autofill */
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #f9f6f3 inset !important;
    -webkit-text-fill-color: black !important;
  }

  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #f9f6f3 inset !important;
    -webkit-text-fill-color: black !important;
  }
`;

const ErrorText = styled.div<ErrorTextProps>`
  color: #c02b0a;
  font-size: 0.875em;
  margin-left: 0.5rem;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`;

const ButtonWrapper = styled.div`
  align-self: flex-end;
  margin-top: 1rem;
  margin: 0.5rem;
  margin-bottom: 1rem;
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
  &:disabled {
    background-color: rgba(89, 89, 89, 0.8);
    color: white;
    cursor: not-allowed;
  }
  @media (max-width: 768px) {
    margin-right: 1.5rem;
  }

}
`;
