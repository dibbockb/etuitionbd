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

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "tutors", element: <Tutors /> },
            { path: "tutors/:id", element: <Tutorinfo /> },
            { path: "tuitions", element: <Tuitions /> },
            { path: "tuitions/:id", element: <TuitionInfo /> },
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
        element: <Dashboard />,
        children: [
            { path: "newtuition", element: <PostTuition /> },
            { path: "newtutor", element: <BecomeTutor /> },
        ],
    },
    {
        path: "*",
        element: <Error></Error>
    },
    

]);