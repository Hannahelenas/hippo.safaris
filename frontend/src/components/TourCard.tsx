import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';
import { styled } from '@mui/system';
/* import { NavLink } from 'react-router-dom'; */

interface TourCardProps {
    name: string;
    image: string;
    price: number;
    country: string;
}


const ProductCard = styled(Card)({
    maxWidth: 370,
    fontFamily: "'Nunito Sans', 'Roboto', 'Oxygen' !important",
    borderRadius: '5px',
    margin: '0.2rem',
});

const Overlay = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    /* backgroundColor: 'rgba(0, 0, 0, 0.3)', */
    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))',
});

const OverlayContent = styled('div')({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    color: 'white',
    padding: '1.5rem',
    marginTop: '18rem',

})

const Banner = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#F9F9EF',
    color: 'black',
    padding: '5px 10px',
    borderTopLeftRadius: '5px',
    fontFamily: "'Nunito Sans', 'Roboto', 'Oxygen' !important",
    fontSize: '14px',
    fontWeight: 'bold',
    zIndex: 1,
});

const TourCard:  React.FC<TourCardProps> = ({ name, price, image, country }) => {
    return (

        <ProductCard
            elevation={0}
            sx={{ fontFamily: "'Nunito Sans', 'Roboto', 'Oxygen' !important" }}
        >
            <CardActionArea>
                <Box sx={{ position: 'relative' }}>
                <Banner>New</Banner>
                    <CardMedia
                        component="img"
                        height="410"
                        image={image}
                        alt={name}
                    />
                    <Overlay>
                        <OverlayContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: "'Nunito Sans', 'Roboto', 'Oxygen' !important" }}>
                        {name}
                        </Typography>
                        <Typography variant="body2" component="div" sx={{ fontFamily: "'Nunito Sans', 'Roboto', 'Oxygen' !important" }}>
                        {country}
                        </Typography>
                        <Typography variant="body2" component="div" sx={{ fontFamily: "'Nunito Sans', 'Roboto', 'Oxygen' !important" }}>
                            {price}
                        </Typography>

                        </OverlayContent>
                    </Overlay>
                </Box>
            </CardActionArea>
        </ProductCard>
    );
};

export default TourCard;
