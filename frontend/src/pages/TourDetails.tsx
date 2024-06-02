import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TourDetailsHero from "../components/TourDetailsHero";
import styled from "styled-components";
import CustomCalendarHeader from "../components/CalendarHeader";
/* import { Button } from "@mui/material"; */
import { useCart } from "../context/CartContext";
/* import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'; */
import { StaticDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface Safari {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  country: string;
}

const today: dayjs.Dayjs = dayjs();

const TourDetails = () => {
  const [safari, setSafari] = useState<Safari | null>(null);
  const { id } = useParams<{ id: string }>();
  const [value, setValue] = React.useState<Dayjs | null>(today);
  const navigate = useNavigate();

  console.log("useParams:", useParams());
  console.log(`Fetching data for safariId: ${id}`);

  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } =
    useCart();
  const quantity = id ? getItemQuantity(parseInt(id)) : 0;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        console.error("No safariId provided");
        return;
      }

      try {
        const response = await axios.get<Safari[]>(
          `http://localhost:3000/safaris/${id}`,
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
          <TourDetailsHero
            image={safari.image}
            name={safari.name}
            country={safari.country}
            category={safari.category}
          />
          {/* <div>{safari.id}</div> */}
          <TourInfoWrapper>
            <PageIntro>
              <h2>Description</h2>
              <hr />
              <p>{safari.description}</p>
              <p>Price{safari.price} per person</p>
              <p>{safari.name}</p>

              <p>{safari.country}</p>
              <p>{safari.category}</p>
            </PageIntro>
            <BookingWrapper>
              <h2>Plan your trip</h2>
              <hr />
              <ContentCenter>
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
                {/* Buttons start */}
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
                        <KeyboardArrowDownIcon />
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
                          Continue<KeyboardArrowRightIcon />
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
  justify-content: center;
  flex-wrap: wrap;
  background-color: /* #efebe8 */ #f9f6f3;
`;

const PageIntro = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 3rem;
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

const BookingWrapper = styled.div`
  background-color: "white";
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 25vw;
  margin-bottom: 1rem;
  margin-top: 3rem;
  margin-left: 2rem;
  h2 {
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
  marginTop: "1rem",
  ".MuiDateCalendar-root": {
    color: "#000000",
    borderRadius: "5px",
    backgroundColor: "/* rgba(240, 240, 240, 1) */white",
  },
  ".MuiPickersDay-root": {
    color: "black",
    borderRadius: "1px",
    backgroundColor: "#F4EDE6",
  },
  ".MuiPickersDay-root:hover": {
    color: "black",
    borderRadius: "1px",
    backgroundColor: "#F4EDE6",
    fontWeight: "bold",
  },
  ".MuiPickersDay-today": {
    color: "black",
    borderRadius: "1px",
    backgroundColor: "#F4EDE6",
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
    /* background-color: #F9F6F3; */
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
 /*  background-color: #5f6453;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 0.8rem 2.5rem;
  font-weight: bold;
  border-radius: 40px;
  font-family: "Nunito Sans", "Roboto", "Oxygen";
  text-transform: none;
  border: none;
  cursor: pointer;
  margin-bottom: 1rem; */

  backgrund-color: white;
  color: #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 3rem;
  border-radius: 40px;
  font-family: "Nunito Sans", "Roboto", "Oxygen";
  text-transform: none;
  font-size: 17px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
  &:hover {
    background-color: #F9F6F3;
    color: #000000;
  }

  svg {
    margin-left: 0.5rem;
  }

`;

const AmountButton = styled.button`
  background-color: #F4EDE6;
  color: black;
  padding: 0.5rem 1rem;
  cursor: pointer;
 border-radius: 5px;
 border: none;
  width: 70px;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    background-color: rgba(244, 237, 230, 0.9);
  }

  &:active {
    background-color: rgba(244, 237, 230, 0.9);
  }
`;
