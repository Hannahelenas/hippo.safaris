import styled from "styled-components";
const Confirmation = () => (
  <Background>
    <ContentWrapper>
      <h2>Thank you for your purchase!</h2>
      <p>
        Your order has been sent, and we can't wait to see you! Please check
        your email for details about your upcoming safari.
      </p>
      <Image src="andrew-liu-NAmlq7_JEYw-unsplash.jpg" alt="Lion" />
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

const ContentWrapper = styled.div`
  margin-top: 15vh;
  display: flex;
  flex-direction: column;
  height: 65vh;
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
    width: 50vw;
  }

  @media (max-width: 1024px) {
    height: 60vh;
    h2 {
        margin-top: 4rem;
      }
  }
  @media (max-width: 768px) {
    height: 60vh;
    margin-top: 10vh;
    margin-bottom: 0;
    padding: 1rem;
    width: 95vw;

    h2 {
      margin-top: 3rem;
    }
    p {
        margin: 1rem;
        width: 80vw;
      }
  }
`;

const Image = styled.img`
  margin-top: 1rem;
  width: 40vw;
  height: 55vh;
  border-radius: 4px;
  margin-bottom: 4rem;
  margin-top: 1rem;
  @media (max-width: 1024px) {
    height: 45vh;
    width: 90vw;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;
