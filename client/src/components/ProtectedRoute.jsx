import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import axiosInstance from '../api/axios';

const ProtectedRoute = ({ children }) => {

    const dispatch = useDispatch();
    const { loading, error, currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const res = await axiosInstance.post("/api/user/getUserData", 
            {
                token: localStorage.getItem('jwtToken')
            },
            {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('jwtToken')}`  
                }
            }
            );

            if(res.data.success){
                dispatch(setUser(res.data.data));
            } else {
                navigate("/login");
                localStorage.clear();
            }

        } catch (error) {
            localStorage.clear();
            console.log(error);
        }
    };

    useEffect(() => {
        if(!currentUser){
            getUser();
        }
    }, [currentUser, getUser]);

    if(localStorage.getItem("jwtToken")){
        return children;
    } else {
        return navigate("/login");
    }
}

export default ProtectedRoute
