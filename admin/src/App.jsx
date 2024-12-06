import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//makin an api call
export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency ='K'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ?localStorage.getItem('token') : '' );

  //to avoid being logged out each time the page is refreshed
  useEffect(()=>{

    localStorage.setItem('token',token)
  },[token])

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer/>
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <NavBar setToken={setToken}  />
          <hr />

          <div className="flex w-full">
            <SideBar />

            <div className="w-[70%] max-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-bas">
              <Routes>
                <Route path="/add" element={<Add token={token}/>} />
                <Route path="/list" element={<List token={token}/>} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
      {React.createElement("span", null)}
    </div>
  );
};

export default App;
