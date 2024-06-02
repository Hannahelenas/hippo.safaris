import styled from "styled-components";

const ContactIntro = () => {
  return (
    <>
      <ContactWrapper>
        <ContactDetails>
          <h2>Contact details</h2>
          <hr />
          <IntroParagraph>
            Let our Africa travel team start putting together the perfect
            itinerary for your next big adventure! Call or email us to schedule
            a meeting to discuss your dream safari or tour. You can also fill in
            our contact form to reach out.
          </IntroParagraph>
          <p>
            <strong>Address:</strong> Hippo Safaris Ltd, Savannah Road 123
            Johannesburg, 2001, ZA
          </p>
          <p>
            <strong>Email Address:</strong> info@hipposafaris.co.za
          </p>
          <p>
            <strong>Phone:</strong> +27 10 123 4567
          </p>
        </ContactDetails>
        <ImageContainer>
          <img src="zebras.jpg" alt="Zebras on savannah" />
        </ImageContainer>
      </ContactWrapper>
    </>
  );
};

export default ContactIntro;

const ContactWrapper = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: /* #efebe8 */ #f9f6f3;
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
