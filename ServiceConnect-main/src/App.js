// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ContactUs from './pages/ContactUs';
import Services from './pages/Services';
import Subcategories from './pages/Subcategories';  // Import Subcategories
import BookingPage from './pages/BookingPage';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import Cart from './pages/Cart';



const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Services" element={<Services />} />
          {/* Add the new route for Subcategories */}
          <Route path="/subcategories/:id" element={<Subcategories />} />
          <Route path="/booking/:id"  element={<BookingPage/>}/>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/signin"
            element={<Signin />}
          />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
         
        </Routes>
      </div>
    </Router>
  );
};

export default App;
