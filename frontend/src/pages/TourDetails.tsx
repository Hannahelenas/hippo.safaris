import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TourDetailsHero from '../components/TourDetailsHero';
import styled from 'styled-components';
import CustomCalendarHeader from '../components/CalendarHeader';
import { Button } from '@mui/material';
import { useCart } from '../context/CartContext';
/* import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'; */
import { StaticDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { NavLink } from 'react-router-dom';


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

    console.log('useParams:', useParams());
    console.log(`Fetching data for safariId: ${id}`);

    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart
    } = useCart();
    const quantity = id ? getItemQuantity(parseInt(id)) : 0;

    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                console.error('No safariId provided');
                return;
            }

            try {
                const response = await axios.get<Safari[]>(
                    `http://localhost:3000/safaris/${id}`
                );

                if (response.data.length > 0) {
                    setSafari(response.data[0]);
                    console.log(response.data[0]);
                } else {
                    console.error('No safari data found');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
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
                            <p>{safari.description}</p>
                            <p>{safari.price}</p>
                            <p>{safari.name}</p>
                            <p>{safari.country}</p>
                            <p>{safari.category}</p>
                        </PageIntro>
                        <BookingWrapper>
                        <ShadowDiv>
                            <p className="paragraph">Date of travel start</p>
                            <InnerShadowDiv>
                                <StyledStaticDatePicker
                                    value={value}
                                    onChange={(newValue: Dayjs | null) =>
                                        setValue(newValue)
                                    }
                                    defaultValue={today}
                                    disablePast
                                    slots={{
                                        calendarHeader: CustomCalendarHeader
                                    }}
                                    slotProps={{
                                        toolbar: { hidden: true },
                                        actionBar: {
                                            actions: []
                                        }
                                    }}
                                />
                            </InnerShadowDiv>
                            <SelectedDateContainer>
                                <p>
                                    Travel start:{' '}
                                    {value
                                        ? value.format('YYYY-MM-DD')
                                        : 'No date selected'}
                                </p>
                            </SelectedDateContainer>
                            {/* Buttons start */}
                            <div>
                                {quantity === 0 ? (
                                    <AddButtonContainer>
                                        {/* <h3>Select participants</h3> */}
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor:
                                                    '#BF7862',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor:
                                                        '#BF7862'
                                                }
                                            }}
                                            fullWidth
                                            disableElevation
                                            onClick={() =>
                                                increaseCartQuantity(
                                                    safari.id,
                                                    safari.name,
                                                    safari.price,
                                                    value
                                                        ? value.format(
                                                              'YYYY-MM-DD'
                                                          )
                                                        : today.format(
                                                              'YYYY-MM-DD'
                                                          )
                                                )
                                            }
                                        >
                                            Add tickets
                                        </Button>
                                    </AddButtonContainer>
                                ) : (
                                    <div>
                                        <ParticipantInput>
                                            <Button
                                                variant="contained"
                                                disableElevation
                                                sx={{
                                                    backgroundColor: 'white',
                                                    color: 'black',
                                                    '&:hover': {
                                                        backgroundColor:
                                                            'rgba(0, 0, 0, 0.08)'
                                                    }
                                                }}
                                                onClick={() =>
                                                    decreaseCartQuantity(
                                                        safari.id
                                                    )
                                                }
                                            >
                                                -
                                            </Button>
                                            <p>{quantity} tickets</p>
                                            <Button
                                                variant="contained"
                                                disableElevation
                                                sx={{
                                                    backgroundColor: 'white',
                                                    color: 'black',
                                                    '&:hover': {
                                                        backgroundColor:
                                                            'rgba(0, 0, 0, 0.08)'
                                                    }
                                                }}
                                                onClick={() =>
                                                    increaseCartQuantity(
                                                        safari.id,
                                                        safari.name,
                                                        safari.price,
                                                        value
                                                            ? value.format(
                                                                  'YYYY-MM-DD'
                                                              )
                                                            : today.format(
                                                                  'YYYY-MM-DD'
                                                              )
                                                    )
                                                }
                                            >
                                                +
                                            </Button>
                                        </ParticipantInput>
                                        <BottomButtonContainer>
                                            <Button
                                                variant="contained"
                                                disableElevation
                                                color="error"
                                                onClick={() =>
                                                    removeFromCart(safari.id)
                                                }
                                            >
                                                Remove
                                            </Button>
                                            <Button
                                                variant="contained"
                                                disableElevation
                                                component={NavLink}
                                                to="/cart"
                                            >
                                                Continue
                                            </Button>
                                        </BottomButtonContainer>
                                    </div>
                                )}
                            </div>
                        </ShadowDiv>
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

const PageIntro = styled.div`
    width: 50vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    @media (max-width: 768px) {
        width: 90vw;
    }
`;

const BookingWrapper = styled.div`
    background-color: 'white';
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30vw;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        width: 100vw;
    }
`;

const TourInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
`;

const AddButtonContainer = styled.div`
    display: flex;
    flex-driection: row;
    margin-bottom: 0.3rem;
    margin-top: 1rem;
    box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.1);
`;

const ParticipantInput = styled.div`
    display: flex;
    flex-driection: row;
    gap: 1rem;
    align-items: baseline;
    justify-content: space-between;
    margin-block: 1rem;
    box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.1);
`;

const BottomButtonContainer = styled.div`
    display: flex;
    flex-driection: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
`;

const StyledStaticDatePicker = styled(StaticDatePicker)({
    '.MuiDateCalendar-root': {
        color: '#ad1457' /* Färgen på månaden i menyn */,
        borderRadius: '5px',
        /* borderWidth: '1px', */
        backgroundColor: 'rgba(240, 240, 240, 1)'
        /* boxShadow: '0px 0px 19px 0px rgba(0, 0, 0, 0.1)', */
        /*  marginTop: '0.3rem', */
        /*  borderColor: '#2196f3', */
        /* border: '1px solid' */
    },
    '.MuiPickersDay-root': {
        color: 'black',
        borderRadius: '1px',
        backgroundColor: 'white'
    },
    '.MuiPickersDay-root:hover': {
        color: 'black',
        borderRadius: '1px',
        backgroundColor: 'rgba(240, 240, 240, 1)'
    },
    '.MuiPickersDay-today': {
        color: 'black',
        borderRadius: '1px',
        backgroundColor: 'rgba(249, 249, 239, 1)',
        border: 'none !important'
    },
    '.MuiPickersDay-root.Mui-selected': {
        backgroundColor: '#132813',
        color: 'white'
    },
    '.MuiPickersDay-root.Mui-selected:hover': {
        backgroundColor: '#132813',
        color: 'white',
        borderRadius: '1px'
    },
    '.MuiPickersDay-root.Mui-selected:focus': {
        backgroundColor: '#132813',
        color: 'white'
    },
    '.MuiPickersDay-root.Mui-selected:active': {
        backgroundColor: '#132813',
        color: 'white'
    }
});

const SelectedDateContainer = styled.div`
    background-color: 'rgba(240, 240, 240, 1)' /* rgba(245, 246, 248, 1) */;
    width: 23vw;
    border-radius: 5px;
    box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.1);
    margin-top: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    p {
        margin-left: 0.5rem;
    }
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const ShadowDiv = styled.div`
    padding: 1rem;
    margin: 1rem;
    background-color: 'white';
    box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.1);
    border-radius: 5px;

    .paragraph {
        margin-bottom: 1rem;
      }
`;
const InnerShadowDiv = styled.div`
    /*  margin: 0.5rem; */
    background-color: 'white';
    box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
`;
