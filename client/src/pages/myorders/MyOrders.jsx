import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import "./MyOrders.css";
import { fetchedMyOrders, gettingMyOrders } from '../../redux/myorders/myordersSlice';
import Header2 from '../../components/Header2'
import Footer2 from "../../components/Footer2";
import axiosInstance from '../../api/axios';

const MyOrders = () => {

    const [orders, setOrders] = useState([]);
    const { loading, currentUser } = useSelector((state) => state.user);
    const [hasFetchedOrders, setHasFetchedOrders] = useState(false);
    const {  loadingMyOrders } = useSelector((state) => state.myOrdersSlice);
    const [isBottomFooter, setIsBottomFooter] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const getMyOrders = async() =>{
            dispatch(gettingMyOrders())

            try {
                const res = await axiosInstance.post(`/api/order/getOrders2`,{
                    userid: currentUser?._id
                });
                dispatch(fetchedMyOrders());
                setOrders(res.data);
                
                // If there is no order data apply bottom footer css
                if(Object.keys(res.data).length === 0){
                    setIsBottomFooter(true);
                }

            } catch (error) {
                console.error("Error fetching orders", error);
            } finally {
                setHasFetchedOrders(true);
            } 
        }
        
        getMyOrders();
    }, [currentUser?._id]);

  return (
    <>
        {/* <Header /> */}
        <Header2 />
        {
            loadingMyOrders ? (
                <Spin
            className="spin-loader"
            indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
          />
            ) :
            (
                <>
                <div className='orders-main-container'>
                <h3>Your Orders</h3>
                
                    {
                    hasFetchedOrders && Object.keys(orders).length > 0 ? (
                        Object.keys(orders).map( (key) => (
                        <div className='orders-individual-container'>
                            <h5>{key}</h5>
                            <div className='orders-indi-inner-container'>{
                            orders[key].map((order) => (
                                <div className='orders-indi-inner-container-imgDiv'>
                                    <img src={order.imagesrc} alt="" />
                                    <h6 className='order-name'>{order.name}</h6>
                                    <span>Qty: {order?.quantity}</span>
                                    <h6 className="">&#8377; {order?.price * order?.quantity}</h6>
                                </div>    
                            ))
                            }
                            </div>
                        </div>
                        ))
                    ) : 
                    <div>
                    <hr />
                    <h4>You dont have any orders</h4>
                    </div>
                    }
                </div>
                </>
            )
        }

        {/* <Footer isBottom={isBottomFooter}/> */}
        <Footer2 isBottom={true}/>
        
    </>
    
  )
}

export default MyOrders
