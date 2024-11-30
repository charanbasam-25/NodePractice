import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [isSignedUpUser, setSignedUpUser] = useState(true);


  const handleFeildChange = (key) => (e) => {
    const value = e.target.value;
    setUserData((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/login`, {
        method: "POST",
        body: JSON.stringify(userData), 
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setSignedUpUser(false); 
          return;
        }
        if (response.status == 404) {
          setSignedUpUser(false);
          return;
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if(data?.jwtToken){
        localStorage.setItem("jwtToken",data.jwtToken);
      }
      if(data?.isAdmin!==undefined){
        localStorage.setItem('isadmin',data.isAdmin);
      }
      navigate("/");
    } catch (e) {
      console.error("Error during login:", e);
    }
  };

  const handleSignUp = (e) => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lightgold" >
      <div className="bg-maroon p-8 rounded-lg shadow-lg w-full max-w-md" >
        <h2 className="text-2xl font-bold mb-6 text-center text-gold">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email1">
              Email
            </label>
            <input
              type="email"
              id="email1"
              name="email12"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
              onChange={handleFeildChange("email")}
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password1">
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
              className="bg-lightgold hover:text-white text-maroon font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleLogin}
            >
              Login
            </button>
            {!isSignedUpUser && (
              <button
                type="submit"
                className="bg-lightgold hover:text-white text-maroon font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSignUp}
              >
                SignUp
              </button>
            )}
          </div>
          {!isSignedUpUser && <p className="text-gray-200 mt-2">Please signup or use signed up credentials</p>}
        </form>
      </div>
    </div>
  );
};
 
export default Login;
