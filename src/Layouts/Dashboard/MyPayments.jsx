import React from 'react';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import useAuth from '../../Components/Hooks/useAuth';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';

const MyPayments = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const currentUserEmail = user.enail;
    const navigate = useNavigate();


    const { data: myPayments = [], refetch } =
        useQuery({
            queryKey: ['my-payments', currentUserEmail],
            queryFn: async () => {
                const res = await axiosSecure.get(`/tuitions/payee/${user.email}`)
                return res.data;
            }
        })

    return (
        <div>
            <div className="overflow-x-auto">

                <table className="table">
                    <thead>
                        <tr>
                            <th className="text-gray-500">#</th>
                            <th className="text-center">Tutor</th>
                            <th className="text-center">E-mail</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Amount</th>
                            <th className="text-center">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {myPayments.map((tuition, index) => (
                            <tr
                                key={tuition._id}
                                className="hover:bg-white/5 transition-all duration-150 text-center ">

                                <th className="text-gray-500">{index + 1}</th>
                                <td className="font-normal text-center">{tuition.tutorName}</td>
                                <td className="text-center">৳{tuition.tutorEmail}</td>
                                <td className="text-center">
                                    <span className={` ${tuition.paymentStatus === 'Paid' ? 'text-green-500' : 'badge-warning'} `}>
                                        {tuition.paymentStatus}
                                    </span>
                                </td>
                                <td className="">{tuition.tutorSalary}</td>

                                <td className="text-center">
                                    {tuition.paidAt
                                        ? new Date(tuition.paidAt).toLocaleDateString('en', {
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

            </div>
        </div>
    );
};

export default MyPayments;