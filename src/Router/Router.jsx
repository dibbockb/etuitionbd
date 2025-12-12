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
import MyProfile from "../Layouts/Dashboard/MyProfile";
import MyTuitions from "../Layouts/Dashboard/MyTuitions";
import MyPayments from "../Layouts/Dashboard/MyPayments";
import MyTutors from "../Layouts/Dashboard/MyTutors";
import AppliedTuitions from "../Layouts/Dashboard/AppliedTuitions";
import ApprovedTuitoins from "../Layouts/Dashboard/ApprovedTuitoins";
import Revenue from "../Layouts/Dashboard/Revenue";
import AdminManageUser from "../Layouts/Dashboard/AdminManageUser";
import AdminManageApplications from "../Layouts/Dashboard/AdminManageApplications";
import Forbidden from "../Components/Forbidden/Forbidden";
import { Fade } from "react-awesome-reveal";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Fade> <Home /> </Fade> },
            { path: "tutors", element: <Private> <Fade><Tutors /></Fade>  </Private> },
            { path: "tutors/:id", element: <Private> <Fade><Tutorinfo /></Fade>  </Private> },
            { path: "tuitions", element: <Private> <Fade><Tuitions /></Fade>  </Private> },
            { path: "tuitions/:id", element: <Private> <Fade><TuitionInfo /></Fade>  </Private> },
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
        element: <Private> <Fade> <Dashboard /> </Fade> </Private>,
        children: [
            { path: "profile", element: <Private> <Fade> <MyProfile /></Fade> </Private> },
            { path: "new-tuition", element: <Private> <Fade> <PostTuition /></Fade> </Private> },
            { path: "my-payments", element: <Private> <Fade> <MyPayments /></Fade> </Private> },
            { path: "my-tuitions", element: <Private> <Fade> <MyTuitions /></Fade> </Private> },
            { path: "my-tutors", element: <Private> <Fade> <MyTutors /></Fade> </Private> },
            { path: "applied-tuitions", element: <Private> <Fade> <AppliedTuitions /></Fade> </Private> },
            { path: "approved-tuitions", element: <Private> <Fade> <ApprovedTuitoins /></Fade> </Private> },
            { path: "revenue", element: <Private> <Fade> <Revenue /></Fade> </Private> },
            { path: "admin/manage-users", element: <Private> <Fade> <AdminManageUser /></Fade> </Private> },
            { path: "admin/manage-applications", element: <Private> <Fade> <AdminManageApplications /></Fade> </Private> },
            
        ],
    },
    {
        path: "*",
        element: <Fade><Error></Error></Fade>
    },
    { path: "newtutor", element: <Private> <Fade><BecomeTutor /></Fade>  </Private> },
    { path: "forbidden", element: <Fade><Forbidden/></Fade> },
    

]);