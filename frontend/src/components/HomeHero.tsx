import styled from 'styled-components';

const Hero = styled.div`
    margin-top: 0;
    height: 90vh;
    width: 100vw;
    position: absolute;
    background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.2) 0%, 
            rgba(38, 50, 56, 0.7) 100%
        ),
        url('giraffs.jpg');
    height: 90vh;
    background-size: cover;
    background-position: center;
    z-index: -1;
`;

const Title = styled.h1`
    text-align: center;
    color: white;
    font-size: 44px;
    font-weight: bold;
`;
const TitleContainer = styled.div`
    margin-top: 35vh;
`;

const HomeHero = () => {
    return (
        <Hero>
            <TitleContainer>
                <Title>Safaris in Africas most beautiful landscape</Title>
            </TitleContainer>
        </Hero>
    );
};

export default HomeHero;
