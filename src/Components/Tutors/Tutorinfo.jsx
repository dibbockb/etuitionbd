// src/Components/Tutors/TutorInfo.jsx
import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loading from "../Loading/Loading";

const TutorInfo = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: tutor, isLoading } = useQuery({
    queryKey: ["tutor", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutors/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (!tutor) return <div className="text-center py-32 text-3xl text-white">Tutor not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
        {/* Left: Photo + Name */}
        <div className="text-center">
          <img
            src={tutor.photoURL || "https://i.ibb.co/4pZ7vYf/elena.jpg"}
            alt={tutor.displayName}
            className="w-80 h-80 object-cover rounded-full mx-auto shadow-2xl border-2 border-white"
          />
          <h1 className="text-5xl font-bold text-white mt-8">{tutor.displayName}</h1>
          <p className="text-gray-400 text-2xl mt-2">{tutor.email || "Private Tutor"}</p>
          <div className=" gap-2 mt-4 flex justify-center items-center">
            <span className="text-yellow-400 text-3xl">★★★★★</span>
            <span className="text-white text-xl flex justify-center items-center gap-2">4.9 <span className="text-gray-400">(87 reviews)</span></span>
          </div>
        </div>

        {/* Right: Details */}
        <div className="md:col-span-2 space-y-8 text-white">
          <div className="bg-gray-800 p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-400">About Me</h2>
            <p className="text-lg leading-relaxed">
              {tutor.bio || "Experienced and passionate tutor helping students achieve their goals in SSC, HSC, and admission exams."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl">
              <p className="text-gray-400">Teaching Since</p>
              <p className="text-2xl font-bold">2018</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <p className="text-gray-400">Students Taught</p>
              <p className="text-2xl font-bold">200+</p>
            </div>
          </div>

          <div className="text-center bg-gray-800 p-10 rounded-2xl">
            <p className="text-5xl font-bold">৳{tutor.salary || 12000}/month</p>
            <div className="mt-6  text-white rounded-4xl text-2xl">
              Expected Salary
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorInfo;