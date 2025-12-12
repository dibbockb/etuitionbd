import React from 'react';
import useAuth from '../../Components/Hooks/useAuth';

const MyTuitions = () => {

    const currentUserEmail = useAuth().user?.email;
    const myTuitions = [];




    return (
        <div>
            <p>this is my tuitions</p>
        </div>
    );
};

export default MyTuitions;