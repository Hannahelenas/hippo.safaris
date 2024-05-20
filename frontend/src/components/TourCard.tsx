import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';
import { styled } from '@mui/system';
import { NavLink } from 'react-router-dom';

const ProductCard = styled(Card)({
    maxWidth: 370,
    fontFamily: "'Nunito Sans', 'Roboto', 'Oxygen' !important",
    borderRadius: '5px',
    margin: '0.5rem'
});

const Overlay = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    fontFamily: "'Nunito Sans', 'Roboto', 'Oxygen' !important"
});

const OverlayContent = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    color: 'white',
    marginTop: '10rem',
    marginLeft: '1.5rem',
    marginRight: '1.5rem',

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

const TourCard = () => {
    return (
        <NavLink to="/tours" style={{ textDecoration: 'none' }}>
        <ProductCard
            elevation={0}
        >
            <CardActionArea>
                <Box sx={{ position: 'relative' }}>
                <Banner>New</Banner>
                    <CardMedia
                        component="img"
                        height="420"
                        image="giraffs.jpg"
                        alt="giraffs"
                    />
                    <Overlay>
                        <OverlayContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Luxury Wilderness Retreat
                        </Typography>
                        <Typography variant="body2" component="div">
                            5 days
                        </Typography>
                        <Typography variant="body2" component="div">
                            Ulitmate luxury safari experience combined with spa and private guided tours.
                        </Typography>
                        </OverlayContent>
                    </Overlay>
                </Box>
            </CardActionArea>
        </ProductCard>
        </NavLink>
    );
};

export default TourCard;
