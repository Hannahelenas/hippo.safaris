import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TourDetailsHero from '../components/TourDetailsHero';

interface Safari {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    country: string;
}

const TourDetails = () => {
    const [safari, setSafari] = useState<Safari | null>(null);
    const { id } = useParams<{ id: string }>();

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
                    <TourDetailsHero image={safari.image} name={safari.name}/>
                    <div>{safari.id}</div>
                    <div>{safari.description}</div>
                    <div>{safari.name}</div>
                    <div>{safari.price}</div>
                    <div>{safari.image}</div>
                    <div>{safari.country}</div>
                    <div>{safari.category}</div>
                </div>
            ) : (
                <p>Sorry, no safari to show</p>
            )}
        </div>
    );
};

export default TourDetails;
