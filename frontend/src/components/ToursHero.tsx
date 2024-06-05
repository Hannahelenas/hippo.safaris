import styled from "styled-components";
/* import FilterButton from './FilterButton'; */

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
      rgba(0, 0, 0, 0.0)
    ),
    url("rhinos.jpg");

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

const FilterButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ToursHero = () => {
  return (
    <Hero>
      <TitleContainer>
        <Title>Discover wildlife with our excellent guided tours</Title>
        <FilterButtonContainer>
          {/* <FilterButton
                    text={'See all'}
                    onClick={() => setCategory('all')}
                />
                <FilterButton
                    text={'Classic'}
                    onClick={() => setCategory('classic')}
                />
                <FilterButton
                    text={'Family'}
                    onClick={() => setCategory('family')}
                />
                <FilterButton
                    text={'Premium'}
                    onClick={() => setCategory('premium')}
                /> */}
        </FilterButtonContainer>
      </TitleContainer>
    </Hero>
  );
};

export default ToursHero;
