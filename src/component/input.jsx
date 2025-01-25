// component/input.jsx
import React from "react";

const Input = ({ type = "text", placeholder, className, ...props }) => {
  return (
    <div className="relative">
      <input
        type={type}
        className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${className}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default Input;