import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loading from "../Loading/Loading";
import { IoIosSearch, IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router";

const Tuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

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

  const processedTuitions = [...tuitions]
    .filter((tuition) => {
      const query = searchQuery.toLowerCase();
      return (
        tuition.subject?.toLowerCase().includes(query) ||
        tuition.location?.toLowerCase().includes(query) ||
        tuition.class?.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === "budget-high") return b.fee - a.fee;
      if (sortBy === "budget-low") return a.fee - b.fee;
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

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

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl mt-8 px-4 mx-auto justify-center items-center">
          <div className="relative flex-1 group max-w-sm">
            <IoIosSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl" />
            <input
              type="text"
              placeholder="Search Class, Subject, Location..."
              className="w-full bg-gray-800 text-white pl-12 pr-4 py-4 rounded-2xl border border-gray-700 focus:border-teal-500 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="bg-gray-800 text-white px-6 py-4 rounded-2xl border border-gray-700 outline-none focus:border-teal-500 cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Latest </option>
            <option value="budget-high">Budget: Higher to Lower</option>
            <option value="budget-low">Budget: Lower to Higher</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
          {processedTuitions.length > 0 ? (
            processedTuitions.map((tuition) => (
              <div
                key={tuition._id}
                onClick={() => navigate(`/tuitions/${tuition._id}`)}
                className="card bg-gray-800 shadow rounded-xl hover:scale-103 transition duration-300 cursor-pointer"
              >
                <div className="h-64 rounded-t-xl overflow-hidden">
                  <img src={tuition.image} className="w-full h-full object-cover" />
                </div>
                <div className="card-body p-5">
                  <p className="text-white font-medium text-xl">{tuition.subject}</p>
                  <p className="text-gray-400 text-sm">{tuition.location}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-white">৳ {tuition.fee}</span>
                    <span className="badge badge-accent badge-sm">{tuition.mode}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-500 text-xl">No tuitions match that location on this page.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Tuitions;
