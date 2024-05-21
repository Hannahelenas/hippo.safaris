import HomeHero from '../components/HomeHero';
/* import TourCard from '../components/TourCard'; */
import RecommendedToursIntro from '../components/RecommendedToursIntro';
import styled from "styled-components";

const CardContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
flex-wrap: wrap; `

const Home = () => {
    return (
        <div>
            <HomeHero />
            <RecommendedToursIntro />
            <CardContainer>
            </CardContainer>
        </div>
    );
};

export default Home;
