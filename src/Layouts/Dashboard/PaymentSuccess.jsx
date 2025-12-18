import React, { useEffect } from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { Link, useSearchParams } from 'react-router';
import { NavLink } from 'react-router';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const axiosSecure = useAxiosSecure()
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');


    useEffect(() => {
      if (sessionId) {
        axiosSecure.post(`/payment-success`, {session_id: sessionId})
      }
    
    }, [sessionId, axiosSecure])
    
    

    return (
        <div className="mx-auto text-center pt-50">
            <p className="text-green-500 text-2xl">Payment Successfull!</p>

            <Link
            to="/dashboard/my-tuitions"
            className="btn btn-ghost btn-lg text-lg flex-1 justify-center mt-5">
             My Tuitions <MdOutlineArrowForwardIos />
           </Link>
        </div>
    );
};

export default PaymentSuccess;