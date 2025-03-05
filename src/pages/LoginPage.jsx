import React from "react";
import Input from "../component/input.jsx";
import ConnectWallet from "../component/connectWallet.jsx";

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('poster.jpg')" }}>
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-30 backdrop-blur-md p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-sm text-gray-500">Sign in to your account</p>
        </div>
        
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input 
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <Input 
              placeholder="Enter your password"
              type="password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label className="ml-2 text-sm text-gray-600">Remember me</label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
              Forgot password?
            </a>
          </div>
            <a href="/register" className="text-sm text-blue-600 hover:text-blue-800 flex justify-center">
              Don't have an account? Sign up
              </a>

          <div className="mt-6">
            <ConnectWallet />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;