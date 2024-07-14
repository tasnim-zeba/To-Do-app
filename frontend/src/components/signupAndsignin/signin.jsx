import React, { useState } from "react";
import './signupIn.css';
import HeadingComp from "./headingComp";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

const SignIn = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [Inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    const change = (e) => {
        const {name, value} = e.target;
        setInputs({ ...Inputs, [name]: value});
    }
    const submit = async (e) =>{
        e.preventDefault();//In the context of a form submission, it prevents the browser from performing the default form submission action, which typically involves sending the form data to the server and reloading the page.
        await axios.post("http://localhost:1000/api/v1/login", Inputs).then((response) => {
            sessionStorage.setItem("id", response.data.others._id)
            dispatch(authActions.login())
            history("/todo");
            setTimeout(() => {
                window.location.reload();
            }, 100);
        });
        
    }
    
    return (
        <div className="signup">
            <div className="container">
                <div className="row">
                <div className="col-lg-4 column col-left d-none d-lg-flex justify-content-center align-items-center" >
                        <HeadingComp first="Sign" second="In"/>
                    </div>
                    <div className="col-lg-8 column d-flex justify-content-center align-items-center">
                        <div className="d-flex flex-column w-100 p-5">
                            <input className="p-2 my-3 input-signup" 
                            type="email" 
                            name="email" 
                            placeholder="Enter Your Email" 
                            value = {Inputs.email}
                            onChange = {change}
                            />
                            <input className="p-2 my-3 input-signup" 
                            type="password" 
                            name="password" 
                            placeholder="Enter Your Password" 
                            value = {Inputs.password}
                            onChange = {change}
                            />
                            <button className="btn-signup" onClick={submit}>SignIn</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default SignIn;