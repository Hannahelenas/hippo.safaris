import styled from 'styled-components';

// Interface for props
interface HeroProps {
    image: string;
    name: string;
    country: string;
    category: string;
}

const Hero = styled.div<HeroProps>`
    margin-top: 0;
    width: 100vw;
    height: 95vh;
    position: relative;
    background:
        linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0) 50%),
        linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0) 50%),
        url(${(props) => props.image}); /* Setting the image dynamically depending on the image string value.*/
    background-size: cover;
    background-position: center;
    z-index: 0;
    overflow-x: hidden !important;
    box-sizing: border-box !important;
    display: flex;
    flex-direction: column;
    color: white;
`;

const ContentWrapper = styled.div`
    margin-top: 77vh;
    display: flex;
    flex-direction: column;
    margin-left: 1.5rem;
    @media screen and (min-width: 769px) and (max-width: 1024px) {
        margin-top: 80vh;
      }
    @media (max-width: 768px) {
        margin-top: 70vh;
    }
`;

const Title = styled.h1`
    font-size: 44px;
    margin: 0;
    padding: 0;
`;

const InfoWrapper = styled.div`
    display: flex;
    gap: 1rem;
    font-weight: bold;

`;

const TourDetailsHero: React.FC<HeroProps> = (props) => {
    return (
        <Hero {...props}>
            <ContentWrapper>
                <Title>{props.name}</Title>
                <InfoWrapper>
                    <p>{props.country}</p>
                    <p>{props.category} Safari</p>
                </InfoWrapper>
            </ContentWrapper>
        </Hero>
    );
};

export default TourDetailsHero;
