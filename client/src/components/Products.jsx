import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import Product from './Product';
import "../styles/Products.css";
import { Spin } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { getProductsFailure, getProductsStart, getProductsSuccess } from '../redux/products/productsSlice';
import GoToTop from './GoToTop';
import axiosInstance from '../api/axios';

const Products = () => {

    const [products, setProducts] = useState([]);
    // const [personalCareProducts, setPersonalCareProducts] = useState([]);
    
    const [diabetesCareProducts, setDiabetesCareProducts] = useState([]);
    const [skinCareProducts, setSkinCareProducts] = useState([]);
    const [painReliefProducts, setPainReliefProducts] = useState([]);
    const [adultNutritionProducts, setAdultNutritionProducts] = useState([]);
    const [summerEssentialProducts, setSummerEssentialProducts] = useState([]);
    const [nasalSprayProducts, setNasalSprayProducts] = useState([]);
    const [mobilityAidsProducts, setMobilityAidsProducts] = useState([]);

    const trendingNowRef = useRef(null);
    const diabetesRef = useRef(null);
    const skincareRef = useRef(null);
    const painReliefRef = useRef(null);
    const adultNutritionRef = useRef(null);
    const summerEssentialRef = useRef(null);
    const nasalsprayRef = useRef(null);
    const mobilityAidsRef = useRef(null);

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.StProducts);

    useEffect(() => {
        const getProducts = async () => {
            try {
                dispatch(getProductsStart());
                const res = await axiosInstance.get(`/api/product/get?rating=4.3`);
                dispatch(getProductsSuccess());
                setProducts(res.data.filteredProducts);
                // console.log(products);

            } catch (error) {
                dispatch(getProductsFailure(error.message));
                console.log(error);
            }
        };

        const getDiabetesCareProducts = async () => {
          try {
            const res = await axiosInstance.get(`/api/product/get?category=diabetes-Care`);
            setDiabetesCareProducts(res.data.filteredProducts);
          } catch (error) {
            console.log(error);
          }
        }

        const getSkinCareProducts = async () => {
          try {
            const res = await axiosInstance.get(`/api/product/get?category=skin-Care`);
            setSkinCareProducts(res.data.filteredProducts);
          } catch (error) {
            console.log(error);
          }
        }

        const getPainReliefProducts = async () => {
          try {
            const res = await axiosInstance.get(`/api/product/get?category=painRelief-cough-cold`);
            setPainReliefProducts(res.data.filteredProducts);
          } catch (error) {
            console.log(error);
          }
        }

        const getAdultNutritionProducts = async () => {
          try {
            const res = await axiosInstance.get(`/api/product/get?category=adult-nutrition`);
            setAdultNutritionProducts(res.data.filteredProducts);
          } catch (error) {
            console.log(error);
          }
        }

        const getSummerEssentialProducts = async () => {
          try {
            const res = await axiosInstance.get(`/api/product/get?category=summer-essential`);
            setSummerEssentialProducts(res.data.filteredProducts);
          } catch (error) {
            console.log(error);
          }
        }

        const getNasalSprayProducts = async() => {
          try {
            const res = await axiosInstance.get(`/api/product/get?category=nasal-spray`);
            setNasalSprayProducts(res.data.filteredProducts)
          } catch (error) {
            console.log(error);
          }
        }

        const getMobilityAidsProducts = async () => {
          try {
            const res = await axiosInstance.get(`/api/product/get?category=mobility-aids`);
            setMobilityAidsProducts(res.data.filteredProducts);
          } catch (error) {
            console.log(error);
          }
        }

        getProducts();
        // getPersonalCareProducts();
        getDiabetesCareProducts();
        getSkinCareProducts();
        getPainReliefProducts();
        getAdultNutritionProducts();
        getSummerEssentialProducts();
        getNasalSprayProducts();
        getMobilityAidsProducts();

    }, []);

    const handleScroll = (refName, scrollOffset) => {
      refName.current.scrollLeft += scrollOffset;
      // console.log(refName.current.scrollLeft);
    };

  return (
    <>
    <section className='products-section'>
        { loading ? <Spin className='spin-loader' indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}/> : 
        <>
        <h3 className='products-heading'>Trending now</h3>
        <div className='products-outer-main-container'>
         <div style={{display: "flex"}} className='products-outer-container products-scroll-container' ref={trendingNowRef}>
          {products.map((product) => (
            <div>
                <Product productkey={product._id} productid={product._id} imagesrc = {product.imagesrc} name = {product.name} price = {product.price} rating={product.rating} />
            </div>
          ))}
          
        </div>
        <button className="scroll-button left" onClick={() => handleScroll(trendingNowRef, -100)}><i class="fa-solid fa-arrow-left" style={{ color: "#e3861c;"}}></i></button>
        <button className="scroll-button right" onClick={() => handleScroll(trendingNowRef, 100)}><i class="fa-solid fa-arrow-right" style={{ color: "#657bd2;"}}></i></button>
      </div>

      <h3 className='products-heading'>Diabetes Care</h3>
        <div className='products-outer-main-container'>
         <div style={{display: "flex"}} className='products-outer-container products-scroll-container' ref={diabetesRef}>
          {diabetesCareProducts.map((product) => (
            <div>
                <Product productkey={product._id} productid={product._id} imagesrc = {product.imagesrc} name = {product.name} price = {product.price} rating={product.rating} />
            </div>
          ))}
          
        </div>
        <button className="scroll-button left" onClick={() => handleScroll(diabetesRef, -100)}><i class="fa-solid fa-arrow-left" style={{ color: "#e3861c;"}}></i></button>
        <button className="scroll-button right" onClick={() => handleScroll(diabetesRef, 100)}><i class="fa-solid fa-arrow-right" style={{ color: "#657bd2;"}}></i></button>
      </div>
      

        <h3 className='products-heading'>Skin Care</h3>
        <div className='products-outer-main-container'>
        <div style={{display: "flex"}} className='products-outer-container products-scroll-container' ref={skincareRef}>
          {skinCareProducts.map((product) => (
            <div>
                <Product productkey={product._id} productid ={product._id} imagesrc = {product.imagesrc} name = {product.name} price = {product.price} rating={product.rating}  />
            </div>
          ))}
          
        </div>
        <button className="scroll-button left" onClick={() => handleScroll(skincareRef,-100)}><i class="fa-solid fa-arrow-left" style={{ color: "#657bd2;"}}></i></button>
          <button className="scroll-button right" onClick={() => handleScroll(skincareRef,100)}><i class="fa-solid fa-arrow-right" style={{ color: "#657bd2;"}}></i></button>
        </div>


        <h3 className='products-heading'>Pain Relief</h3>
        <div className='products-outer-main-container'>
        <div style={{display: "flex"}} className='products-outer-container products-scroll-container' ref={painReliefRef}>
          {painReliefProducts.map((product) => (
            <div>
                <Product productkey={product._id} productid ={product._id} imagesrc = {product.imagesrc} name = {product.name} price = {product.price} rating={product.rating}  />
            </div>
          ))}
          
        </div>
        <button className="scroll-button left" onClick={() => handleScroll(painReliefRef,-100)}><i class="fa-solid fa-arrow-left" style={{ color: "#657bd2;"}}></i></button>
          <button className="scroll-button right" onClick={() => handleScroll(painReliefRef,100)}><i class="fa-solid fa-arrow-right" style={{ color: "#657bd2;"}}></i></button>
        </div>


        <h3 className='products-heading'>Adult Nutrition</h3>
        <div className='products-outer-main-container'>
        <div style={{display: "flex"}} className='products-outer-container products-scroll-container' ref={adultNutritionRef}>
          {adultNutritionProducts.map((product) => (
            <div>
                <Product productkey={product._id} productid ={product._id} imagesrc = {product.imagesrc} name = {product.name} price = {product.price} rating={product.rating}  />
            </div>
          ))}
          
        </div>
        <button className="scroll-button left" onClick={() => handleScroll(adultNutritionRef,-100)}><i class="fa-solid fa-arrow-left" style={{ color: "#657bd2;"}}></i></button>
          <button className="scroll-button right" onClick={() => handleScroll(adultNutritionRef,100)}><i class="fa-solid fa-arrow-right" style={{ color: "#657bd2;"}}></i></button>
        </div>



        <h3 className='products-heading'>Summer Essential</h3>
        <div className='products-outer-main-container'>
        <div style={{display: "flex"}} className='products-outer-container products-scroll-container' ref={summerEssentialRef}>
          {summerEssentialProducts.map((product) => (
            <div>
                <Product productkey={product._id} productid ={product._id} imagesrc = {product.imagesrc} name = {product.name} price = {product.price} rating={product.rating}  />
            </div>
          ))}
          
        </div>
        <button className="scroll-button left" onClick={() => handleScroll(summerEssentialRef,-100)}><i class="fa-solid fa-arrow-left" style={{ color: "#657bd2;"}}></i></button>
          <button className="scroll-button right" onClick={() => handleScroll(summerEssentialRef,100)}><i class="fa-solid fa-arrow-right" style={{ color: "#657bd2;"}}></i></button>
        </div>


        <h3 className='products-heading'>Nasal Spray</h3>
        <div className='products-outer-main-container'>
        <div style={{display: "flex"}} className='products-outer-container products-scroll-container' ref={nasalsprayRef}>
          {nasalSprayProducts.map((product) => (
            <div>
                <Product productkey={product._id} productid ={product._id} imagesrc = {product.imagesrc} name = {product.name} price = {product.price} rating={product.rating}  />
            </div>
          ))}
          
        </div>
        <button className="scroll-button left" onClick={() => handleScroll(nasalsprayRef,-100)}><i class="fa-solid fa-arrow-left" style={{ color: "#657bd2;"}}></i></button>
          <button className="scroll-button right" onClick={() => handleScroll(nasalsprayRef,100)}><i class="fa-solid fa-arrow-right" style={{ color: "#657bd2;"}}></i></button>
        </div>


        <h3 className='products-heading'>Mobility Aids</h3>
        <div className='products-outer-main-container'>
        <div style={{display: "flex"}} className='products-outer-container products-scroll-container' ref={mobilityAidsRef}>
          {mobilityAidsProducts.map((product) => (
            <div>
                <Product productkey={product._id} productid ={product._id} imagesrc = {product.imagesrc} name = {product.name} price = {product.price} rating={product.rating}  />
            </div>
          ))}
          
        </div>
        <button className="scroll-button left" onClick={() => handleScroll(mobilityAidsRef,-100)}><i class="fa-solid fa-arrow-left" style={{ color: "#657bd2;"}}></i></button>
          <button className="scroll-button right" onClick={() => handleScroll(mobilityAidsRef,100)}><i class="fa-solid fa-arrow-right" style={{ color: "#657bd2;"}}></i></button>
        </div>
        </>
         }
        
    </section>
    <GoToTop />
    </>
  )
}

export default Products
