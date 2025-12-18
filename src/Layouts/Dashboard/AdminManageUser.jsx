import React from 'react';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import useRole from '../../Components/Hooks/useRole';
import { useNavigate } from 'react-router';
import Loading from '../../Components/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { TiTick } from 'react-icons/ti';
import { ImCross } from 'react-icons/im';
import { TbUserEdit } from 'react-icons/tb';
import { BsFillEyeFill } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const AdminManageUser = () => {

    const axiosSecure = useAxiosSecure();
    const { role } = useRole();
    const isUserAdmin = role === "Admin";
    const navigate = useNavigate();

    const { data: allUsers = [], refetch, isLoading } =
        useQuery({
            queryKey: [`all-users`],
            queryFn: async () => {
                const res = await axiosSecure.get(`/users`);
                return res.data;
            }
        })

    if (isLoading) {
        return <Loading></Loading>
    }


    const handleViewUser = (user) => {
        navigate(`/users/profile/${user.email}`)
    }

    const handleEditUser = async (user) => {
        const userId = user._id;
        const update = await Swal.fire(
            {
                title: "Update User Information",
                html:
                    `<input id="useremail" class="swal2-input font-light bg-gray-900 border border-gray-600 text-gray-500/50" placeholder="Email" value="${user.email}">
                    <input id="username" class="swal2-input bg-gray-900 border border-gray-600 text-white" placeholder="Name" value="${user.displayName}">
                    <input id="userphone" class="swal2-input bg-gray-900 border border-gray-600 text-white" placeholder="Phone" value="${user.userPhone}">
                    <select id="userrole" class="swal2-select bg-gray-900 border border-gray-600 text-white" placeholder="Role">
                        <option value="student" ${user.userRole === "student" ? "selected" : ""}>Student</option>
                        <option value="tutor" ${user.userRole === "tutor" ? "selected" : ""}>Tutor</option>
                        <option value="admin" ${user.userRole === "admin" ? "selected" : ""}>Admin</option>
                    </select>`,
                showCancelButton: true,
                confirmButtonText: "Update User",

                preConfirm: () => {
                    const updateForm = {
                        userEmail: document.getElementById("useremail").value,
                        displayName: document.getElementById("username").value,
                        userPhone: document.getElementById("userphone").value,
                        userRole: document.getElementById("userrole").value,
                    };
                    return updateForm;
                }
            }
        );

        if (update.isConfirmed) {
            try {
                const result = await axiosSecure.patch(`/admin/update-user/${userId}`, update.value)
                if (result.data.modifiedCount) {
                    refetch();
                    Swal.fire("Success", "User updated successfully", "success");
                }
            } catch (error) {
                console.log(error);
                Swal.fire("Error", "failed to update as admin", "error");
            }
        }
    }


    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Delete this User?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Delete",
        })
            .then(async (result) => {
                try {
                    if (result.isConfirmed) {
                        axiosSecure.delete(`/admin/users/delete/${user._id}`)
                        Swal.fire({
                            title: "Deleted!",
                            text: "This Tuition has been Deleted",
                            icon: "success",
                        });
                        refetch();
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire("Error", "failed to update as admin", "error");
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
                        <th className="text-center">Name</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Phone</th>
                        <th className="text-center">Created At</th>
                        <th className="text-center">Role</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {allUsers.map((user, index) => (
                        <tr
                            key={user._id}
                            className="hover:bg-white/10 cursor-pointer transition ease-in-out text-center"
                            onClick={() => navigate(`/users/profile/${user.email}`)}
                        >
                            <th className="text-gray-400 ">{index + 1}</th>
                            <td className="text-center">{user.displayName}</td>
                            <td>
                                <div>
                                    <p className="text-center">{user.email}</p>
                                </div>
                            </td>
                            <td className="text-center text-green-400">
                                {(user.userPhone)}
                            </td>
                            <td className="text-center">
                                {new Date(user.createdAt).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                })}
                            </td>

                            <td className={`text-center font-medium ${user.userRole === "student" ? "text-green-500" :
                                user.userRole === "tutor" ? "text-teal-500" :
                                    user.userRole === "admin" ? "text-red-500" :
                                        "text-white"
                                }`}>
                                {user.userRole.charAt(0).toUpperCase() + user.userRole.slice(1)}
                            </td>

                            <td onClick={(e) => e.stopPropagation()} className="flex justify-center items-center text-center mx-auto mt-1">
                                <button
                                    onClick={() => handleViewUser(user)}
                                    className="btn btn-xs h-7 btn-neutral bg-teal-500 hover:bg-teal-600 text-black/80"
                                >
                                    <BsFillEyeFill className="w-4 scale-180" />
                                </button>

                                <button
                                    onClick={() => handleEditUser(user)}
                                    className="btn btn-xs h-7 btn-neutral bg-teal-500 hover:bg-teal-600 text-black/80"
                                >
                                    <TbUserEdit className="w-4 scale-180" />
                                </button>


                                <button
                                    onClick={() => handleDeleteUser(user)}
                                    className="btn btn-xs h-7 btn-neutral bg-teal-500 hover:bg-red-600/70 text-black/80"
                                >
                                    <FaTrash className="w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminManageUser;