import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loading from '../Loading/Loading';

const Tutors = () => {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/tutors')
            .then(res => {
                setTutors(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [axiosSecure]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
            {tutors.map(tutor => (
                <div key={tutor._id} className="card bg-white shadow-xl hover:shadow-2xl transition">
                    <figure className="h-64">
                        <img src={tutor.photo} alt={tutor.tutorName} className="w-full h-full object-cover" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{tutor.tutorName}</h2>
                        <p className="text-teal-600 font-medium">{tutor.subject}</p>
                        <div className="flex items-center gap-2 my-2">
                            <span className="text-yellow-500">★★★★★</span>
                            <span className="font-bold">{tutor.rating}</span>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-2xl font-bold">৳{tutor.price.toLocaleString()}</span>
                            <span className="badge badge-accent">{tutor.mode}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Tutors;