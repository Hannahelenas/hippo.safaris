import './App.css';

// Testar importer

import TextField from '@mui/material/TextField';
import NavBar from './components/NavBar';



function App() {
    return (
        <>
            <NavBar />
            <h1>Testar</h1>
            <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="Hello World"
            />
            <div>
                {/* <IconButton aria-label="cart">
                <StyledBadge badgeContent={1} color="secondary">
                    <ShoppingCartIcon
                        fontSize="medium"
                        sx={{ color: 'red' }}
                    />
                </StyledBadge>
                </IconButton> */}

            </div>
        </>
    );
}

export default App;
