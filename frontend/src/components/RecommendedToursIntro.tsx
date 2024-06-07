import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import TourCard from "./TourCard";
import { NavLink } from "react-router-dom";

const IntroSection = styled.section`
  background-color: #efebe8;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    margin-top: 4rem;
    font-size: 32px;
  }

  p {
    margin: 2rem;
  }
`;

const PromoToursContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 5rem;
  background-color: #efebe8;
`;

// Interface for safari
interface Safari {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  country: string;
}

const RecommendedToursIntro = () => {
  // State to handle data.
  const [safaris, setSafaris] = useState<Safari[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        const baseUrl =  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";
      try {
        // Get request to to server.
        /* const response = await axios.get<Safari[]>(
          "http://localhost:3000/classic",
        ); */
        const response = await axios.get<Safari[]>(
          `${baseUrl}/classic`,
        );

        setSafaris(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <IntroSection>
      <TitleContainer>
        <h2>Explore popular tours</h2>
        <p>
          {" "}
          You’re a step step closer to your dream safari experience. Take a look
          at these tour ideas from our travel experts and start planning your
          trip of a lifetime.
        </p>
      </TitleContainer>
      <PromoToursContainer>
        {safaris.map(
          (safari, index) =>
            // Skipping one index to only display three safaris.
            index !== 1 && (
              <NavLink
                to={`/tours/${safari.id}`}
                style={{ textDecoration: "none" }}
                key={safari.id}
              >
                <TourCard
                  name={safari.name}
                  price={safari.price}
                  image={safari.image}
                  country={safari.country}
                />
              </NavLink>
            ),
        )}
      </PromoToursContainer>
    </IntroSection>
  );
};

export default RecommendedToursIntro;
