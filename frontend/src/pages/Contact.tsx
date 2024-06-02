import styled from "styled-components";
import ContactIntro from "../components/ContactIntro";
/* import ContactForm from "../components/ContactForm"; */
import FormSection from "../components/FormSection";

const Contact = () => {
  return (
    <>
      <Hero>
        <TitleContainer>
          <Title>Contact us</Title>
        </TitleContainer>
      </Hero>
      <ContactIntro />
      {/* <ContactForm /> */}
      <FormSection />
    </>
  );
};

export default Contact;
const Hero = styled.div`
  margin-top: 0;
  width: 100vw;
  height: 95vh;
  position: relative;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url("rhinos.jpg");

  background-size: cover;
  background-position: center;
  z-index: 0;
  overflow-x: hidden !important;
  box-sizing: border-box !important;
`;

const Title = styled.h1`
  text-align: center;
  color: white;
  font-size: 44px;
  /* font-weight: 400; */
  margin-bottom: 5rem;
`;
const TitleContainer = styled.div`
  margin-top: 35vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;
