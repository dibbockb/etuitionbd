import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loading from "../Loading/Loading";
import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router";

const Tuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;


  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/tuitions?page=${currentPage}&limit=${limit}`)
      .then((res) => {
        setTuitions(res.data.tuitions);
        setTotalPages(res.data.totalPages || Math.ceil(res.data.totalCount / limit));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [currentPage, axiosSecure]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <div className="flex justify-center items-center text-center flex-col">
          <h3 className="text-4xl text-white text-center pt-15">
            All Tuitions
          </h3>

          <Link
            className="btn w-[20rem] h-20 mt-5 rounded-4xl text-2xl hover:scale-103  btn-neutral bg-teal-500 text-black hover:bg-teal-300/50"
            to={"/dashboard/new-tuition"}
          >
            <IoMdAdd className="scale-120" /> Post a Tuition
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
          {tuitions.map((tuition) => (
            <div
              key={tuition._id}
              onClick={() => {
                navigate(`/tuitions/${tuition._id}`);
              }}
              className="card bg-gray-800 shadow rounded-xl hover:scale-103 transition duration-300"
            >
              <div className="h-64 rounded-t-xl overflow-hidden">
                <img
                  src={tuition.image}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="card-body p-5">
                <p className="text-white font-medium text-xl">
                  {tuition.subject}
                </p>
                <p className="text-white text-sm">{tuition.location}</p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-bold text-white">
                    ৳ {tuition.fee}
                  </span>
                  <span className="badge badge-accent badge-sm">
                    {tuition.mode}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tuitions;
