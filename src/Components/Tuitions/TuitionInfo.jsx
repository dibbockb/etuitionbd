import React from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";

const TuitionInfo = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const {
    data: tuition,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tuition", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions/${id}`);
      return res.data;
    },
  });

  if (isLoading || usersLoading) return <Loading />;
  if (error || !tuition) {
    navigate("/tuitionnotfound");
    return null;
  }

  const toUSD = (tuition.fee / 125).toFixed(2);
  const currentDBUser = users.find((u) => u.email === user?.email);
  const isCreator = user?.email === tuition?.creatorEmail;
  const isTutor = currentDBUser?.userRole === "tutor";

  //edit tuition
  const handleTuitionEdit = () => {
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

  //handle payment
  const handlePayment = async () => {
    const paymentInfo = {
      fee: tuition.fee * 100,
      tuitionId: tuition._id,
      creatorEmail: tuition.creatorEmail,
      subject: tuition.subject,
    }
    const res = await axiosSecure.post(`/checkout`, paymentInfo)

    if (res.data.url) {
      window.location.href = res.data.url;
    }
    else {
      Swal.fire("Error", "Failed to initiate payment.", "error");
    }

  }

  //delete tuition
  const handleDeleteTuition = () => {

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
            navigate('/tuitions');
          })
          .catch(() => {
            Swal.fire("Error", "Failed to delete tuition.", "error");
          });
      }
    });

    //apply as tutor
    const handleApplyasTutor = () => {



    }

  }

  //apply as tutor
  const handleApplyasTutor = async () => {

    const result = await Swal.fire( 
      {
        title: "Apply for this Tuition",
        html:
          `<input readOnly id="tutorname" class="swal2-input font-medium bg-gray-900 border border-gray-600 text-white" placeholder="name" value="${currentDBUser?.displayName || ""}">
        <input readOnly id="tutoremail" class="swal2-input font-medium bg-gray-900 border border-gray-600 text-white" placeholder="email" value="${user?.email || ""}">
        <input required id="tutorqual" class="swal2-input bg-gray-900 border border-gray-600 text-white" placeholder="Qualification">
        <input required id="tutorexperience" class="swal2-input bg-gray-900 border border-gray-600 text-white" placeholder="Experience">
        <input required id="tutorsalary" type="number" class="swal2-input bg-gray-900 border border-gray-600 text-white" placeholder="Expected Salary" ">`,
        showCancelButton: true,
        confirmButtonText: "Apply",

        preConfirm: () => {
          const tutorQual = document.getElementById("tutorqual").value.trim();
          const tutorExp = document.getElementById("tutorexperience").value.trim();
          const tutorSalaryInput = document.getElementById("tutorsalary").value;

          if (!tutorQual || !tutorExp || !tutorSalaryInput) {
            Swal.showValidationMessage('Please enter all fields');
            return false;
          }

          const application = {
            tuitionId: tuition._id,
            tuitionTitle: tuition.title,
            applicationStatus: 'Pending',
            tutorName: currentDBUser?.displayName || "N/A",
            tutorEmail: user?.email || "N/A",
            tutorQualifications: tutorQual,
            tutorExperience: tutorExp,
            tutorSalary: Number(tutorSalaryInput),
            appliedAt: new Date(),
          };

          return application;
        }
      }
    ); 

    if (result.isConfirmed) {
      try {
        await axiosSecure.post(`/apply`, result.value);
        Swal.fire("Success!", "Your application has been submitted!", "success");
        refetch
      } catch (error) {
        const msg = error.response?.data?.message || "Failed to submit application.";
        Swal.fire("Error", msg, "error");
      }
    }
};


  return (
    <div className="flex justify-center py-10 bg-gray-900">
      <div className="card w-full max-w-4xl shadow-2xl bg-gray-800 text-white border border-gray-700">
        <figure>
          <img
            src={tuition.image}
            alt={tuition.title}
            className="w-full h-96 object-cover"
          />
        </figure>
        <div className="card-body p-8">
          <h2 className="card-title text-6xl font-extrabold mb-2 text-white">
            {tuition.title}
            <div className="text-3xl text-white">{tuition.subject}</div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-gray-400 text-xl">Payment Status</div>
              <div className="text-2xl text-white">
                {tuition.paymentStatus?.charAt(0).toUpperCase() +
                  tuition.paymentStatus?.slice(1)}
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-gray-400 text-xl">Status</div>
              <div className="text-2xl text-white">
                {tuition.approvalStatus || "Pending"}
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-gray-400 text-xl">Location</div>
              <div className="text-2xl">
                {tuition.mode} : {tuition.location}
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-gray-400 text-xl">Fee</div>
              <div className="flex gap-2 items-center">
                <div className="text-green-400 font-bold text-3xl">
                  ৳ {tuition.fee.toLocaleString()}
                </div>
                <div className="text-lg text-gray-400">(${toUSD})</div>
              </div>
            </div>
          </div>

          <div className="card-actions justify-center gap-2 mt-8">
            <button
              onClick={handleTuitionEdit}
              disabled={!isCreator}
              className={`btn btn-lg rounded-l-3xl ${isCreator
                ? "bg-green-600 hover:bg-green-700 text-black"
                : "bg-gray-600 cursor-not-allowed"
                }`}
            >
              Edit Tuition
            </button>


            <button
              onClick={handlePayment}
              className="btn btn-lg rounded bg-green-600 hover:bg-green-700 text-black">
              Pay Now
            </button>

            <button
              onClick={handleApplyasTutor}
              disabled={!isTutor}
              className={`btn btn-lg rounded-r-3xl ${isTutor
                ? "bg-purple-500 hover:bg-purple-700 text-white"
                : "bg-gray-600 cursor-not-allowed"
                }`}
            >
              Apply as Tutor
            </button>

            

            {isCreator && <button
              onClick={handleDeleteTuition}
              disabled={!isCreator}
              className={`btn btn-lg rounded-full ${isCreator
                ? "bg-red-400 hover:bg-red-700 text-black"
                : "bg-gray-600 cursor-not-allowed"
                }`}
            >
              <MdDelete />
            </button>}

          </div>
        </div>
      </div>
    </div>
  );
};

export default TuitionInfo;
