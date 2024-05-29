import ToursHero from '../components/ToursHero';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TourCard from '../components/TourCard';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import FilterButton from '../components/FilterButton';

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
`;

const Tours = () => {
    const [safaris, setSafaris] = useState<Safari[]>([]);
    const [category, setCategory] = useState<string>('all');

    /*   useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Safari[]>(
                    `http://localhost:3000/safaris`
                );
                setSafaris(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); */
    useEffect(() => {
        const fetchData = async () => {
            console.log('Fetching data for category:', category);
            let url = 'http://localhost:3000/safaris';
            if (category !== 'all') {
                url = `http://localhost:3000/${category}`;
            }
            try {
                const response = await axios.get<Safari[]>(url);
                console.log('Data fetched:', response.data);
                setSafaris(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [category]);
    return (
        <div>
            <ToursHero />
            <FilterButton
                text="See all"
                onClick={() => {
                    console.log('Clicked See all');
                    setCategory('all');
                }}
            />
            <FilterButton
                text="Classic"
                onClick={() => {
                    console.log('Clicked Classic');
                    setCategory('classic');
                }}
            />
            <FilterButton
                text="Family"
                onClick={() => {
                    console.log('Clicked Family');
                    setCategory('family');
                }}
            />
            <FilterButton
                text="Premium"
                onClick={() => {
                    console.log('Clicked Premium');
                    setCategory('premium');
                }}
            />
            <CardContainer>
                {safaris.map((safari) => (
                    <NavLink
                        to={`/tours/${safari.id}`}
                        style={{ textDecoration: 'none' }}
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
