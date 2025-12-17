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
                
            <table className="table">
                <thead>
                    <tr className="">
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
                            className="hover:bg-white/10 cursor-pointer transition"
                            onClick={() => navigate(`/tuitions/${application.tuitionId}`)}
                        >
                            <th>{index + 1}</th>

                            <td className="text-center">{application.tuitionId}</td>

                            <td className={`text-center font-medium ${application.applicationStatus === `Approved` ? "text-green-500" : "text-yellow-500"}`} >
                                {application.applicationStatus === "Approved"
                                    ? "Paid"
                                    : "Unpaid"}
                            </td>

                            <td className="text-center">৳ {Number(application.tutorSalary).toLocaleString()}</td>
                            <td className="text-center"> {application.paidAt ? new Date(application.paidAt).toLocaleDateString('en', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            })
                                : 'N/A'}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <hr className="mt-5 border-t border-white/20" />
            <div className="mt-2 text-right pr-4">
                <p className="text-2xl font-medium text-white text-center">
                    Total Revenue : <span className="text-[#00bba7]">
                        ৳ {myApprovedApplications
                            .reduce((revenue, app) => revenue + app.tutorSalary, 0)
                            .toLocaleString()}</span>
                </p>
            </div>
        </div>
    );
};


export default ApprovedTuitoins;