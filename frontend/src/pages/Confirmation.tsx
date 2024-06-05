import styled from "styled-components";
const Confirmation = () => (
  <Background>
    <ContentWrapper>
      <h2>Thank you for your purchase!</h2>
      <p>
        Your order has been sent, and we can't wait to see you! Please check
        your email for details about your upcoming safari.
      </p>
      <Image src="hippos.jpg" alt="Hippos" />
    </ContentWrapper>
  </Background>
);

export default Confirmation;

const Background = styled.div`
  margin-top: 0;
  height: auto;
  width: 100vw;
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
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    height: auto;
  }
`;

const ContentWrapper = styled.div`
  margin-top: 15vh;
  display: flex;
  flex-direction: column;
  height: 85vh;
  padding: 3rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: rgba(255, 255, 255, 1);
  margin-bottom: 15vh;

  h2 {
    margin-top: 3rem;
    margin-bottom: 1rem;
  }

  p {
    margin: 1rem;
  }

  @media (max-width: 768px) {
    height: 50vh;
    margin-top: 10vh;
    margin-bottom: 0;
    padding: 1rem;
    width: 95vw;

    h2 {
      margin-top: 2rem;
    }
  }
`;

const Image = styled.img`
  margin-top: 1rem;
  width: 60vw;
  height: 65vh;
  border-radius: 8px;
  margin-bottom: 3rem;
  margin-top: 1rem;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;
