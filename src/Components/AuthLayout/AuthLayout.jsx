import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../Logo/Logo';

const AuthLayout = () => {
    return (
        <div>
            <div className=''>

                <div className='flex flex-col justify-center items-center pt-30'>
                    <Logo></Logo>
                    <br />
                    <Outlet></Outlet>
                </div>

            </div>
        </div>
    );
};

export default AuthLayout;