import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillHospitalFill } from "react-icons/bs";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-purple-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <BsFillHospitalFill className="text-3xl" />
          <h1 className="text-2xl font-bold">Mama Care</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-lg font-medium">
          <Link className="hover:text-purple-200 transition" to="/">Dashboard</Link>
          <Link className="hover:text-purple-200 transition" to="/chatbot">ChatBot</Link>
          <Link className="hover:text-purple-200 transition" to="/locator">Location</Link>
          <Link className="hover:text-purple-200 transition" to="/insurance">Insurance</Link>
        </div>

        {/* Logout Button (Desktop) */}
        <button className="hidden md:block bg-white text-purple-600 font-semibold px-4 py-2 rounded-lg hover:bg-purple-100 transition">
          Log Out
        </button>

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
        <div className="md:hidden bg-purple-700 text-white py-4 px-6 flex flex-col gap-4 text-lg font-medium">
          <Link onClick={() => setOpen(false)} className="hover:text-purple-200" to="/">Dashboard</Link>
          <Link onClick={() => setOpen(false)} className="hover:text-purple-200" to="/chatbot">ChatBot</Link>
          <Link onClick={() => setOpen(false)} className="hover:text-purple-200" to="/locator">Location</Link>
          <Link onClick={() => setOpen(false)} className="hover:text-purple-200" to="/insuranceprovider">Insurance</Link>
          <button className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-purple-100 transition">
            Log Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
