import HomeHero from '../components/HomeHero';
import TourCard from '../components/TourCard';
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
            <CardContainer>
            <TourCard />
            <TourCard />
            <TourCard />
            </CardContainer>
        </div>
    );
};

export default Home;
