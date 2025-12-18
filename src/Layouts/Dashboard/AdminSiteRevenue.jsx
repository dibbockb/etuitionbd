import React from 'react';
import Loading from '../../Components/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useRole from '../../Components/Hooks/useRole';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';

const AdminSiteRevenue = () => {

    const axiosSecure = useAxiosSecure();
    const { role } = useRole();
    const navigate = useNavigate();

    const { data: allPayments = [], refetch, isLoading } =
        useQuery({
            queryKey: ['all-payments'],
            queryFn: async () => {
                const res = await axiosSecure.get(`admin/payments-log`)
                return res.data;
            }
        })

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className="overflow-x-auto">

                <table className="table">
                    <thead>
                        <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">Studnt</th>
                            <th className="text-center">Tutor</th>
                            <th className="text-center">Amount</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Payment Time</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allPayments.map((payment, index) => (
                            <tr
                                key={payment._id}
                                className="hover:bg-white/5 transition-all duration-150 text-center ">

                                <th className="text-gray-500">{index + 1}</th>
                                <td className="font-normal text-center">{payment.creatorEmail}</td>
                                <td className="text-center">{payment.tutorEmail}</td>
                                <td className="text-center">{payment.tutorSalary}</td>
                                <td className="text-center">
                                    <span className={` ${payment.paymentStatus === 'Paid' ? 'text-green-500' : 'badge-warning'} `}>
                                        {payment.paymentStatus}
                                    </span>
                                </td>

                                <td className="text-center">
                                    {payment.paidAt
                                        ? new Date(payment.paidAt).toLocaleDateString('en', {
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
                <div className="mt-2 text-center text-white">
                    <p className="text-2xl font-medium text-white text-center">
                        Total Platform Revenue :
                        <span className="text-[#00bba7]">
                            ৳{allPayments
                                .reduce((payment, log) => payment + log.tutorSalary, 0)
                                .toLocaleString()}</span>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default AdminSiteRevenue;