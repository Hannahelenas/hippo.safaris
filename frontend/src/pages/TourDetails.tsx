import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TourDetailsHero from '../components/TourDetailsHero';
import styled from 'styled-components';
import CustomCalendarHeader from '../components/CalendarHeader';

import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';

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
                            <h3>Participants</h3>
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
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30vw;

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
