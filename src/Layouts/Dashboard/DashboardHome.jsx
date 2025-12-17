import React from 'react';
import useAuth from '../../Components/Hooks/useAuth';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

const ApprovedTuitoins = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const tutorEmail = user.email;
    const navigate = useNavigate();

    const isUserStudent = user?.userRole === 'student';
    const isUserTutor = user?.userRole === 'tutor';
    const isUserAdmin = user?.userRole === 'admin' && user?.isAdmin === true;

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


    return (
        <div className="overflow-x-auto">

            {isUserStudent ? (<div>this is student</div>) : !isUserStudent && <div className="flex items-center justify-center h-64">
                <p className="text-2xl text-red-500 font-bold">Access Denied: Not a Student</p>
            </div>}

            {isUserAdmin ? (<div>this is admin</div>) : !isUserAdmin && <div className="flex items-center justify-center h-64">
                <p className="text-2xl text-red-500 font-bold">Access Denied: Not an Admin</p>
            </div>}

            {isUserTutor ? (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="text-white border-b border-white/20">
                                <th>#</th>
                                <th className="text-center">Tuition ID</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Revenue</th>
                                <th className="text-center">Payment Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myApprovedApplications.map((application, index) => (
                                <tr
                                    key={application._id}
                                    className="hover:bg-white/10 cursor-pointer transition border-b border-white/10"
                                    onClick={() => navigate(`/tuitions/${application.tuitionId}`)}
                                >
                                    <th>{index + 1}</th>
                                    <td className="text-center">{application.tuitionId}</td>
                                    <td className={`text-center font-medium ${application.applicationStatus === 'Approved' ? "text-green-500" : "text-yellow-500"}`}>
                                        {application.applicationStatus === "Approved" ? "Paid" : "Unpaid"}
                                    </td>
                                    <td className="text-center">৳ {application.tutorSalary?.toLocaleString()}</td>
                                    <td className="text-center">
                                        {application.paidAt ? new Date(application.paidAt).toLocaleDateString('en-GB', {
                                            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                        }) : 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-8 text-center">
                        <p className="text-3xl font-bold text-white">
                            Total Revenue: <span className="text-[#00bba7]">৳ {formatBDT(totalRevenueBDT)}</span>
                        </p>
                        <p className="text-sm text-gray-400">(${(totalRevenueBDT / 125).toFixed(2)} USD)</p>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-64">
                    <p className="text-2xl text-red-500 font-bold">Access Denied: Not a Tutor</p>
                </div>
            )}
        </div>
    );
};


export default ApprovedTuitoins;