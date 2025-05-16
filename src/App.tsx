import React from 'react';
import Posts from './components/posts/Posts';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import RootLayout from './pages/RootLayout';
import UserList from './pages/user/UserList';
import UserDetails from './pages/user/UserDetails';

const App: React.FC = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout/>,
            children: [
                {
                    path: 'users',
                    element: <Outlet/>,
                    children: [
                        {
                            path: '',
                            index: true,
                            element: <Navigate to="list"/>,
                        },
                        {
                            path: 'list',
                            element: <UserList/>,
                        },
                        {
                            path: ':id',
                            element: <UserDetails/>,
                        },
                    ],
                },
                {
                    path: 'post/list',
                    element: <Posts/>,
                },
            ],
        },
        {
            path: '*',
            element: <PageNotFound/>,
        },
    ]);
    return <RouterProvider router={router}/>;
};

export default App;
