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
                            <th className="text-center">Subject</th>
                            <th className="text-center">Payment</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Date</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {myPayments.map((tuition, index) => (
                            <tr
                                key={tuition._id}
                                className="hover:bg-white/5 transition-all duration-150 "
                                onClick={() => navigate(`/tuitions/${tuition._id}`)}>
                                <th className="text-gray-500">{index + 1}</th>
                                <td className="font-normal text-center">{tuition.subject}</td>
                                <td className="text-center">৳{tuition.fee.toLocaleString()}</td>
                                <td className="text-center">
                                    <span className={` ${tuition.paymentStatus === 'Paid' ? 'text-green-500' : 'badge-warning'} `}>

                                        {tuition.paymentStatus === 'Paid' ? 'Completed' :
                                            <div
                                                onClick={(e) => { e.stopPropagation(); handlePayment(tuition); }}
                                                className="flex justify-center items-center btn bg-green-500 text-sm break-none text-black hover:bg-green-300/50 gap-2">
                                                {isClicked ? (
                                                    <span className="loading loading-spinner loading-xs"></span>
                                                ) : (
                                                    <div className="flex justify-center items-center">Pay</div>
                                                )}
                                            </div>}
                                    </span>
                                </td>

                                <td className="text-center">
                                    {tuition.paymentDate
                                        ? new Date(tuition.paymentDate).toLocaleDateString('en', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })
                                        : 'N/A'}
                                </td>
                                <td className="flex justify-center items-center gap-2">

                                    <button
                                        onClick={(e) => { e.stopPropagation(); navigate(`/tuitions/${tuition._id}`) }}
                                        className=" btn btn-neutral rounded-2xl bg-teal-500 text-black hover:bg-teal-300/50">View</button>

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