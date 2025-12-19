import React from "react";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import useAuth from "../../Components/Hooks/useAuth";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { FiEdit, FiEdit3 } from "react-icons/fi";
import Swal from "sweetalert2";
import { GrView } from "react-icons/gr";
import Loading from "../../Components/Loading/Loading";


const AppliedTuitions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const tutorEmail = user?.email;

    const { data: myApplications = [], refetch, isLoading } = useQuery({
        queryKey: ["my-applications", tutorEmail],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications/creator/${tutorEmail}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    const navigate = useNavigate();

    const handleUpdateApplication = async (application) => {
        const updateId = application._id;
        const updateForm = await Swal.fire(
            {
                title: "Update Application",
                html:
                    `<input readOnly id="tutorname" class="swal2-input font-light bg-gray-900 border hover:cursor-none border-gray-600 text-gray-500/50" placeholder="name" value="${user.email}">
            <input required id="tutorqual" class="swal2-input bg-gray-900 border border-gray-600 text-white" placeholder="Qualification" value="${application.tutorQualifications}">
            <input required id="tutorexperience" class="swal2-input bg-gray-900 border border-gray-600 text-white" placeholder="Experience" value="${application.tutorExperience}">
            <input required id="tutorsalary" type="number" class="swal2-input bg-gray-900 border border-gray-600 text-white" placeholder="Expected Salary" value="${application.tutorSalary}">`,
                showCancelButton: true,
                confirmButtonText: "Update",

                preConfirm: () => {
                    const tutorQual = document.getElementById("tutorqual").value.trim();
                    const tutorExp = document.getElementById("tutorexperience").value.trim();
                    const tutorSalaryInput = document.getElementById("tutorsalary").value;

                    if (!tutorQual || !tutorExp || !tutorSalaryInput) {
                        Swal.showValidationMessage('Please enter all fields');
                        return false;
                    }

                    const updateData = {
                        tutorEmail: user?.email,
                        tutorQualifications: tutorQual,
                        tutorExperience: tutorExp,
                        tutorSalary: Number(tutorSalaryInput),
                        editTime: new Date(),
                    };

                    return updateData;
                }
            }
        );
        if (updateForm.isConfirmed) {
            try {
                await axiosSecure.patch(`/update-application/${updateId}`, updateForm.value);
                Swal.fire("Success!", "Your application has been updated!", "success");
                refetch();
            } catch (error) {
                const msg = error.response?.data?.message
                Swal.fire("Error", msg, "error");
            }
        }
    }

    const handleDeleteApplication = (application) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/applications/delete/${application._id}`)
                        .then(() => {
                            Swal.fire(
                                'Deleted!',
                                'Your application has been deleted.',
                                'success'
                            );
                            refetch();
                        })
                        .catch(() => {
                            Swal.fire("Error", "Unable to delete", "error")
                        })
                }
            })
    }



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

                                <td className={`text-center font-medium ${application.applicationStatus === `Approved` ? "text-green-500" : "text-amber-500"}`} >
                                    {application.applicationStatus === "Approved"
                                        ? "Approved"
                                        : "Pending"}
                                </td>

                                <td className="text-center">৳ {application.tutorSalary}</td>

                                <td
                                    className="flex justify-center items-center"
                                    onClick={(e) => e.stopPropagation()}>

                                    <button
                                        onClick={() =>
                                            navigate(`/tuitions/${application.tuitionId}`)}
                                        className="btn btn-sm btn-neutral bg-teal-500 hover:bg-teal-600 text-black ">
                                        <GrView /></button>

                                    <button
                                        onClick={() =>
                                            handleUpdateApplication(application)
                                        }
                                        className="btn btn-sm btn-neutral bg-teal-500 hover:bg-teal-600 text-black" >
                                        <FiEdit3 /></button>


                                    <button
                                        onClick={() =>
                                            handleDeleteApplication(application)
                                        }
                                        className="btn btn-sm btn-neutral bg-teal-500 hover:bg-red-600/70 text-black" >
                                        <MdDelete /></button>
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
