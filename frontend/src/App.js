import React, { useEffect } from "react";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Footer from "./components/footer/footer";
import About from "./components/about/about";
import Todo from "./components/todo/todo";
import Signup from "./components/signupAndsignin/signup";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignIn from "./components/signupAndsignin/signin";
import { useDispatch } from "react-redux";
import { authActions } from "./store";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = sessionStorage.getItem("id")
    if(id){
      dispatch(authActions.login())
    }
  }, [])
  
  return (
    <div>
      <Router>
      <Navbar/> 
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/todo" element={<Todo/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<SignIn/>}/>
        </Routes>
      </Router>
      
      <Footer/>
    </div>
  )
}


export default App;

//cd frontend, npm i react-router-dom