import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Layouts/Home/Home";
import Login from "../Components/AuthLayout/Login";
import AuthLayout from "../Components/AuthLayout/AuthLayout";
import Register from "../Components/AuthLayout/Register";
import Tuitions from "../Components/Tuitions/Tuitions"
import Tutors from "../Components/Tutors/Tutors"
import Contact from "../Components/Contact/Contact"

export const router = createBrowserRouter([

    // root pages
    {
        path: "/",
        Component: RootLayout,
        children: [{
            index: true,
            Component: Home,
        },
        {
            path: "/tuitions",
            Component: Tuitions,
        },
        {
            path: "/tutors",
            Component: Tutors,
        },
        {
            path: "/contact",
            Component: Contact,
        },
        ],

    },

    //auth pages
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <RouterProvider router={router} />,
);
