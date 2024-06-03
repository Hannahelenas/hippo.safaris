import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
/* import { Button } from "@mui/material"; */

/* interface ErrorTextProps {
  visible: boolean;
} */

const ContactForm = () => {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    name: yup.string().required("Name is required"),
    phone: yup.string().required("Phone is required"),
    message: yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const orderData = {
          email: values.email,
          name: values.name,
          phone: values.phone,
          message: values.message,
        };
        console.log("Order data:", orderData);

        formik.resetForm();
      } catch (error) {
        console.error("Error handling form submission:", error);
      }
    },
  });

  return (
    <ContactFormWrapper>
      <FormWrapper>
       {/*  <h2>Send us a message</h2>
        <hr />
        <Form onSubmit={formik.handleSubmit}>
          <StyledInput
            id="email"
            name="email"
            placeholder="Email"
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
            placeholder="Name"
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
            placeholder="Phone"
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
            placeholder="Message"
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
        </Form> */}
         <ContactDetails>
          <h2>Contact details</h2>
          <hr />
          <IntroParagraph>
            Let our Africa travel team start putting together the perfect
            itinerary for your next big adventure! Call or email us to schedule
            a meeting to discuss your dream safari or tour. You can also fill in
            our contact form to reach out.
          </IntroParagraph>
          <p>
            <strong>Address:</strong> Hippo Safaris Ltd, Savannah Road 123
            Johannesburg, 2001, ZA
          </p>
          <p>
            <strong>Email Address:</strong> info@hipposafaris.co.za
          </p>
          <p>
            <strong>Phone:</strong> +27 10 123 4567
          </p>
        </ContactDetails>
      </FormWrapper>
      <ImageWrapper>
        <img src="giraffs.jpg" alt="Giraffes" />
      </ImageWrapper>
    </ContactFormWrapper>
  );
};

export default ContactForm;

const ContactFormWrapper = styled.div`
  display: flex;
  width: 80vw;
  height: 60vh;
  margin: 5rem auto;
  gap: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    gap: 0;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: white;
  h2 {
    font-size: 32px;
  }
  @media (max-width: 768px) {
    width: 100%;
    /* padding: 2rem; */
    margin: 0;
  }
`;

const ImageWrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 1rem;
    margin: auto;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    @media (max-width: 768px) {
      width: 100vw;
      margin: 0;
    }
  }
`;

const ContactDetails = styled.div`
  width: 40vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  /* margin-top: 3rem; */
  h2 {
    /* margin-top: 3rem; */
    font-size: 32px;
  }
  hr {
    width: 100%;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 1rem 0;
  }
  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const IntroParagraph = styled.p`
  margin-bottom: 1rem;
`;


/* const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`; */
/*
const InputStyles = `
  width: 100%;
  border: 1px;
  border-radius: 5px;
  border: none;
  margin: 0.5rem 0;
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
`; */

/* const StyledInput = styled.input`
  ${InputStyles}
  height: 40px;
`;

const StyledTextarea = styled.textarea`
  ${InputStyles}
  height: 100px;
  resize: vertical;
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
  margin-bottom: 1rem;
`;
 */


/* const StyledButton = styled.button`
  backgrund-color: #efebe8;
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
    background-color: #595959;
    color: white;
  }
 */
 /*  &:hover:not(:disabled) {
    background-color: #f9f6f3;
    color: #000000;
  } */
/*
  &:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
`; */