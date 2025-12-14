import React, { useState } from 'react';
import useAuth from '../../Components/Hooks/useAuth';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { IoArrowForward } from 'react-icons/io5';

const MyTuitions = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const currentUserEmail = user.email
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);

    const {data: myTuitions = [],refetch} = 
    useQuery({queryKey: ['my-tuitions', currentUserEmail],queryFn: async () => {
            const res = await axiosSecure.get(`/tuitions/creator/${user.email}`);
            return res.data;
        }
    })



    const handleTuitionEdit = (tuition) => {
        Swal.fire({
            title: "Edit Tuition Information",
            html: `
        <input id="subject" class="swal2-input" placeholder="Subject" value="${tuition?.subject || ""
                }">
        <input id="location" class="swal2-input" placeholder="Location" value="${tuition?.location || ""
                }">
        <input id="fee" type="number" class="swal2-input" placeholder="Fee" value="${tuition?.fee || ""
                }">
      `,
            showCancelButton: true,
            confirmButtonText: "Update",
            preConfirm: () => {
                const updatedValues = {
                    subject: document.getElementById("subject").value,
                    location: document.getElementById("location").value,
                    fee: Number(document.getElementById("fee").value),
                    image: `https://dummyimage.com/600x400/000/fff.png&text=${subject.value}`,
                };
                return updatedValues;
            }
        })
            .then((result) => {
                if (result.isConfirmed) {
                    const updatedValues = result.value;
                    axiosSecure
                        .patch(`/tuitions/${tuition._id}`, updatedValues)
                        .then(() => {
                            Swal.fire("Updated!", "Tuition updated successfully.", "success");
                            refetch();
                        })
                        .catch(() => {
                            Swal.fire("Error", "Failed to update tuition.", "error");
                        });
                }
            });
    };
    const handleDeleteTuition = (tuition) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tuitions/delete/${tuition._id}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'Your tuition has been deleted.',
                            'success'
                        );
                        navigate('/dashboard/my-tuitions');
                        refetch();

                    })
                    .catch(() => {
                        Swal.fire("Error", "Failed to delete tuition.", "error");
                    });
            }
        });


    };
    const handlePayment = async (tuition) => {
        setIsClicked(true);

        const paymentInfo = {
            fee: tuition.fee * 100,
            _id: tuition._id,
            creatorEmail: tuition.creatorEmail,
            subject: tuition.subject,
        }
        const res = await axiosSecure.post(`/checkout`, paymentInfo)

        if (res.data.url) {
            window.location.href = res.data.url;
        }
        else {
            Swal.fire("Error", "Failed to initiate payment.", "error");
            setIsClicked(false);

        }

    };

    return (
        <div>
            <div className="overflow-x-auto">

                <table className="table">
                    <thead>
                        <tr>
                            <th className="text-gray-500">#</th>
                            <th>Subject</th>
                            <th>Applicants</th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {myTuitions.map((tuition, index) => (
                            <tr
                                key={tuition._id}
                                className="hover:bg-white/5 transition-all duration-150 "
                                onClick={() => navigate(`/tuitions/${tuition._id}`)}>
                                <th className="text-gray-500">{index + 1}</th>
                                <td className="font-normal">{tuition.subject}</td>
                                <td>{tuition.location} ({tuition.mode})</td>
                                <td>৳{tuition.fee.toLocaleString()}</td>
                                <td>{tuition.applicants?.length || 0}</td>
                                <td>
                                    <span className={` ${tuition.paymentStatus === 'Paid' ? 'text-green-500' : 'badge-warning'}`}>

                                        {tuition.paymentStatus === 'Paid' ? 'Paid' : 
                                        <div
                                        onClick={  (e) => { e.stopPropagation(); handlePayment(tuition); }  }
                                         className="flex justify-center items-center btn bg-green-500 text-black hover:bg-green-300/50 gap-2">
                                            {isClicked ? (
                                                            <span className="loading loading-spinner loading-xs"></span>
                                                          ) : (
                                                            <div className="flex justify-center items-center">Pay now</div>
                                                          )}
                                            </div>}
                                    </span>
                                </td>
                                <td className="flex justify-center items-center gap-2">

                                    <button
                                        onClick={(e) => { e.stopPropagation(); navigate(`/tuitions/${tuition._id}`) }}
                                        className=" btn btn-neutral rounded-2xl bg-teal-500 text-black hover:bg-teal-300/50">View</button>

                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleTuitionEdit(tuition); }}
                                        className=" btn btn-neutral rounded-2xl bg-teal-500 text-black hover:bg-teal-300/50"><FiEdit className="rounded-3xl"></FiEdit></button>

                                    <button onClick={(e) => { e.stopPropagation(); handleDeleteTuition(tuition); }} className=" btn btn-neutral rounded-2xl bg-teal-500 text-black hover:bg-red-600/80">
                                        <MdDelete className="rounded-3xl"></MdDelete>

                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>


                </table>

            </div>
        </div>
    );
};

export default MyTuitions;