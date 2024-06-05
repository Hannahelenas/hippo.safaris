import ToursHero from "../components/ToursHero";
import { useState, useEffect } from "react";
import axios from "axios";
import TourCard from "../components/TourCard";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import FilterButton from "../components/FilterButton";

interface Safari {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  country: string;
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 5rem;
  @media (max-width: 768px) {
    margin-botom: 2rem;
  }
`;

const FilterButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 3rem;
  @media (max-width: 768px) {
    flex-direction: column;
    margin: 2rem;
  }
`;

const Tours = () => {
    // State to hande safari data.
  const [safaris, setSafaris] = useState<Safari[]>([]);
  // State to handle category.
  const [category, setCategory] = useState<string>("all");

  // Get safaris depending on category. 
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data for category:", category);
      let url = "http://localhost:3000/safaris";
      if (category !== "all") {
        url = `http://localhost:3000/${category}`;
      }
      try {
        const response = await axios.get<Safari[]>(url);
        console.log("Data fetched:", response.data);
        setSafaris(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [category]);
  return (
    <div>
      <ToursHero />
      <FilterButtonsContainer>
        <FilterButton
          text="See all"
          onClick={() => {
            console.log("Clicked See all");
            setCategory("all");
          }}
          selected={category === "all"}
        />
        <FilterButton
          text="Classic"
          onClick={() => {
            console.log("Clicked Classic");
            setCategory("classic");
          }}
          selected={category === "classic"}
        />
        <FilterButton
          text="Family"
          onClick={() => {
            console.log("Clicked Family");
            setCategory("family");
          }}
          selected={category === "family"}
        />
        <FilterButton
          text="Premium"
          onClick={() => {
            console.log("Clicked Premium");
            setCategory("premium");
          }}
          selected={category === "premium"}
        />
      </FilterButtonsContainer>
      <CardContainer>
        {safaris.map((safari) => (
          <NavLink
            to={`/tours/${safari.id}`}
            style={{ textDecoration: "none" }}
          >
            <TourCard
              key={safari.id}
              name={safari.name}
              price={safari.price}
              image={safari.image}
              country={safari.country}
            />
          </NavLink>
        ))}
      </CardContainer>
    </div>
  );
};

export default Tours;
