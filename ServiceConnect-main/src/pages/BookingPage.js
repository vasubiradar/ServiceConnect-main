import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookingPage.css';
import Header from '../components/Header';

const BookingPage = () => {
  const { id } = useParams();
  const [subcategory, setSubcategory] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchSubcategoryDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/SubCategory/subcategories/${id}`);
        setSubcategory(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subcategory details:', error.message);
        setError('Error fetching subcategory details. Please try again.');
        setLoading(false);
      }
    };

    fetchSubcategoryDetails();
  }, [id]);

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  const generateTimeOptions = () => {
    const timeSlots = [];

    for (let hour = 7; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
          const formattedHour = hour > 12 ? hour - 12 : hour;
          const amPm = hour >= 12 ? 'pm' : 'am';
          const formattedMinute = minute === 0 ? '00' : `${minute}`;
          const timeOption = `${formattedHour}:${formattedMinute} ${amPm}`;

        timeSlots.push(
          <option key={timeOption} value={timeOption}>
            {timeOption}
          </option>
        );
      }
    }

    return timeSlots;
  };

  const handleRazor = async (e) => {
    e.preventDefault();

    const customerId = parseInt(localStorage.getItem('userid'));

    await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (totalPrice === 0) {
      alert("Please enter amount");
    } else {
      var options = {
        key: "rzp_test_JuJL4MhnOk5qLW",
        key_secret: "PkIdRFUAwV0P0ELRW77k0x2N",
        amount: totalPrice * 100,
        currency: "INR",
        name: "Trip Nest",
        description: "For testing purpose",
        handler: function (response) {
          // Payment successful, proceed to post data to the database
          console.log('Payment successful:', response);

          try {
            const bookingResponse = axios.post('http://localhost:8082/Bookings/api/bookings', {
              customerId: customerId,
              categoryId: subcategory.categoryId,
              subcategoryId: subcategory.id,
              address: customerAddress,
              price: totalPrice,
              date: bookingDate,
              time: bookingTime,
              // Add other fields as needed
            });

            console.log('Booking created successfully:', bookingResponse.data);
            // You may want to redirect the user or show a success message here
          } catch (error) {
            console.error('Error creating booking:', error.message);
            // Handle error, show error message, etc.
          }
        },
        prefill: {
          name: "Prithviraj Gorule",
          email: "prithvi.gorule@gmail.com",
          contact: "7098661035",
        },
        notes: {
          address: "Razorpay Corporate office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      if (window.Razorpay) {
        var pay = new window.Razorpay(options);
        pay.open();
      } else {
        console.error('Razorpay is not loaded.');
      }
    }
  };

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    setQuantity(newQuantity > 0 ? newQuantity : 1);
  };

  useEffect(() => {
    // Update total price whenever quantity or subcategory changes
    setTotalPrice(subcategory.price * quantity);
  }, [quantity, subcategory]);

  if (loading) {
    return <p>Loading subcategory details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Header />
      <div className="booking-container">
        <div className="booking-details">
          <div className="subcategory-image">
          <img src={subcategory.url} alt={`Subcategory: ${subcategory.name}`} />

          </div>
          <div className="subcategory-info">
            <h2>{subcategory.name}</h2>
            <p>{subcategory.description}</p>
            <p>Price: Rs {subcategory.price}</p>
            <div className="quantity-selector">
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
            <p>Total Price: Rs {totalPrice}</p>
            <form>
              <label>
                Customer Address:
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                />
              </label>
              <label>
                Customer Phone Number:
                <input
                  type="tel"
                  value={customerPhoneNumber}
                  onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                />
              </label>
              <label>
                Booking Date:
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />
              </label>
              <label>
                Booking Time:
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                >
                  {generateTimeOptions()}
                </select>
              </label>

              <button type="button" onClick={handleRazor}>
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;



