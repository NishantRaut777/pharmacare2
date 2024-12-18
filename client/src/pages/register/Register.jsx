import React from 'react';
import { Form, Input, message , Spin} from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import "./Register.css";
import { registerFailure, registerStart, registerSuccess } from '../../redux/user/userSlice';
import Header from '../../components/Header';
import Header2 from "../../components/Header2";
import axiosInstance from '../../api/axios';

const Register = () => {

    const navigate = useNavigate();

    const { loading, error, currentUser } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const onFinishHandler = async (values) => {
        try {
            dispatch(registerStart());
            const res = await axiosInstance.post("/api/user/Register", values);

            if(res.data.success === true){
                dispatch(registerSuccess());
                message.success("Registered Successfully");
                navigate("/login");
            } else {
                dispatch(registerFailure(res.data.message));
                message.error(res.data.message);
            }

            // console.log(values);

            
        } catch (error) {
            console.log(error);
            message.error("Something went wrong");
        }
    };

  return (
    <>
      {/* <Header /> */}
      <Header2 />
      <div className='main-form-outer-container'>
        <div className="main-form-container">
        {loading ? (
          <Spin
            className="spin-loader"
            indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
          />
        ) : (
          <>
            <h4 className="text-center">Register</h4>
            <div className="register-form-container">
              <Form
                layout="vertical"
                onFinish={onFinishHandler}
                className="registerForm"
              >
                
                <Form.Item label="Name" name="name">
                  <Input type="text" required />
                </Form.Item>

                <Form.Item label="Email" name="email">
                  <Input type="email" required />
                </Form.Item>

                <Form.Item label="Password" name="password">
                  <Input type="password" required />
                </Form.Item>

                <button className="btn btn-primary" type="submit">
                  Register
                </button>

                <Link to={"/login"} className="m-2 registerForm-notuserlink">
                  Already user login here
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

export default Register
