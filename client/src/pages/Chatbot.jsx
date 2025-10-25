/*
import React, { useState } from "react";
import { FiSend, FiMapPin, FiHeart, FiRefreshCcw } from "react-icons/fi";
import { AiOutlinePaperClip, AiOutlinePicture } from "react-icons/ai";
import { MdLocalHospital, MdHealthAndSafety } from "react-icons/md";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [selectedInsurance, setSelectedInsurance] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("");

  const commonPrompts = [
    "I’m feeling dizzy and weak during pregnancy",
    "My baby has a mild fever, what should I do?",
    "What are safe foods during pregnancy?",
    "How can I relieve back pain after childbirth?",
  ];

  const nearbyFacilities = [
    "Embu County Referral Hospital",
    "Runyenjes Sub-county Hospital",
    "Kianjokoma Health Centre",
    "Mothers Love Maternity Clinic",
  ];

  const insuranceCompanies = [
    "NHIF",
    "Jubilee Health",
    "Britam Insurance",
    "CIC Insurance",
    "Madison Health",
  ];

 const handleSend = async () => {
  if (!message.trim()) return;

  try {
    const response = await fetch("http://127.0.0.1:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    if (data.reply) {
      alert(`AI Response:\n${data.reply}`);
    } else if (data.error) {
      alert(`Error: ${data.error}`);
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Failed to reach the backend.");
  }

  setMessage("");
};


  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 relative">
      
      <aside className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-6">
        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
          M
        </div>
        <div className="flex flex-col space-y-6 text-gray-400">
          <FiHeart size={22} className="hover:text-purple-500 cursor-pointer" />
          <MdLocalHospital
            size={22}
            className="hover:text-purple-500 cursor-pointer"
          />
          <FiMapPin size={22} className="hover:text-purple-500 cursor-pointer" />
        </div>
      </aside>


      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-4xl font-semibold text-gray-900">
            Welcome to <span className="text-purple-600">MamaCare</span>
          </h1>
          <h2 className="text-2xl font-medium text-gray-700 mt-1">
            Your <span className="text-purple-500 font-semibold">trusted health assistant</span> for mothers and babies
          </h2>

          <p className="text-gray-500 mt-6">
            Enter your symptoms below or choose a common query to receive personalized guidance or first aid tips.
          </p>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
            {commonPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => setMessage(prompt)}
                className="bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:border-purple-400 transition"
              >
                {prompt}
              </button>
            ))}
          </div>

          <button className="flex items-center justify-center text-gray-400 text-sm mt-4 hover:text-purple-500">
            <FiRefreshCcw className="mr-2" /> Refresh Prompts
          </button>
          <div className="mt-10 bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-center justify-between">
            <input
              type="text"
              placeholder="Describe your symptom or question…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 text-gray-700 placeholder-gray-400 outline-none bg-transparent text-sm"
              maxLength={1000}
            />
            <div className="flex items-center space-x-3 text-gray-400">
              <button className="hover:text-purple-500">
                <AiOutlinePaperClip size={20} />
              </button>
              <button className="hover:text-purple-500">
                <AiOutlinePicture size={20} />
              </button>
              <div className="text-gray-400 text-xs">{message.length}/1000</div>
              <button
                onClick={handleSend}
                className="bg-purple-600 text-white rounded-lg p-2 hover:bg-purple-700"
              >
                <FiSend size={18} />
              </button>
            </div>
          </div>


          <div className="mt-10 text-left space-y-6">
            <div>
              <h3 className="text-gray-700 font-semibold mb-2">
                Choose a nearby healthcare facility
              </h3>
              <select
                value={selectedFacility}
                onChange={(e) => setSelectedFacility(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-3 text-gray-700 outline-none focus:border-purple-400"
              >
                <option value="">Select facility</option>
                {nearbyFacilities.map((facility, i) => (
                  <option key={i} value={facility}>
                    {facility}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="text-gray-700 font-semibold mb-2">
                Select your insurance provider
              </h3>
              <select
                value={selectedInsurance}
                onChange={(e) => setSelectedInsurance(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-3 text-gray-700 outline-none focus:border-purple-400"
              >
                <option value="">Choose insurance</option>
                {insuranceCompanies.map((company, i) => (
                  <option key={i} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>
          </div>


          <div className="text-gray-400 text-xs mt-10">
            <span className="font-medium text-gray-500">
              MamaCare AI • Powered by Smart Health Kenya
            </span>
          </div>
        </div>
      </main>

    
      <div className="absolute bottom-6 left-6">
        <img
          src="https://i.pravatar.cc/40?img=12"
          alt="User"
          className="w-10 h-10 rounded-full border border-gray-300"
        />
      </div>
    </div>
  );
}
  */


import React, { useState } from "react";
import { FiSend, FiMapPin, FiHeart, FiRefreshCcw } from "react-icons/fi";
import { AiOutlinePaperClip, AiOutlinePicture } from "react-icons/ai";
import { MdLocalHospital } from "react-icons/md";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [selectedInsurance, setSelectedInsurance] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("");
  const [chatHistory, setChatHistory] = useState([]); // ✅ stores chat messages

  const commonPrompts = [
    "I’m feeling dizzy and weak during pregnancy",
    "My baby has a mild fever, what should I do?",
    "What are safe foods during pregnancy?",
    "How can I relieve back pain after childbirth?",
  ];

  const nearbyFacilities = [
    "Embu County Referral Hospital",
    "Runyenjes Sub-county Hospital",
    "Kianjokoma Health Centre",
    "Mothers Love Maternity Clinic",
  ];

  const insuranceCompanies = [
    "NHIF",
    "Jubilee Health",
    "Britam Insurance",
    "CIC Insurance",
    "Madison Health",
  ];

  const handleSend = async () => {
    if (!message.trim()) return;

    // add user message to chat
    setChatHistory((prev) => [...prev, { sender: "user", text: message }]);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (data.reply) {
        // ✅ add AI reply to chat
        setChatHistory((prev) => [...prev, { sender: "bot", text: data.reply }]);
      } else if (data.error) {
        setChatHistory((prev) => [
          ...prev,
          { sender: "bot", text: `Error: ${data.error}` },
        ]);
      }
    } catch (err) {
      console.error("Error:", err);
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: "Failed to reach the backend." },
      ]);
    }

    setMessage("");
  };

  // ✅ optional Save button handler (could later save chat to backend or localStorage)
  const handleSave = () => {
    console.log("Chat saved:", chatHistory);
    alert("Chat saved successfully!");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 relative">
      {/* Sidebar */}
      <aside className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-6">
        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
          M
        </div>
        <div className="flex flex-col space-y-6 text-gray-400">
          <FiHeart size={22} className="hover:text-purple-500 cursor-pointer" />
          <MdLocalHospital
            size={22}
            className="hover:text-purple-500 cursor-pointer"
          />
          <FiMapPin size={22} className="hover:text-purple-500 cursor-pointer" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-4xl font-semibold text-gray-900">
            Welcome to <span className="text-purple-600">MamaCare</span>
          </h1>
          <h2 className="text-2xl font-medium text-gray-700 mt-1">
            Your{" "}
            <span className="text-purple-500 font-semibold">
              trusted health assistant
            </span>{" "}
            for mothers and babies
          </h2>

          <p className="text-gray-500 mt-6">
            Enter your symptoms below or choose a common query to receive
            personalized guidance or first aid tips.
          </p>

          {/* Prompts Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
            {commonPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => setMessage(prompt)}
                className="bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:border-purple-400 transition"
              >
                {prompt}
              </button>
            ))}
          </div>

          <button className="flex items-center justify-center text-gray-400 text-sm mt-4 hover:text-purple-500">
            <FiRefreshCcw className="mr-2" /> Refresh Prompts
          </button>

          {/* ✅ Chat Box */}
          <div className="mt-8 bg-white border border-gray-200 rounded-xl shadow-sm p-4 h-64 overflow-y-auto text-left">
            {chatHistory.length === 0 ? (
              <p className="text-gray-400 text-sm text-center mt-20">
                Your chat will appear here...
              </p>
            ) : (
              chatHistory.map((msg, i) => (
                <div
                  key={i}
                  className={`my-2 flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-xl text-sm max-w-xs ${
                      msg.sender === "user"
                        ? "bg-purple-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-700 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Section */}
          <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-center justify-between">
            <input
              type="text"
              placeholder="Describe your symptom or question…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 text-gray-700 placeholder-gray-400 outline-none bg-transparent text-sm"
              maxLength={1000}
            />
            <div className="flex items-center space-x-3 text-gray-400">
              <button className="hover:text-purple-500">
                <AiOutlinePaperClip size={20} />
              </button>
              <button className="hover:text-purple-500">
                <AiOutlinePicture size={20} />
              </button>
              <div className="text-gray-400 text-xs">{message.length}/1000</div>
              <button
                onClick={handleSend}
                className="bg-purple-600 text-white rounded-lg p-2 hover:bg-purple-700"
              >
                <FiSend size={18} />
              </button>
            </div>
          </div>

          {/* ✅ Save Button */}
          <button
            onClick={handleSave}
            className="mt-4 bg-purple-100 text-purple-700 font-medium text-sm px-4 py-2 rounded-lg hover:bg-purple-200 transition"
          >
            Save Chat
          </button>

          {/* Healthcare Selector */}
          <div className="mt-10 text-left space-y-6">
            <div>
              <h3 className="text-gray-700 font-semibold mb-2">
                Choose a nearby healthcare facility
              </h3>
              <select
                value={selectedFacility}
                onChange={(e) => setSelectedFacility(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-3 text-gray-700 outline-none focus:border-purple-400"
              >
                <option value="">Select facility</option>
                {nearbyFacilities.map((facility, i) => (
                  <option key={i} value={facility}>
                    {facility}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="text-gray-700 font-semibold mb-2">
                Select your insurance provider
              </h3>
              <select
                value={selectedInsurance}
                onChange={(e) => setSelectedInsurance(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-3 text-gray-700 outline-none focus:border-purple-400"
              >
                <option value="">Choose insurance</option>
                {insuranceCompanies.map((company, i) => (
                  <option key={i} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="text-gray-400 text-xs mt-10">
            <span className="font-medium text-gray-500">
              MamaCare AI • Powered by Smart Health Kenya
            </span>
          </div>
        </div>
      </main>

      {/* Profile Image */}
      <div className="absolute bottom-6 left-6">
        <img
          src="https://i.pravatar.cc/40?img=12"
          alt="User"
          className="w-10 h-10 rounded-full border border-gray-300"
        />
      </div>    
        </div>

    
  );
}
      
      


