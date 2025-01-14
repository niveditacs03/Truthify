import React from "react"
import Input from "../component/input.jsx";
import "../component/index.css";
import ConnectWallet from "../component/connectWallet.jsx";

function LoginPage()
{
  return <div className="container">
    <h1>Login Page</h1>
   <Input placeholder="Enter your username" />
   <Input placeholder="Enter your password"/>
   <button type="submit">Submit</button>
   <ConnectWallet/>
  </div>
}
export default LoginPage;