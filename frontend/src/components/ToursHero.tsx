import styled from 'styled-components';
import FilterButton from './FilterButton';

const Hero = styled.div`
    margin-top: 0;
    width: 100vw;
    height: 95vh;
    position: relative;
    background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(38, 50, 56, 0.7) 100%
    ),
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
    font-weight: bold;
    margin-bottom: 5rem;
`;
const TitleContainer = styled.div`
    margin-top: 35vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const FilterButtonContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
flex-wrap: wrap;
gap: 1rem;
`


const ToursHero = () => {
    return (
        <Hero>
            <TitleContainer>
                <Title>Discover wildlife with our excellent guided tours</Title>
                <FilterButtonContainer>
                <FilterButton text={'See all'}/>
                <FilterButton text={'Classic'}/>
                <FilterButton text={'Family'}/>
                <FilterButton text={'Premium'}/>
                </FilterButtonContainer>
            </TitleContainer>
        </Hero>
    );
};

export default ToursHero;