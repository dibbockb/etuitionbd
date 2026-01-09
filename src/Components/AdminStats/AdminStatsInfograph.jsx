import React from 'react';
import { FiBook, FiUsers, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const AdminStatsInfograph = ({ allTuitions = [], allUsers = [], allPayments = [] }) => {
    const totalTuitions = allTuitions.length;
    const totalUsers = allUsers.length;
    const totalRevenue = allPayments.reduce((sum, payment) => sum + (payment.tutorSalary || 0), 0);
    const approvedTuitions = allTuitions.filter(tuition => tuition.isAdminApproved === true).length;
    const pendingTuitions = allTuitions.filter(tuition => tuition.isAdminApproved !== true).length;

    return (
        <div className="w-full space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-2">Platform Analytics</h2>
                <p className="text-gray-400">Overview of your platform metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="backdrop-blur-2xl p-5 rounded-2xl bg-white dark:bg-gray-400/10 border border-gray-200 dark:border-none transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-500/20 p-3 rounded-lg">
                            <FiBook className="w-6 h-6 text-blue-400" />
                        </div>
                    </div>
                    <h3 className=" text-sm font-medium mb-1">Total Tuitions</h3>
                    <p className="text-[#06f8e0] text-3xl font-bold mb-2">{totalTuitions}</p>
                    <div className="flex items-center justify-between text-xs">
                        <div className="text-xs text-gray-500">
                            Tuition posted
                        </div>
                    </div>
                </div>

                <div className="backdrop-blur-2xl p-5 rounded-2xl bg-white dark:bg-gray-400/10 border border-gray-200 dark:border-none transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-purple-500/20 p-3 rounded-lg">
                            <FiUsers className="w-6 h-6 text-purple-400" />
                        </div>
                    </div>
                    <h3 className=" text-sm font-medium mb-1">Total Users</h3>
                    <p className="text-[#06f8e0] text-3xl font-bold mb-2">{totalUsers}</p>
                    <div className="text-xs text-gray-500">
                        Platform Members
                    </div>
                </div>

                <div className="backdrop-blur-2xl p-5 rounded-2xl bg-white dark:bg-gray-400/10 border border-gray-200 dark:border-none transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-green-500/20 p-3 rounded-lg">
                            <FiDollarSign className="w-6 h-6 text-green-400" />
                        </div>
                    </div>
                    <h3 className=" text-sm font-medium mb-1">Platform Revenue</h3>
                    <p className="text-[#06f8e0] text-3xl font-bold mb-2">৳ {totalRevenue.toLocaleString()}</p>
                    <div className="text-xs text-gray-500">
                        Total Earnings
                    </div>
                </div>


            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-xl p-6">
                    <h3 className="text-black dark:text-white text-lg font-semibold mb-4">Revenue</h3>
                    <div className="h-80">
                        <Bar
                            data={{
                                labels: ['Platform Revenue'],
                                datasets: [{
                                    label: 'Total Revenue (৳)',
                                    data: [totalRevenue],
                                    backgroundColor: [
                                        '#00bba7',
                                    ],

                                }]
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                indexAxis: 'x',
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#9ca3af',
                                            font: { size: 20 }
                                        }
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: (context) => `৳ ${context.raw.toLocaleString()}`
                                        },
                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                        titleColor: '#fff',
                                        bodyColor: '#fff',
                                        borderWidth: 0
                                    }
                                },
                            }}
                        />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-xl p-6">
                    <h3 className="text-black dark:text-white text-lg font-semibold mb-4">Tuition Status Overview</h3>
                    <div className="h-80 flex items-center justify-center">
                        <div className="w-full h-full flex items-center justify-center">
                            <Doughnut
                                data={{
                                    labels: ['Approved', 'Pending'],
                                    datasets: [{
                                        data: [approvedTuitions, pendingTuitions],
                                        backgroundColor: [
                                            '#00bba7',
                                            '#0f172a',
                                        ],
                                        borderColor: [
                                            'none',
                                            '#0f172a',
                                        ],
                                    }]
                                }}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'bottom',
                                            labels: {
                                                color: '#9ca3af',
                                                padding: 20,
                                                font: { size: 12 }
                                            }
                                        },
                                        tooltip: {
                                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                            titleColor: '#fff',
                                            bodyColor: '#fff',
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-white/5 rounded-xl p-6">
                <div className="text-center">
                    <p className="text-white text-sm mb-2">Tuition Accept Rate</p>
                    <p className="text-2xl font-bold text-[#06f8e0]">{totalTuitions > 0 ? ((approvedTuitions / totalTuitions) * 100).toFixed(1) : 0}%</p>
                </div>
                <div className="text-center border-l border-r border-gray-200 dark:border-white/10">
                    <p className="text-white text-sm mb-2">Average Tutor Salary</p>
                    <p className="text-2xl font-bold text-[#06f8e0]">৳ {allPayments.length > 0 ? (totalRevenue / allPayments.length).toFixed(0).toLocaleString() : 0}</p>
                </div>
                <div className="text-center">
                    <p className="text-white text-sm mb-2">Total Successful Transation</p>
                    <p className="text-2xl font-bold text-[#06f8e0]">{allPayments.length}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminStatsInfograph;

// 00bba7