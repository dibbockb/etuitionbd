import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loading from "../Loading/Loading";

const UserProfile = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: user, isLoading } = useQuery({
        queryKey: ["user", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${id}`);
            return res.data;
        },
    });

    if (isLoading) return <Loading />;
    if (!user) return <div className="text-center py-32 text-3xl text-white">User not found</div>;

    return (
        <div className="min-h-150 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className=" backdrop-blur-lg rounded-3xl shadow-2xl p-10 text-white">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <img
                            src={user.photoURL || `https://dummyimage.com/600x400/000/fff.png&text=${user.displayName.charAt(0)}`}
                            alt={user.displayName}
                            className="w-48 h-48 rounded-full object-cover border-3 border-teal-500 shadow-xl"
                        />

                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-5xl font-bold mb-4">{user.displayName}</h1>
                            <p className="text-2xl text-teal-400 mb-4">{user.email}</p>
                            <p className="text-xl mb-4">Phone: {user.userPhone || "Not given"}</p>

                            <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
                                <span className={`badge badge-lg ${user.userRole === "tutor" ? "badge-accent" : user.userRole === "admin" ? "badge-error" : "badge-info"}`}>
                                    {user.userRole.charAt(0).toUpperCase() + user.userRole.slice(1)}
                                </span>
                            </div>

                            <p className="text-gray-400 mt-8">
                                Member since {new Date(user.createdAt).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;