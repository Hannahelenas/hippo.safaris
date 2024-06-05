import styled from "styled-components";
import DefaultButton from "./DefaultButton";
import { useNavigate } from "react-router-dom";

const Hero = styled.div`
  margin-top: 0;
  height: 95vh;
  width: 100vw;
  position: relative;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0)
    ),
   /*  url("giraffs.jpg"); */
  background-size: cover;
  background-position: center;
  z-index: 0;
  overflow-x: hidden !important;
  overflow: hidden;
  box-sizing: border-box !important;
`;
const VideoBackground = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  display: flex;
  justify-content: center;
`;
const GradientOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  );
`;
const Title = styled.h1`
  text-align: center;
  color: white;
  font-size: 44px;
  position: relative;
  z-index: 1;
  margin-bottom: 5rem;
`;
const TitleContainer = styled.div`
  margin-top: 35vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: relative;
`;

const HomeHero = () => {
  // Using useNavigate hook for button navigation
  const navigate = useNavigate();
  return (
    <Hero>
      <VideoBackground autoPlay loop muted>
        <source src="5220243-hd_1920_1080_25fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      <GradientOverlay />
      <TitleContainer>
        <Title>Safaris in Africas most beautiful landscape</Title>
        <DefaultButton text={"Book now"} onClick={() => navigate("/tours")} />
      </TitleContainer>
    </Hero>
  );
};

export default HomeHero;
