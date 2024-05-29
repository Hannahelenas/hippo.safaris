import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink, useMatch } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const pages = [
    {
        component: 'Home',
        path: '/'
    },
    {
        component: 'Tours',
        path: '/tours'
    }
];

type Anchor = 'top' | 'right' | 'left' | 'bottom';

// Types for NavLinkprops
interface CustomNavLinkProps {
    to: string;
    children: React.ReactNode;
}

function CustomNavLink({ to, children }: CustomNavLinkProps) {
    const match = useMatch(to);
    return (
        <NavLink to={to} className={match ? 'active-link' : ''}>
            {children}
        </NavLink>
    );
}

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        backgroundColor: '#990000',
        color: 'white',
        padding: '0 4px'
    }
}));

function NavBar() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false
    });

    const { cartQuantity } = useCart();

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setState({ ...state, [anchor]: open });
        };

    const list = (anchor: Anchor) => (
        <Box
            sx={{
                width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Divider />
            <List>
                {pages.map((page) => (
                    <ListItem key={page.component} disablePadding>
                        <ListItemButton component={NavLink} to={page.path}>
                            <ListItemText primary={page.component} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar
            position="absolute"
            elevation={0}
            sx={{ backgroundColor: 'transparent' }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        <img className="logo" src="Logo.png" alt="logo" />
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' }
                        }}
                    >
                        {/* Navigation Drawer start*/}
                        <div>
                            {(['left'] as const).map((anchor) => (
                                <React.Fragment key={anchor}>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={toggleDrawer(anchor, true)}
                                        color="inherit"
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    {/* Drawer */}
                                    <SwipeableDrawer
                                        anchor={anchor}
                                        open={state[anchor]}
                                        onClose={toggleDrawer(anchor, false)}
                                        onOpen={toggleDrawer(anchor, true)}
                                        PaperProps={{
                                            style: {
                                                backgroundColor: '#F9F6F3' // Byt ut 'red' mot önskad färg
                                            }
                                        }}
                                    >
                                        <IconButton
                                            aria-label="close menu"
                                            color="inherit"
                                            onClick={toggleDrawer(
                                                anchor,
                                                false
                                            )}
                                            style={{
                                                alignSelf: 'flex-end',
                                                margin: '0.5rem'
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                        {list(anchor)}
                                    </SwipeableDrawer>
                                </React.Fragment>
                            ))}
                        </div>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        <img className="logo" src="Logo.png" alt="logo" />
                    </Typography>
                    {/* <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' }
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box> */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' }
                        }}
                    >
                        {pages.map((page) => (
                            <CustomNavLink key={page.component} to={page.path}>
                                {page.component}
                            </CustomNavLink>
                        ))}
                    </Box>
                    {/* Cart button */}
                    <Box sx={{ flexGrow: 0 }}>
                        {/*   <IconButton component={NavLink} to="/">
                            <StyledBadge badgeContent={0} color="secondary">
                                <ShoppingCartIcon
                                    fontSize="inherit"
                                    sx={{ color: 'white' }}
                                />
                            </StyledBadge>
                        </IconButton> */}

                        <IconButton
                            aria-label="cart"
                            component={NavLink}
                            to="/cart"
                        >
                            <StyledBadge badgeContent={cartQuantity}>
                                <ShoppingCartIcon sx={{ color: 'white' }} />
                            </StyledBadge>
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;
