import React from 'react';
import { Form, Input, message, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { logInStart, logInFailure, logInSuccess } from '../../redux/user/userSlice';
import { LoadingOutlined } from '@ant-design/icons';
import "./Login.css";
import Header from '../../components/Header';
import Header2 from "../../components/Header2";
import axiosInstance from '../../api/axios';

const Login = () => {

  const navigate = useNavigate();

  const { loading, error, currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogin = async(values) => {
    try {
      dispatch(logInStart());
      const res = await axiosInstance.post("/api/user/login", values);

      if(res.data.success){
        // Storing token in localStorage
        localStorage.setItem("jwtToken", res.data.token);
        dispatch(logInSuccess(res.data));
        message.success("Login Successfully");
        navigate("/");
      } else {
        dispatch(logInFailure(res.data.message));
        message.error(res.data.message);
      }

    } catch (error) {
      dispatch(logInFailure(error.message));
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  return (
    <>
      {/* <Header /> */}
      <Header2 />
      <div className="main-form-outer-container">
      <div className="main-form-container">
        {loading ? (
          <Spin
            className="spin-loader"
            indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
          />
        ) : (
          <>
            <h4 className="text-center">Login</h4>
            <div className="form-container">
              <Form
                layout="vertical"
                onFinish={handleLogin}
                className="loginForm"
              >
                <Form.Item label="Email" name="email">
                  <Input type="email" required />
                </Form.Item>

                <Form.Item label="Password" name="password">
                  <Input type="password" required />
                </Form.Item>

                <button className="btn btn-primary" type="submit">
                  Login
                </button>

                <Link to={"/register"} className="m-2 loginForm-notuser-link">
                  Not a user Register here
                </Link>

                
              </Form>
            </div>
          </>
        )}
      </div>
      </div>
      
    </>
  );
}

export default Login
