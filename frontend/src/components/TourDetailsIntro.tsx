import styled from "styled-components";

// Interface for props
interface TourDetailsIntroProps {
  image: string;
  description: string;
  price: number;
/*   category: string; */
  country: string;
}

const TourDetailsIntro: React.FC<TourDetailsIntroProps> = ({ image, description, price, country }) => {
  return (
    <>
      <ContactWrapper>
        <ContactDetails>
          <h2>Overwiew</h2>
          <hr />
          <IntroParagraph>
            {description}
          </IntroParagraph>

          <p>
            <strong>Duration:</strong> 10 days
          </p>
          <hr />
          <p>
            <strong>Price:</strong> {price}$ per person
          </p>
          <hr />
          <p>
            <strong>Destination:</strong> {country}
          </p>
          <hr />
        </ContactDetails>
        <ImageContainer>
          <img src={image} alt="Safari" />
        </ImageContainer>
      </ContactWrapper>
    </>
  );
};

export default TourDetailsIntro;

const ContactWrapper = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: #f9f6f3;
`;

const ContactDetails = styled.div`
  width: 40vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  /* margin-top: 3rem; */
  h2 {
    /* margin-top: 3rem; */
    font-size: 32px;
  }
  hr {
    width: 100%;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 1rem 0;
  }
  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const IntroParagraph = styled.p`
  margin-bottom: 1rem;
`;

const ImageContainer = styled.div`
  width: 40vw;
  margin-bottom: 3rem;
  margin-top: 3rem;
  margin-left: 2rem;
  img {
    width: 100%;
    height: auto;
  }
  @media (max-width: 768px) {
    width: 90vw;
    margin-left: 0;
  }
`;
