import './App.css';

// Router configuration
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Tours from './pages/Tours';

// Components
import NavBar from './components/NavBar';

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
            }
        ]
    }
]);

function Root() {
    return (
        <div className="App">
            <header>
                <NavBar />
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
