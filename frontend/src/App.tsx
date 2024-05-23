import './App.css';
import styled from 'styled-components';

// Router configuration
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetails from './pages/TourDetails';
import Cart from './pages/Cart';

// Components
import NavBar from './components/NavBar';
import FooterSection from './components/FooterSection';

//Date picker
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Cart
import { CartProvider } from './context/CartContext';


const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                path: '/',
                Component: Home
            },
            {
                path: '/tours',
                Component: Tours
            },
            {
                path: '/tours/:id',
                Component: TourDetails
            },
            {
                path: '/cart',
                Component: Cart
            },
        ]
    }
]);

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-x: hidden;

`;

function Root() {
    return (
        <CartProvider>
        <MainContainer>
            <header>
                <NavBar />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
            <FooterSection />
            </footer>
        </MainContainer>
        </CartProvider>
    );
}

function App() {
    return (
        <><LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router} />
            </LocalizationProvider>
        </>
    );
}

export default App;
