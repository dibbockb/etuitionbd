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
import AppliedTuitions from "../Layouts/Dashboard/AppliedTuitions";
import ApprovedTuitions from "../Layouts/Dashboard/ApprovedTuitions";
import Revenue from "../Layouts/Dashboard/Revenue";
import AdminManageUser from "../Layouts/Dashboard/AdminManageUser";
import AdminManageApplications from "../Layouts/Dashboard/AdminManageApplications";
import Forbidden from "../Components/Forbidden/Forbidden";
import { Fade } from "react-awesome-reveal";
import PaymentSuccess from "../Layouts/Dashboard/PaymentSuccess";
import Applicants from "../Layouts/Dashboard/Applicants";
import TutorPaymentSuccess from "../Layouts/Dashboard/TutorPaymentSuccess";
import DashboardHome from "../Layouts/Dashboard/DashboardHome";
import Contact from "../Components/Contact/Contact";
import AdminManageTuitions from "../Layouts/Dashboard/AdminManageTuitions";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Fade> <Home /> </Fade> },
            { path: "tutors", element: <Fade><Tutors /></Fade> },
            { path: "tutors/:id", element: <Private> <Fade><Tutorinfo /></Fade>  </Private> },
            { path: "tuitions", element: <Fade><Tuitions /></Fade> },
            { path: "tuitions/:id", element: <Private> <Fade><TuitionInfo /></Fade>  </Private> },
            { path: "contact", element: <Fade><Contact /></Fade> },
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
            {
                index: true,
                element: <Private> <Fade> <DashboardHome /></Fade> </Private>
            },
            { path: "profile", element: <MyProfile /> },
            { path: "new-tuition", element: <PostTuition /> },
            { path: "my-tuitions", element: <MyTuitions /> },
            { path: "my-payments", element: <MyPayments /> },
            { path: "payment-success", element: <PaymentSuccess /> },
            { path: "tutor-payment-success", element: <TutorPaymentSuccess /> },
            { path: "applicants", element: <Applicants /> },
            { path: "applied-tuitions", element: <AppliedTuitions /> },
            { path: "approved-tuitions", element: <ApprovedTuitions /> },
            { path: "revenue", element: <Revenue /> },
            { path: "admin/manage-users", element: <AdminManageUser /> },
            { path: "admin/manage-applications", element: <AdminManageApplications /> },
            { path: "admin/manage-tuitions", element: <AdminManageTuitions /> },

        ],
    },
    {
        path: "*",
        element: <Fade><Error></Error></Fade>
    },
    { path: "newtutor", element: <Private> <Fade><BecomeTutor /></Fade>  </Private> },
    { path: "forbidden", element: <Fade><Forbidden /></Fade> },


]);