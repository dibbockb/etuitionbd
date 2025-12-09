import React from 'react';

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm flex justify-between">

                <div className="navbar-start">
                    <div className="btn btn-ghost ">
                        <img className="w-10 h-10" src="/icon.png" alt="" />
                        <a className="text-xl">eTuition</a>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-5">
                        <a href="">Services</a>
                        <a href="">Services</a>
                        <a href="">Services</a>
                        <a href="">Services</a>
                    </ul>
                </div>

                <div className="navbar-end gap-2">
                    <a className="btn px-1.5 ">Login</a>
                    <a className="btn px-1.5 ">Register</a>
                </div>

            </div>
        </div>
    );
};

export default Navbar;