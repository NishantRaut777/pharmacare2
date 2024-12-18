import React, { useEffect, useState } from "react";
import Header2 from "../../components/Header2";
import Footer2 from "../../components/Footer2";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./Myorders2.css";
import {
  fetchedMyOrders,
  gettingMyOrders,
} from "../../redux/myorders/myordersSlice";
import moment from "moment-timezone";
import axiosInstance from "../../api/axios";

const Myorders2 = () => {
  const [orders, setOrders] = useState([]);
  const { loading, currentUser } = useSelector((state) => state.user);
  const [hasFetchedOrders, setHasFetchedOrders] = useState(false);
  const { loadingMyOrders } = useSelector((state) => state.myOrdersSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMyOrders = async () => {
      dispatch(gettingMyOrders());

      try {
        const res = await axiosInstance.post(`/api/order/getOrders2`, {
          userid: currentUser?._id,
        });
        dispatch(fetchedMyOrders());
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      } finally {
        setHasFetchedOrders(true);
      }
    };

    getMyOrders();
  }, [currentUser?._id]);

  // deleteorders change the data in orders and hence refresh the component
  const handleDeleteOrders = async (date) => {
    try {
      const res = await axiosInstance.post(`/api/order/deleteOrder`, {
        mydate: date,
      });

      setOrders((prevOrders) => {
        const updatedOrders = { ...prevOrders };

        // Remove the orders for the deleted date
        const formattedDate = moment(date)
          .tz("Asia/Kolkata")
          .format("D-MMM-YYYY, h:mm A");

        delete updatedOrders[formattedDate];

        return updatedOrders;
      });

      message.success("Order history record deleted successfully");
    } catch (error) {
      message.error("Something went wrong while deleting order record!");
      console.error("Error deleting order", error);
    }
  };

  return (
    <>
      <Header2 />
      {loadingMyOrders ? (
        <Spin
          className="spin-loader"
          indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
        />
      ) : (
        <div className="my-orders-outer-container">
          <h1>My Orders</h1>
          <div className="my-orders-main-container-1">
            {hasFetchedOrders && Object.keys(orders).length > 0 ? (
              Object.keys(orders).map((key) => (
                <div className="my-orders-inner-container-1" key={key}>
                  <h5>{key}</h5>
                  <div className="my-orders-inner-container-2">
                    {orders[key].map((order, index) => (
                      <div className="my-orders-inner-container-3">
                        <i
                          className="fa-duotone fa-solid fa-trash order-container-delete-icon"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteOrders(order.originalDate)} // Pass the original date
                        ></i>
                        {order.items.map((orderItem, orderItmIndex) => (
                          <div className="my-order-product" key={orderItmIndex}>
                            <div className="my-order-image-left-div">
                              <img src={orderItem?.imagesrc} alt="..." />
                            </div>
                            <div className="my-order-right-div">
                              <div className="order-title">
                                {orderItem?.name}
                              </div>
                              <div>Quantity: {orderItem?.quantity}</div>
                              <div>Price: ₹{orderItem?.price}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div>
                <hr />
                <h4>You dont have any orders</h4>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer2 />
    </>
  );
};

export default Myorders2;
