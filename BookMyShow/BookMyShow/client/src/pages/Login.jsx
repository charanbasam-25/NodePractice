import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    const handleFeildChange = (key) => (e) => {
      const value = e.target.value;
      setUserData((prevValues) => ({
        ...prevValues,
        [key]: value,
      }));
    };
  
    const handleLogin = (e) => {
      e.preventDefault(); 
    
      fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json(); 
        })
        .then((data) => {
          console.log(data, "data-----"); 
          navigate("/"); 
        })
        .catch((e) => {
          console.error("Error during registration:", e); 
          window.alert(e.message || "An error occurred while registering.");
        });
    };
    
  


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email1">
              Email
            </label>
            <input
              type="email"
              id="email1"
              name="email12"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
              onChange={handleFeildChange('email')}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password1">
              Password
            </label>
            <input
              type="password"
              name="password12"
              id="password1"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
              onChange={handleFeildChange("password")}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;