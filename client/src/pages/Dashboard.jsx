import React from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-purple-50 text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-b from-purple-100 to-purple-50">
        <motion.h1
          className="text-5xl font-extrabold text-purple-700 mb-6 leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <span className="text-purple-800">Mama Care</span>
        </motion.h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Your trusted companion in promoting the health and well-being of mothers and children.  
          Mama Care provides health insights, SHA insurance guidance, and hospital location tools.
        </p>
        
      </section>

      {/* About Section */}
      <section className="py-16 px-8 md:px-20 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <motion.img
            src="https://i.pinimg.com/1200x/2b/65/e2/2b65e255cf1c063e2c059c717893e982.jpg"
            alt="Mother and Child"
            className="rounded-3xl shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-purple-700 mb-4">About Mama Care</h2>
            <p className="text-gray-700 mb-4">
              Mama Care is dedicated to empowering mothers and caregivers with reliable health information,
              helping them make informed decisions for themselves and their children.  
            </p>
            <p className="text-gray-700">
              Our goal is to make maternal and child healthcare accessible, trustworthy, and supported by technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-8 md:px-20 bg-purple-100 text-center">
        <motion.h2
          className="text-4xl font-bold text-purple-700 mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
          {/* AI Health Assistant */}
          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/4341/4341139.png"
              alt="AI health assistant"
              className="w-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-purple-700 mb-2">
              AI Health Assistant
            </h3>
            <p className="text-gray-600">
              Get AI-generated responses to your questions concerning maternal and child health.
            </p>
          </motion.div>

          {/* Insurance Info */}
          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1170/1170627.png"
              alt="Insurance info"
              className="w-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-purple-700 mb-2">
              SHA Insurance Guidance
            </h3>
            <p className="text-gray-600">
              Understand your SHA insurance coverage and how to access the healthcare services you deserve.
            </p>
          </motion.div>

          {/* Hospital Locator */}
          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
              alt="Hospital locator"
              className="w-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-purple-700 mb-2">
              Nearest Hospital Finder
            </h3>
            <p className="text-gray-600">
              Use our Google Maps feature to find the nearest hospital for you and your child with one tap.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 bg-purple-600 text-white mt-10">
        <p>© {new Date().getFullYear()} Mama Care. All rights reserved.</p>
      </footer>
    </div>
  );
}

