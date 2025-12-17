import React from 'react';
import useAuth from '../../Components/Hooks/useAuth';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import useRole from '../../Components/Hooks/useRole';
import { useQuery } from '@tanstack/react-query';
import { TiTick } from 'react-icons/ti';
import { ImCross } from 'react-icons/im';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Loading from '../../Components/Loading/Loading';

const AdminManageTuitions = () => {
    const axiosSecure = useAxiosSecure();
    const { role } = useRole();
    const isUserAdmin = role === "Admin";
    const navigate = useNavigate();

    const { data: allTuitions = [], refetch, isLoading } =
        useQuery({
            queryKey: [`all-tuitions`],
            queryFn: async () => {
                const res = await axiosSecure.get(`/admin/tuitions/all`);
                return res.data;
            }
        })

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleAcceptTuition = (tuition) => {
        Swal.fire({
            title: "Accept this Tuition?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axiosSecure.patch(`/admin/tuitions/accept/${tuition._id}`);
                        Swal.fire("Approved!", "", "success");
                        refetch();
                    } catch {
                        Swal.fire("Error", "Failed to approve", "error");
                    }
                }
            });
        refetch();
    }

    const handleRejectTuition = (tuition) => {
        Swal.fire({
            title: "Delete this Tuition?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Delete",
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/admin/tuitions/delete/${tuition._id}`)
                    Swal.fire({
                        title: "Deleted!",
                        text: "This Tuition has been Deleted",
                        icon: "success",
                    });
                    refetch();
                }
            })
        refetch();
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead className="">
                    <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Subject</th>
                        <th className="text-center">Creator</th>
                        <th className="text-center">Budget</th>
                        <th className="text-center">Creation Time</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {allTuitions.map((tuition, index) => (
                        <tr
                            key={tuition._id}
                            className="hover:bg-white/10 cursor-pointer transition ease-in-out text-center"
                            onClick={() => navigate(`/tuitions/${tuition._id}`)}
                        >
                            <th className="text-gray-400 ">{index + 1}</th>
                            <td className="text-center">{tuition.subject}</td>
                            <td>
                                <div>
                                    <p className="text-center">{tuition.creatorEmail}</p>
                                </div>
                            </td>
                            <td className="text-center text-green-400">
                                ৳ {Number(tuition.fee).toLocaleString()}
                            </td>
                            <td className="text-center">
                                {new Date(tuition.createdAt).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                })}
                            </td>
                            <td className="text-center">
                                <span className={` ${tuition.isAdminApproved ? 'text-green-600' : 'text-amber-500'}`}>
                                    {tuition.isAdminApproved ? 'Approved' : 'Pending'}
                                </span>
                            </td>


                            <td onClick={(e) => e.stopPropagation()} className="flex justify-center items-center text-center mx-auto mt-1">
                                <button
                                    onClick={() => handleAcceptTuition(tuition)}
                                    className="btn btn-xs h-7 btn-neutral bg-teal-500 hover:bg-teal-600 text-black/80"
                                >
                                    <TiTick className="w-4 scale-180" />
                                </button>

                                <button
                                    onClick={() => handleRejectTuition(tuition)}
                                    className="btn btn-xs h-7 btn-neutral bg-teal-500 hover:bg-red-600/70 text-black/80"
                                >
                                    <ImCross className="w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminManageTuitions;
