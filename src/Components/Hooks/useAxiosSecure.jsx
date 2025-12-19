import React, { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
    baseURL: `https://etuition-server.vercel.app`,
});

const useAxiosSecure = () => {
    const { user } = useAuth();
    // console.log(user);

    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(async config => {
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

            return config
        })

        const resInterceptor = axiosSecure.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const statusCode = error.response?.status;

                if (statusCode === 401 || statusCode === 403) {
                    // await logOut();
                    // navigate('/login');
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [user]);

    return axiosSecure;
};

export default useAxiosSecure;
