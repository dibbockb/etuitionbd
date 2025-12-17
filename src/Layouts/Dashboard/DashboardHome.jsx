import React from 'react';
import useAuth from '../../Components/Hooks/useAuth';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useRole from '../../Components/Hooks/useRole';
import { GiHand } from 'react-icons/gi';

const ApprovedTuitoins = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const tutorEmail = user.email;
    const currentUserEmail = user.email;
    const navigate = useNavigate();

    const { data: profile = {}, isLoading } = useQuery({
        queryKey: ['my-profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const { data: myTuitions = [] } =
        useQuery({
            queryKey: ['my-tuitions', currentUserEmail], queryFn: async () => {
                const res = await axiosSecure.get(`/tuitions/creator/${user.email}`);
                return res.data;
            }
        })

    const {
        data: myTutors = [],
    } = useQuery({
        queryKey: ["my-tutors", currentUserEmail],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/applications/tuitioncreator/${currentUserEmail}`
            );
            return res.data;
        },
    });

    const { data: myPayments = [] } =
        useQuery({
            queryKey: ['my-payments', currentUserEmail],
            queryFn: async () => {
                const res = await axiosSecure.get(`/tuitions/payee/${user.email}`)
                return res.data;
            }
        })

    const { data: myApplications = [] } = useQuery({
        queryKey: ["my-applications", tutorEmail],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications/creator/${tutorEmail}`);
            return res.data;
        },
    });


    const {
        data: myApprovedApplications = [],
        refetch
    } =
        useQuery({
            queryKey: [`my-approved-applications`, tutorEmail],
            queryFn: async () => {
                const res = await axiosSecure.get(`/applications/approved/${tutorEmail}`)
                return res.data;
            }
        })

    const isUserStudent = profile.userRole === 'student';
    const isUserTutor = profile?.userRole === 'tutor';
    const isUserAdmin = profile?.userRole === 'admin' && user?.isAdmin === true;

    const totalSpentByStudent = myPayments.reduce((spentAmount, tuition) => spentAmount + (tuition.tutorSalary), 0).toLocaleString();
    const totalRevenue = myApprovedApplications.reduce((revenue, app) => revenue + (app.tutorSalary), 0).toLocaleString();
    const approvalRate = myApplications.length > 0
        ? ((myApprovedApplications.length / myApplications.length) * 100).toFixed(1)
        : 0;

    return (
        <div className="overflow-x-auto">
            <div className="text-center flex flex-col justify-center items-center">
                <GiHand className="h-25 w-25" />
                <h1 className="text-white text-medium text-4xl">Welcome back, <span className="text-[#00bba7]">{useRole().role} !</span></h1>
            </div>
            <br />
            <br />

            {/* //dashboard stats for admin */}
            {isUserAdmin ? (<div>this is admin</div>) : <></>}


            {/* //dashboard stats for student */}
            {isUserStudent ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                    <div className="stats shadow bg-gray-900 text-white border border-white/10">
                        <div className="stat">
                            <div className="stat-title text-gray-400">Posted Tuitions</div>
                            <div className="stat-value text-[#00bba7]">{myTuitions.length}</div>
                            <div className="stat-desc text-gray-500">Tuitions posted so far</div>

                        </div>
                    </div>

                    <div className="stats shadow bg-gray-900 text-white border border-white/10">
                        <div className="stat">
                            <div className="stat-title text-gray-400">Applicants</div>
                            <div className="stat-value text-blue-500">{myTutors.length}</div>
                            <div className="stat-desc text-gray-500">Applications received</div>
                        </div>
                    </div>

                    <div className="stats shadow bg-gray-900 text-white border border-white/10">
                        <div className="stat">
                            <div className="stat-title text-gray-400">Total Spent</div>
                            <div className="stat-value text-green-500">{totalSpentByStudent}</div>
                            <div className="stat-desc text-gray-500">Your total spendings till now</div>
                        </div>
                    </div>
                </div>
            ) : (
                <>  </>
            )}



            {/* // dashboard stats for tutor */}
            {isUserTutor ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="stats shadow bg-gray-900 text-white border border-white/10">
                        <div className="stat">
                            <div className="stat-title text-gray-400">Total Revenue</div>
                            <div className="stat-value text-[#00bba7]">৳ {totalRevenue}</div>
                            <div className="stat-desc text-gray-500">Total Earned</div>

                        </div>
                    </div>

                    <div className="stats shadow bg-gray-900 text-white border border-white/10">
                        <div className="stat">
                            <div className="stat-title text-gray-400">Total Applications</div>
                            <div className="stat-value text-blue-500">{myApplications.length}</div>
                            <div className="stat-desc text-gray-500">Submissions received</div>
                        </div>
                    </div>

                    <div className="stats shadow bg-gray-900 text-white border border-white/10">
                        <div className="stat">
                            <div className="stat-title text-gray-400">Approval Rate</div>
                            <div className="stat-value text-green-500">{approvalRate}%</div>
                            <div className="stat-desc text-gray-500">{myApprovedApplications.length} Approvals out of {myApplications.length}</div>
                        </div>
                    </div>
                </div>
            ) : (
                <>  </>
            )}
        </div>
    );
};


export default ApprovedTuitoins;