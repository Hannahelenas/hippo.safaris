import styled from "styled-components";

const Hero = styled.div`
  margin-top: 0;
  width: 100vw;
  height: 95vh;
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
`;

const Title = styled.h1`
  text-align: center;
  color: white;
  font-size: 44px;
  /* font-weight: bold; */
  margin-bottom: 5rem;
`;
const TitleContainer = styled.div`
  margin-top: 35vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ToursHero = () => {
  return (
    <Hero>
      <TitleContainer>
        <Title>Discover wildlife with our excellent guided tours</Title>
      </TitleContainer>
    </Hero>
  );
};

export default ToursHero;
