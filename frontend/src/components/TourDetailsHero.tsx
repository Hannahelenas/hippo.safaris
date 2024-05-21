import styled from 'styled-components';

interface HeroProps {
    image: string;
    name: string;
}

const Hero = styled.div<HeroProps>`
    margin-top: 0;
    width: 100vw;
    height: 95vh;
    position: relative;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0)
    ),
    url(${(props) => props.image});
    background-size: cover;
    background-position: center;
    z-index: 0;
    overflow-x: hidden !important;
    box-sizing: border-box !important;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;

    h1 {
        font-size: 2.5em;
        margin: 0;
        padding: 0;
    }
`;

const TourDetailsHero: React.FC<HeroProps> = (props) => {
    return (
        <>
        <Hero {...props}>
            <h1>{props.name}</h1>
        </Hero>
        </>
    );
}

export default TourDetailsHero;
