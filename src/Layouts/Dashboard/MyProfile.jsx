import React from 'react';
import useAuth from '../../Components/Hooks/useAuth';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaUserEdit } from 'react-icons/fa';
import { HiUserCircle } from 'react-icons/hi2';

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ['my-profile', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });


  const handleEditProfile = (profile) => {
    Swal.fire({
      title: "Edit Profile",
      html: `<input readOnly id="email" class="swal2-input cursor-none text-gray-600" placeholder="Email" value="${profile?.email
        }">
        <input id="name" class="swal2-input" placeholder="Name" value="${profile?.displayName
        }">
        
        <input id="photoURL" class="swal2-input" placeholder="Photo URL" value="${profile.photoURL
        }">
      `,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
        const updatedValues = {
          displayName: document.getElementById("name").value,
          photoURL: document.getElementById("photoURL").value,
        };
        return updatedValues;
      }
    })

      .then((result) => {
        if (result.isConfirmed) {
          const updatedProfile = result.value;
          axiosSecure.patch(`/users/${user.email}`, updatedProfile)
            .then((result) => {
              Swal.fire("Updated!", "Tuition updated successfully.", "success");
            }).catch((err) => {
              Swal.fire("Error", "Failed to update tuition.", "error");

            });
        }
      })

  }



  return (
    <div className="py-12 px-4 flex justify-center items-center">
      <div className="max-w-4xl mx-auto flex justify-center items-center text-center">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 p-10 text-white flex flex-col justify-center items-center text-center">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <img
              src={profile.photoURL || <HiUserCircle />}
              alt={profile.displayName}
              className="w-48 h-48 rounded-full object-cover border-2 border-teal-500 shadow-xl"
            />

            <div className="text-center md:text-left">
              <h1 className="text-5xl font-bold mb-4">{profile.displayName}</h1>
              <p className="text-2xl text-teal-400 mb-2">{profile.email}</p>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="badge bg-teal-400 text-black">
                  {profile.userRole === "tutor" ? "Tutor" : profile.userRole === "admin" ? "Admin" : "Student"}
                </span>

              </div>

              <div className="mt-12 text-center flex ">
                <button
                  onClick={() => { handleEditProfile(profile) }}
                  className="btn btn-neutral mt-4  bg-teal-500 text-black hover:bg-teal-300/50
                
"><FaUserEdit />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default MyProfile;