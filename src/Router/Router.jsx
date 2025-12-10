import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Layouts/Home/Home";
import Login from "../Components/AuthLayout/Login";
import Register from "../Components/AuthLayout/Register";
import AuthLayout from "../Components/AuthLayout/AuthLayout";
import Tutors from "../Components/Tutors/Tutors";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import Tuitions from "../Components/Tuitions/Tuitions";
import PostTuition from "../Layouts/Dashboard/PostTuition";
import BecomeTutor from "../Layouts/Dashboard/BecomeTutor";
import Error from "../Components/Error/Error";
import TuitionInfo from "../Components/Tuitions/TuitionInfo";
import Tutorinfo from "../Components/Tutors/Tutorinfo";
import Private from "../Components/AuthLayout/Private";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "tutors", element: <Private> <Tutors /> </Private> },
            { path: "tutors/:id", element: <Private> <Tutorinfo /> </Private> },
            { path: "tuitions", element: <Private> <Tuitions /> </Private> },
            { path: "tuitions/:id", element: <Private> <TuitionInfo /> </Private> },
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
        ],
    },
    {
        path: "dashboard",
        element: <Private> <Dashboard /> </Private>,
        children: [
            { path: "newtuition", element: <Private> <PostTuition /></Private> },
            { path: "newtutor", element: <Private> <BecomeTutor /> </Private> },
        ],
    },
    {
        path: "*",
        element: <Error></Error>
    },
    

]);