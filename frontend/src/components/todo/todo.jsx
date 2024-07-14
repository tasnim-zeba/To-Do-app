import React, { useState, useEffect } from "react";
import "./todo.css";
import TodoCards from "./TodoCards";
import { Toaster, toast } from 'react-hot-toast';
import Update from "./update";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import axios from "axios";

let id = sessionStorage.getItem("id")
let toUpdateArray = []

const Todo = () => {
    const [Inputs, setInputs] = useState({ title: "", body: "" })
    const [Array, setArray] = useState([])



    const show = () => {
        document.getElementById("textarea").style.display = "block"
    }
    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    }
    const submit = async (e) => {
        if (Inputs.title === "" || Inputs.body === "") {
            toast.error("Title or Body should not be Empty");
        }
        else {
            if (id) {
                await axios
                    .post("http://localhost:1000/api/v2/addTask",
                        {
                            title: Inputs.title,
                            body: Inputs.body,
                            id: id
                        }).then((response) => {
                            console.log(response);
                        })
                setInputs({ title: "", body: "" });
                toast.success("Your Task Is Added");
            }
            else {
                setArray([...Array, Inputs]);
                setInputs({ title: "", body: "" });
                toast.error("Your Task Is Added But Not Saved! Please sign up.");
            }

        }

    }
    const del = async (Cardid) => {
        if (id) {
            await axios
                .delete(`http://localhost:1000/api/v2/deleteTask/${Cardid}`, {
                    data: { id: id },
                })
                .then((response) => {
                    toast.success("Task deleted")
                })
        }
        else
        {
            toast.error("Please Login first")
        }

        //id is the user id
    }
    const dis = (value) => {
        document.getElementById("todo-update").style.display = value;
    }
    const update = (value) => {
        toUpdateArray = Array[value];
    }
    useEffect(() => {
        if(id){
            const fetch = async () => {
                await axios.get(`http://localhost:1000/api/v2/getTasks/${id}`).then((response) => {
                    setArray(response.data.list)
                })
            }
            fetch()
        }
        
    }, [submit])
    return (
        <>
            <div className="todo">
                <Toaster />
                <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
                    <div className="d-flex flex-column todo-inputs-div w-50 p-1">

                        <input
                            type="text"
                            placeholder="TITLE"
                            className="my-2 p-2 todo-inputs "
                            onClick={show}
                            name="title"
                            value={Inputs.title}
                            onChange={change}
                        />
                        <textarea id="textarea"
                            type="text"
                            placeholder="BODY"
                            name="body"
                            value={Inputs.body}
                            className="p-2 todo-inputs"
                            onChange={change}
                        />

                    </div>
                    <div className="w-50 d-flex justify-content-end my-3">
                        <button className="todobtn px-2 py-1" onClick={submit}>
                            Add
                        </button>
                    </div>
                </div>
                <div className="todo-body">
                    <div className="container-fluid">
                        <div className="row">
                            {Array &&
                                Array.map((item, index) => (
                                    <div className="col-lg-3 col-10 mx-5 my-2" key={index}>
                                        <TodoCards
                                            title={item.title}
                                            body={item.body}
                                            id={item._id}
                                            delid={del}
                                            display={dis}
                                            updateId={index}
                                            toBeUpdated= {update}
                                         />
                                    </div>
                                ))}
                        </div>

                    </div>
                </div>
            </div>
            <div className="todo-update" id="todo-update">
                <div className="container update update-box">
                    <Update display={dis} update = {toUpdateArray}/>
                </div>

            </div>
        </>
    )
}

export default Todo;
