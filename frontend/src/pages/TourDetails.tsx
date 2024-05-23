import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TourDetailsHero from '../components/TourDetailsHero';
import styled from 'styled-components';
import CustomCalendarHeader from '../components/CalendarHeader';
import { Button } from '@mui/material';
import { useCart } from '../context/CartContext';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
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
                            <h2>Buy tickes</h2>
                            <h3>Select date of travel start</h3>
                            <DateCalendar
                                value={value}
                                onChange={(newValue: Dayjs | null) =>
                                    setValue(newValue)
                                }
                                defaultValue={today}
                                disablePast
                                slots={{ calendarHeader: CustomCalendarHeader }}
                            />
                            <p>
                                Travel start:{' '}
                                {value
                                    ? value.format('YYYY-MM-DD')
                                    : 'No date selected'}
                            </p>
                            <h3>Select participants</h3>
                            <div>
                                {quantity === 0 ? (
                                    <AddButtonContainer>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        onClick={() =>
                                            increaseCartQuantity(
                                                safari.id,
                                                safari.name,
                                                safari.price,
                                                value
                                                    ? value.format('YYYY-MM-DD')
                                                    : today.format('YYYY-MM-DD')
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
                                                color="primary"
                                                onClick={() =>
                                                    decreaseCartQuantity(
                                                        safari.id
                                                    )
                                                }
                                            >
                                                -
                                            </Button>
                                            <p>{quantity}</p>
                                            <Button
                                                variant="contained"
                                                disableElevation
                                                color="primary"
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
                                            variant="outlined"
                                            disableElevation
                                            color="error"
                                            onClick={() =>
                                                removeFromCart(safari.id)
                                            }
                                        >
                                            Remove
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            disableElevation
                                            component={NavLink} to="/cart"
                                        >
                                            Continue
                                        </Button>
                                        </BottomButtonContainer>
                                    </div>
                                )}
                            </div>
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
    background-color: rgba(240, 240, 240, 1);
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
margin-bottom: 1rem;`

const ParticipantInput = styled.div`
display: flex;
flex-driection: row;
gap: 1rem;
align-items: baseline;
margin: 1rem;`

const BottomButtonContainer = styled.div`
display: flex;
flex-driection: row;`
