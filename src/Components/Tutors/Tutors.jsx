import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loading from "../Loading/Loading";
import { IoPersonAdd } from "react-icons/io5";
import { Link } from "react-router";

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setLoading(true)
    axiosSecure
      .get("/tutors")
      .then((res) => {
        setTutors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return <Loading />;
  }



  return (
    <>
      <div className="flex justify-center items-center text-center flex-col">
        <h3 className="text-4xl text-white text-center pt-15">All Tutors</h3>
      <Link 
      className="btn btn-ghost w-[20rem] h-20 mt-5 rounded-2xl bg-gray-900 text-2xl hover:scale-103"
    to={'/dashboard/newtutor'}>
        <IoPersonAdd className="scale-105 mr-2" /> Become a Tutor!</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8 pb-20">
        {tutors.map((tutor) => (
          <div
            key={tutor._id}
            className="card bg-gray-800 shadow rounded-xl hover:scale-103 transition"
          >
            <div className="h-64 rounded-2xl">
              <img
                src={tutor.photo}
                alt={tutor.tutorName}
                className="w-full h-full object-cover rounded-t-xl"/>
            </div>
            <div className="card-body">

              <div className="flex items-center gap-2 my-2">
                <h2 className="text-2xl text-white">{tutor.tutorName}</h2>
                <span className="text-yellow-500">★</span>
                <span className="text-white ml-[-5px]">{tutor.rating}</span>
              </div>

              <p className="text-white font-medium">{tutor.subject}</p>
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold">
                  ৳ {tutor.price.toLocaleString()}
                </span>
                <span className="badge badge-accent">{tutor.mode}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tutors;
