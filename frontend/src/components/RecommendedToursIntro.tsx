import styled from "styled-components";

const IntroSection = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 2rem;
flex-wrap: wrap;
text-align: center;
gap: 1rem;
 `

const RecommendedToursIntro = () => {
  return (
   <IntroSection>
    <h2>Our most popular tours</h2>
    <p> You’re a step  step closer to your dream safari experience. Explore these
        tour ideas from our travel experts and start planning your trip
        of a lifetime.</p>
    </IntroSection>
  )
}

export default RecommendedToursIntro
