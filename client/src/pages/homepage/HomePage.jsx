import React from 'react'
import Header from '../../components/Header'
import Products from '../../components/Products'
import Footer from '../../components/Footer'
import Carousel from '../../components/Carousel'
import { useState, useEffect } from 'react'
import Header2 from '../../components/Header2'
import SearchBar from '../../components/SearchBar'
import Footer2 from "../../components/Footer2"

const HomePage = () => {
  // For mobile screen show search bar component seperately
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  return (
    <div>
      {/* <Header /> */}
      <Header2 />
      { isMobile &&  <SearchBar /> }
      
      <Carousel />
      <Products />
      {/* <Footer /> */}
      <Footer2 />
    </div>
  )
}

export default HomePage
