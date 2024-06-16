import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import axios from "axios";

// Interface form errortext
interface ErrorTextProps {
  visible: boolean;
}

const FormSection = () => {
    // State for handling display of confirmation text on form submit.
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Validationschema
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name must be at least two characters"),
    phone: yup
      .string()
      .required("Phone is required")
      .min(10, "Phone must be at least 10 characters")
      .max(12, "Phone must be at most 12 characters"),
    message: yup
      .string()
      .required("Message is required")
      .min(20, "Message must be at least 20 characters")
      .max(1000, "Message must be at most 1000 characters"),
  });

  // Initializing the formik hook to handle form submission and validation.
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      message: "",
    },
    validationSchema: validationSchema,
    // Function to handle form submit.
    onSubmit: async (values) => {
      try {
        // Create messageobject from input.
        const messageData = {
          email: values.email,
          name: values.name,
          phone: values.phone,
          message: values.message,
        };
        // Send post request to server.
         const response = await axios.post(
          "http://localhost:3000/messages",
          messageData,
        );
        /* const response = await axios.post(
          "https://hippo-safaris.onrender.com/messages",
          messageData,
        ); */

        console.log("Message data:", messageData);
        console.log(response.data);
        // Set state to true to show confirmation text after submit.
        setFormSubmitted(true);
        // Reset form.
        formik.resetForm();
        // Catch any errors.
      } catch (error) {
        console.error("Error handling form submission:", error);
      }
    },
  });
  return (
    <Wrapper>
      {" "}
      <FormWrapper>
        <h2>Send us a message</h2>
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
            <ErrorText visible={!!(formik.touched.name && formik.errors.name)}>
              {formik.errors.name}
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
          <StyledTextarea
            id="message"
            name="message"
            placeholder="Message*"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.message && formik.errors.message && (
            <ErrorText
              visible={!!(formik.touched.message && formik.errors.message)}
            >
              {formik.errors.message}
            </ErrorText>
          )}
          <ButtonWrapper>
            <StyledButton
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
            >
              Send
            </StyledButton>
          </ButtonWrapper>
        </Form>
        {formSubmitted && (
          <p>
            <strong>
              Thank you for your message! We will reach out to you soon.
            </strong>
          </p>
        )}
      </FormWrapper>
    </Wrapper>
  );
};

export default FormSection;

const Wrapper = styled.div`
  margin-top: 0;
  width: 100vw;
  height: 100vh;
  position: relative;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
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

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: none;
  color: white;
  h2 {
    font-size: 32px;
  }
  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputStyles = `
  width: 100%;
  border: 1px;
  border-radius: 5px;
  border: none;
  margin: 0.6rem 0;
  padding: 8px;
  background-color:  #f9f6f3;
  box-sizing: border-box;
  outline: none;
  font-family: inherit;
  font-size: 1rem;

  &:focus {
    border: 1px solid #c02b0a;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #f9f6f3 inset !important;
    -webkit-text-fill-color: black !important;
  }
`;

const StyledInput = styled.input`
  ${InputStyles}
  height: 40px;
`;

const StyledTextarea = styled.textarea`
  ${InputStyles}
  height: 100px;
  resize: vertical;
`;

const ErrorText = styled.div<ErrorTextProps>`
  color: white;
  font-size: 14px;
  margin-left: 0.5rem;
  font-weight: 600;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`;

const ButtonWrapper = styled.div`
  align-self: flex-end;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const StyledButton = styled.button`
  background-color: #efebe8;
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

  &:not(:disabled) {
    background-color: white;
    color: black;
  }

  &:disabled {
    background-color: rgba(255, 255, 255, 0.7);
    color: black;
    cursor: not-allowed;
  }
`;
