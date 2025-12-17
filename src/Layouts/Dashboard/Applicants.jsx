import React, { useState } from "react";
import useAuth from "../../Components/Hooks/useAuth";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";

const Applicants = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const currentUserEmail = user.email;
  const navigate = useNavigate();
  const [clickedAppId, setClickedAppId] = useState(null);

  const {
    data: myTutors = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-tutors", currentUserEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications/tuitioncreator/${currentUserEmail}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (myTutors.length === 0) {
    return (
      <div className="text-center py-20 text-2xl text-white">
        No applicants yet
      </div>
    );
  }

  const handleAcceptApplicant = (app) => {
    setClickedAppId(app._id);

    const handlePayment = async (app) => {
      try {
        const paymentInfo = {
          _id: app._id,
          fee: app.tutorSalary * 100,
          creatorEmail: user.email,
          subject: app.tuitionSubject,
        };
        const res = await axiosSecure.post(`/checkout-tutor`, paymentInfo);
        if (res.data.url) {
          window.location.href = res.data.url;
        } else {
          Swal.fire("Error", "Failed to initiate payment.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Payment initiation failed.", "error");
        console.error(error);
      }
    };

    Swal.fire({
      title: "Accept this Tutor?",
      text: "This will reject all other applicants for this tuition!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const otherApplicants = myTutors.filter(
            (other) =>
              other.tuitionId === app.tuitionId && other._id !== app._id
          );
          for (const tutor of otherApplicants) {
            await axiosSecure.patch(`/applications/reject/${tutor._id}`, {
              applicationStatus: "Rejected",
            });
          }

          await handlePayment(app);
        } catch (error) {
          Swal.fire("Error", "Failed to process.", "error");
          console.error(error);
          setClickedAppId(null);
        }
      } else {
        setClickedAppId(null);
      }
    });
  };

  const handleRejectApplicant = (app) => {
    Swal.fire({
      title: "Reject this Tutor?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Reject",
    }).then((result) => {
      if (result.isConfirmed) {

        axiosSecure.patch(`/applications/reject/${app._id}`)
        Swal.fire({
          title: "Rejected!",
          text: "This Tutor has been Rejected",
          icon: "success",
        });
        refetch();
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead className="">
          <tr>
            <th>#</th>
            <th>Subject</th>
            <th>Tutor</th>
            <th>Experience</th>
            <th>Salary</th>
            <th>Applied On</th>
            <th className="text-center">Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {myTutors.map((app, index) => (
            <tr key={app._id} className="hover:bg-white/10"
            // onClick={() => navigate(`/tutors/${app.tutorEmail}`)}
            >
              <th className="text-gray-400">{index + 1}</th>
              <td className="font-medium">{app.tuitionSubject}</td>
              <td>
                <div>
                  <p className="font-bold">{app.tutorName}</p>
                  <p className="text-sm text-gray-400">{app.tutorEmail}</p>
                </div>
              </td>
              <td className="text-center">{app.tutorExperience}</td>
              <td className="text-center">{app.tutorSalary}</td>
              <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
              <td className="text-center">
                <span
                  className={`font-medium ${app.applicationStatus === "Approved"
                    ? "text-green-500"
                    : app.applicationStatus === "Rejected"
                      ? "text-red-500"
                      : "text-yellow-500"
                    }`}
                >
                  {app.applicationStatus}
                </span>
              </td>

              <td className="flex justify-center items-center text-center mx-auto mt-1">
                <button
                  onClick={() => handleAcceptApplicant(app)}
                  className="btn btn-xs h-7 btn-neutral bg-teal-500 hover:bg-teal-600 text-black/80"
                >
                  {clickedAppId === app._id ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <TiTick className="w-4 scale-180" />
                  )}
                </button>

                <button
                  onClick={() => handleRejectApplicant(app)}
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

export default Applicants;
