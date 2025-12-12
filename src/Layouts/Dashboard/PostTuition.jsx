import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAuth from '../../Components/Hooks/useAuth';

const PostTuition = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNewTuition = async (data) => {
    const newTuition = {
      creatorEmail: user.email,
      subject: data.subject,
      location: data.location,
      mode: data.mode,
      fee: Number(data.fee),
    };

    try {
      await axiosSecure.post('/newtuition', newTuition);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Tuition has been submitted!",
        showConfirmButton: false,
        timer: 2000
      });
      navigate("/dashboard/my-tuitions");
    } catch (err) {
      Swal.fire("Error", "Failed to submit tuition", "error");
    }
  };

  return (
    <div className="min-h-screen rounded-4xl bg-[#101828] py-12 px-4">
      <h3 className="text-5xl font-bold text-white text-center mb-12">Add Tuition</h3>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(handleNewTuition)} className="">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10">
            <div className="mb-8">
              <label className="block text-white text-lg mb-3">Email</label>
              <input
                type="text"
                value={user?.email || ''}
                readOnly
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-gray-400  hover:cursor-not-allowed"
              />
            </div>

            <div className="mb-8">
              <label className="block text-white text-lg mb-3">Subject</label>
              <input
                {...register('subject', { required: true })}
                type="text"
                placeholder="Physics, ICT, English"
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {errors.subject && <p className="text-red">Subject is required</p>}
            </div>

            <div className="mb-8">
              <label className="block text-white text-lg mb-4">Teaching Mode</label>
              <div className="flex gap-12 ">
                <label className="flex items-center gap-3 ">
                  <input type="radio" {...register('mode')} value="offline" defaultChecked className="radio " />
                  <span className="text-white text-xl">Offline</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" {...register('mode')} value="online" className="radio" />
                  <span className="text-white text-xl">Online</span>
                </label>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-white text-lg mb-3">Location</label>
              <input
                {...register('location')}
                type="text"
                placeholder="Where?"
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="mb-10">
              <label className="block text-white text-lg mb-3"> Budget</label>
              <input
                {...register('fee', { required: true })}
                type="number"
                placeholder="Budget"
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {errors.fee && <p className="text-red mt-2">Budget is required</p>}
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-[#00bba7] text-black text-2xl rounded-2xl transform hover:scale-105 transition duration-100"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostTuition;