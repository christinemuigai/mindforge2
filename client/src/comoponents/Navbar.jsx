import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BsFillHospitalFill } from "react-icons/bs";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import logo from "../assets/logo.png"

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-purple-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src ={logo} alt="mama care logo" className='h-12 w-20'/>
          <h1 className="text-2xl font-bold">Mama Care</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-lg font-medium">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `transition-all duration-200 border-b-2 py-1 ${isActive ? "text-purple-100 border-purple-200" : "text-white border-transparent hover:text-purple-200 hover:border-purple-300"}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/chatbot" 
            className={({ isActive }) => 
              `transition-all duration-200 border-b-2 py-1 ${isActive ? "text-purple-100 border-purple-200" : "text-white border-transparent hover:text-purple-200 hover:border-purple-300"}`
            }
          >
            ChatBot
          </NavLink>
          <NavLink 
            to="/locator" 
            className={({ isActive }) => 
              `transition-all duration-200 border-b-2 py-1 ${isActive ? "text-purple-100 border-purple-200" : "text-white border-transparent hover:text-purple-200 hover:border-purple-300"}`
            }
          >
            Location
          </NavLink>
          <NavLink 
            to="/insurance" 
            className={({ isActive }) => 
              `transition-all duration-200 border-b-2 py-1 ${isActive ? "text-purple-100 border-purple-200" : "text-white border-transparent hover:text-purple-200 hover:border-purple-300"}`
            }
          >
            Insurance
          </NavLink>
        </div>

      

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl hover:text-purple-200 transition"
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>

      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-purple-700 text-white py-4 px-6 flex flex-col gap-4 text-lg font-medium shadow-inner">
          <NavLink onClick={() => setOpen(false)} to="/" className={({ isActive }) => `block py-2 px-3 rounded-lg transition-colors ${isActive ? "bg-purple-800 text-purple-100" : "hover:bg-purple-600 hover:text-purple-100"}`}>Dashboard</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/chatbot" className={({ isActive }) => `block py-2 px-3 rounded-lg transition-colors ${isActive ? "bg-purple-800 text-purple-100" : "hover:bg-purple-600 hover:text-purple-100"}`}>ChatBot</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/locator" className={({ isActive }) => `block py-2 px-3 rounded-lg transition-colors ${isActive ? "bg-purple-800 text-purple-100" : "hover:bg-purple-600 hover:text-purple-100"}`}>Location</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/insurance" className={({ isActive }) => `block py-2 px-3 rounded-lg transition-colors ${isActive ? "bg-purple-800 text-purple-100" : "hover:bg-purple-600 hover:text-purple-100"}`}>Insurance</NavLink>
          <button className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-purple-100 transition">
            Log Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
