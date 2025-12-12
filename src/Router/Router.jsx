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
            { path: "profile", element: <Private> <MyProfile /></Private> },
            { path: "my-tuitions", element: <Private> <MyTuitions /></Private> },
            { path: "new-tuition", element: <Private> <PostTuition /></Private> },
            { path: "my-tutors", element: <Private> <MyTutors /></Private> },
            { path: "my-payments", element: <Private> <MyPayments /></Private> },
            { path: "applied-tuitions", element: <Private> <AppliedTuitions /></Private> },
            { path: "approved-tuitions", element: <Private> <ApprovedTuitoins /></Private> },
            { path: "revenue", element: <Private> <Revenue /></Private> },
            { path: "admin/manage-users", element: <Private> <AdminManageUser /></Private> },
            { path: "admin/manage-applications", element: <Private> <AdminManageApplications /></Private> },
            
        ],
    },
    {
        path: "*",
        element: <Error></Error>
    },
    { path: "newtutor", element: <Private> <BecomeTutor /> </Private> },
    

]);