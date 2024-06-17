import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TourDetailsHero from "../components/TourDetailsHero";
import styled from "styled-components";
import CustomCalendarHeader from "../components/CalendarHeader";
import { useCart } from "../context/CartContext";
import { StaticDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import TourDetailsIntro from "../components/TourDetailsIntro";

interface Safari {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  country: string;
}

// Calendar date configuration to set todays date.
const today: dayjs.Dayjs = dayjs();

const TourDetails = () => {
  // State to handle safari data.
  const [safari, setSafari] = useState<Safari | null>(null);
  // Get id from url param.
  const { id } = useParams<{ id: string }>();
  // State to handle value in calendar
  const [value, setValue] = React.useState<Dayjs | null>(today);

  const navigate = useNavigate();

  /* console.log("useParams:", useParams());
  console.log(`Fetching data for safariId: ${id}`); */

  // Use cart to handle cart functionality.
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } =
    useCart();
  const quantity = id ? getItemQuantity(parseInt(id)) : 0;

  // Get the specific safari based on id in param.
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        console.error("No safariId provided");
        return;
      }

      try {
         const response = await axios.get<Safari[]>(
           /* `http://localhost:3000/safaris/${id}`, */
         `https://hippo-safaris.onrender.com/safaris/${id}`,
        );

        if (response.data.length > 0) {
          setSafari(response.data[0]);
          console.log(response.data[0]);
        } else {
          console.error("No safari data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {safari ? (
        <div>
          {/* Hero component */}
          <TourDetailsHero
            image={safari.image}
            name={safari.name}
            country={safari.country}
            category={safari.category}
          />
          {/* Intro component */}
          <TourDetailsIntro
            image={safari.image}
            description={safari.description}
            price={safari.price}
            country={safari.country}
          />
          <TourInfoWrapper>
            {/* Booking component */}
            <BookingWrapper>
              <h2>Plan your trip</h2>
              <hr />
              <ContentCenter>
                {/* Calendar picker component */}
                <StyledStaticDatePicker
                  value={value}
                  onChange={(newValue: Dayjs | null) => setValue(newValue)}
                  defaultValue={today}
                  disablePast
                  slots={{
                    calendarHeader: CustomCalendarHeader,
                  }}
                  slotProps={{
                    toolbar: { hidden: true },
                    actionBar: {
                      actions: [],
                    },
                  }}
                />
                <hr />
                <SelectedDateContainer>
                  <p>
                    Selected travel start:{" "}
                    {value ? value.format("YYYY-MM-DD") : "No date selected"}
                  </p>
                </SelectedDateContainer>
                <hr />
                <ButtonGroup>
                  {quantity === 0 ? (
                    <AddButtonContainer>
                      <AddButton
                        onClick={() =>
                          increaseCartQuantity(
                            safari.id,
                            safari.name,
                            safari.price,
                            value
                              ? value.format("YYYY-MM-DD")
                              : today.format("YYYY-MM-DD"),
                          )
                        }
                      >
                        Add tickets
                      </AddButton>
                    </AddButtonContainer>
                  ) : (
                    <div>
                      <ParticipantInput>
                        <AmountButton
                          onClick={() => decreaseCartQuantity(safari.id)}
                        >
                          -
                        </AmountButton>
                        <p>{quantity} tickets</p>
                        <AmountButton
                          onClick={() =>
                            increaseCartQuantity(
                              safari.id,
                              safari.name,
                              safari.price,
                              value
                                ? value.format("YYYY-MM-DD")
                                : today.format("YYYY-MM-DD"),
                            )
                          }
                        >
                          +
                        </AmountButton>
                      </ParticipantInput>
                      <BottomButtonContainer>
                        <AddButton onClick={() => navigate("/cart")}>
                          Continue
                        </AddButton>
                      </BottomButtonContainer>
                    </div>
                  )}
                </ButtonGroup>
              </ContentCenter>
            </BookingWrapper>
          </TourInfoWrapper>
        </div>
      ) : (
        <p>Sorry, no safari to show</p>
      )}
    </div>
  );
};

export default TourDetails;

const TourInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url("andrew-liu-EunFGVJLPmQ-unsplash.jpg");

  background-size: cover;
  background-position: center;
  z-index: 0;
  overflow-x: hidden !important;
  box-sizing: border-box !important;
  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
    margin-top: 0;
  }
`;

const BookingWrapper = styled.div`
  background-color: white;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 25vw;
  margin-bottom: 3rem;
  margin-top: 3rem;
  margin-left: 7rem;
  h2 {
    font-size: 32px;
    margin-left: 1rem;
    margin-top: 0.5rem;
  }
  hr {
    width: 100%;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 1rem 0;
  }

  /* @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: 35vw;
  } */
  @media (max-width: 768px) {
    width: 90vw;
    margin-left: 0;
  }
`;

const ContentCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: white;
`;

const AddButtonContainer = styled.div`
  display: flex;
  flex-driection: row;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const ParticipantInput = styled.div`
  display: flex;
  flex-driection: row;
  gap: 1rem;
  align-items: baseline;
  justify-content: space-between;
  margin-block: 2rem;
`;

const BottomButtonContainer = styled.div`
  display: flex;
  flex-driection: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const StyledStaticDatePicker = styled(StaticDatePicker)({
  "& .MuiTypography-root": {
    fontFamily: "'Nunito Sans', 'Roboto', 'Oxygen', sans-serif !important",
  },
  ".MuiDateCalendar-root": {
    color: "#000000",
    borderRadius: "5px",
    backgroundColor: "/* rgba(240, 240, 240, 1) */white",
  },
  ".MuiPickersDay-root": {
    color: "black",
    borderRadius: "1px",
    backgroundColor: "#efebe8",
    fontFamily: "'Nunito Sans', 'Roboto', 'Oxygen', sans-serif !important",
  },
  ".MuiPickersDay-root:hover": {
    color: "black",
    borderRadius: "1px",
    backgroundColor: " #dcd6d2",
  },
  ".MuiPickersDay-today": {
    color: "black",
    borderRadius: "1px",
    backgroundColor: "#efebe8",
    border: "none !important",
    fontWeight: "bold",
  },
  ".MuiPickersDay-root.Mui-selected": {
    backgroundColor: "#000000",
    color: "white",
  },
  ".MuiPickersDay-root.Mui-selected:hover": {
    backgroundColor: "#000000",
    color: "white",
  },
  ".MuiPickersDay-root.Mui-selected:focus": {
    backgroundColor: "#000000",
    color: "white",
  },
  ".MuiPickersDay-root.Mui-selected:active": {
    backgroundColor: "#000000",
    color: "white",
  },
});

const SelectedDateContainer = styled.div`
    width: 90%;
    height 10rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    p {
        margin-left: 1rem;
    }
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const AddButton = styled.button`
  background-color: #efebe8;
  color: #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem;
  border-radius: 40px;
  font-family: "Lora", "Nunito Sans", "Roboto", "Oxygen";
  text-transform: none;
  font-size: 17px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  margin-bottom: 1rem;
  transition:
    background-color 0.3s,
    color 0.3s;
  &:hover {
    background-color: #595959;
    color: white;
  }
`;

const AmountButton = styled.button`
  background-color: #efebe8;
  color: black;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  font-size: 17px;
  width: 50px;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    background-color: #dcd6d2;
    color: black;
  }
`;
