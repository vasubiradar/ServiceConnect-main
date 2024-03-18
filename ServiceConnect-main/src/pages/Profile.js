import React, { useState, useEffect } from "react";
import UserService from "./UserService";
import Header from "../components/Header";
import axios from 'axios';
import "./Profile.css";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userBookings, setUserBookings] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userid"));
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoryid, setSubcategorId] = useState([]);


  useEffect(() => {
    if (userId) {
      UserService.getUserById(userId)
        .then((response) => {
          const userData = response.data;
          setEmail(userData.email);
          setRole(userData.role);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });

      // Fetch user bookings only if the role is "user"
      if (role.toLowerCase() === "user") {
        axios.get("http://localhost:8082/Bookings/api/bookings")
          .then((response) => {
            // Filter bookings based on matching customerid
            const filteredBookings = response.data.filter((booking) => {
              setSubcategorId(booking.subcategoryId); // set subcategoryId
              return booking.customerId === parseInt(userId);
            });
            setUserBookings(filteredBookings);
          })
          .catch((error) => {
            console.error("Error fetching user bookings:", error);
          });
      }
    }
  }, [userId, role]);

  useEffect(() => {
    const fetchSubcategoryDetails = async () => {
      try {
        // Fetch subcategory details for each booking
        const subcategoryPromises = userBookings.map(async (booking) => {
          const response = await axios.get(`http://localhost:8082/SubCategory/subcategories/${booking.subcategoryId}`);
          return response.data;
        });

        const subcategoryDetails = await Promise.all(subcategoryPromises);
        setSubcategories(subcategoryDetails);
      } catch (error) {
        console.error('Error fetching subcategory details:', error.message);
      }
    };

    fetchSubcategoryDetails();
  }, [userBookings]);


  const handleLog = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.setItem("isAuthenticated", "false");
      window.location.href = "/";
    }
  };

  return (
    <div>
      <Header />
      <div className="profile-container">
        <div className="profile-icon">👤</div>
        <div className="profile-heading">Profile</div>
        <div id="profile-role" className="profile">
          Role: {role}
        </div>
        <div id="profile-email" className="profile">
          Email: {email}
        </div>

        <button className="logout-button" onClick={handleLog}>
          Logout
        </button>
      </div>

      {role.toLowerCase() === "user" && (
        <div className="profile-bookings">
          <h3>My Bookings</h3>
          {userBookings.length > 0 ? (
            <ul>
             {userBookings.map((booking, index) => (
  <li key={booking.id}>
    <div>
      {/* Display other booking details as needed */}
      <p>Booking ID: {booking.id}</p>
      <p>Price: Rs {booking.price}</p>
      <p>Address: {booking.address}</p>
      <p>Date: {booking.date}</p>
      <p>Time: {booking.time}</p>
      {/* Display subcategory details */}
      <p>Subcategory ID: {booking.subcategoryId}</p>
      <p>Subcategory Name: {subcategories[index]?.name}</p>
      <p>Description: {subcategories[index]?.description}</p>
      <img src={subcategories[index]?.url}/>
    </div>
  </li>
))}

            </ul>
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;


