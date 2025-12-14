import React from "react";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import useAuth from "../../Components/Hooks/useAuth";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const AppliedTuitions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const tutorEmail = user?.email;
    const navigate = useNavigate();

    const { data: myApplications = [], refetch } = useQuery({
        queryKey: ["my-applications", tutorEmail],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications/creator/${tutorEmail}`);
            return res.data;
        },
    });

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="">
                            <th>#</th>
                            <th className="text-center">Subject</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Allowance</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {myApplications.map((application, index) => (
                            <tr
                                key={application._id}
                                className="hover:bg-white/10 cursor-pointer transition"
                                onClick={() => navigate(`/tuitions/${application.tuitionId}`)}
                            >
                                <th>{index + 1}</th>

                                <td className="text-center">{application.tuitionSubject}</td>

                                <td className="text-center">
                                    {application.applicationStatus === "Pending"
                                        ? "Pending Approval"
                                        : "Approved"}
                                </td>

                                <td className="text-center">৳ {application.tutorSalary}</td>

                                <td
                                    className="flex justify-center items-center"
                                    onClick={(e) => e.stopPropagation()}>

                                    <button
                                        onClick={() =>
                                            navigate(`/tuitions/${application.tuitionId}`)}
                                        className="btn btn-sm btn-neutral bg-teal-500 hover:bg-teal-600 text-black">
                                        View</button>

                                    <button
                                        onClick={() =>
                                            console.log(`clicked update button`)
                                        }
                                        className="btn btn-sm btn-neutral bg-teal-500 hover:bg-teal-600 text-black" >
                                        Update</button>


                                    <button
                                        onClick={() =>
                                            console.log(`clicked delete button`)
                                        }
                                        className="btn btn-sm btn-neutral bg-teal-500 hover:bg-teal-600 text-black" >
                                        Delete</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppliedTuitions;
