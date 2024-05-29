import styled from 'styled-components';
import PrimaryButton from './PrimaryButton';

const Hero = styled.div`
    margin-top: 0;
    height: 95vh;
    width: 100vw;
    position: relative;
    background: /* linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(38, 50, 56, 0.7) 100%
    ), */
    linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0)),
        url('giraffs.jpg');
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
`;

const HomeHero = () => {
    return (
        <Hero>
            <TitleContainer>
                <Title>Safaris in Africas most beautiful landscape</Title>
                <PrimaryButton text={'Book now'} to="/tours"/>
            </TitleContainer>
        </Hero>
    );
};

export default HomeHero;
