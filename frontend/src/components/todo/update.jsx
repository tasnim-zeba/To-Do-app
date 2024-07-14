import React, { useEffect, useState } from 'react';
import axios from "axios"
import "./todo.css";
import { Toaster, toast } from 'react-hot-toast';

const Update = ({display, update}) => {
    useEffect(()=>{
        setInputs({
            title: update.title, 
            body: update.body
        })
    }, [update])
    const [Inputs, setInputs] = useState({
        title: "", 
        body: "",
    })
    const change = (e) =>{
        const { name, value } = e.target;
        setInputs({...Inputs, [name]: value})
    }
    const submit = async() =>{
        await axios
        .put(`http://localhost:1000/api/v2/updateTask/${update._id}`, Inputs)
        .then((response)=>{
            toast.success("Your task is updated");
        })
        display("none");
    };
    return (
        <div className='p-5 d-flex justify-content-center align-items-start flex-column update' >
            <h1>Update Your Task</h1>
            <input type="text" className='todo-inputs my-4 w-100 p-3' value={Inputs.title} name="title" onChange={change}/>
            <textarea className='todo-inputs w-100 p-3' value={Inputs.body} name="body" onChange={change}/>
            <div>
                <button className='btn btn-dark my-4' onClick={submit}>UPDATE</button>
                <button className='btn btn-danger my-4 mx-3' onClick={()=>{display("none")}}>Close</button>
            </div>

        </div>
    )
}

export default Update


// const Register = async(req, res) => {
//     try{
//         const {email, username, password} = req.body;
//         const hashpassword = bcrypt.hashSync(password)
//         const user = new User({
//             email, username, password: hashpassword
//         })
//         await user.save().then(()=>res.status(200).json({user:user}))

//     }catch(error){
//         res.status(400).json({
//             message: "User Already Exists"
//         })
//     }
// }
