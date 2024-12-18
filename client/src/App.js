import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage.jsx';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import Singleproduct from './pages/singleproduct/Singleproduct.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import Search from './pages/searchProduct/Search.jsx';
import Checkout from './pages/checkout/Checkout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
// import MyOrders from './pages/myorders/MyOrders.jsx';
import MyOrders from "./pages/myorders2/Myorders2.jsx";
import MyCart from './pages/mycart/MyCart.jsx';

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/product/:productId" element={
              <ProtectedRoute>
                <Singleproduct />
              </ProtectedRoute>
            } />
            
            <Route path="/productSearch" element={<Search />}  />
            
            <Route path='/checkout' element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />

            <Route path='/myorders' element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              }
            />

            <Route path='/mycart' element={
              <ProtectedRoute>
                <MyCart />
              </ProtectedRoute>
            } />
            
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
