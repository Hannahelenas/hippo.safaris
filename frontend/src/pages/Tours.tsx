import ToursHero from '../components/ToursHero';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TourCard from '../components/TourCard';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Safari[]>(
                    'http://localhost:3000/safaris'
                );
                setSafaris(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <ToursHero />
            <CardContainer>
                {safaris.map((safari) => (
                    <NavLink to={`/tours/${safari.id}`} style={{ textDecoration: 'none' }}>
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
