import React, {useState, useEffect} from "react"
import axios from "axios"
import {navigate} from "hookrouter"

export default function Auth() {
    const [loggedInStatus, setLoggedInStatus] = useState("Not Logged In")
    const [inputText, setInputText] = useState("")
    const [passwordText, setPasswordText] = useState("")
    const [responseData, setResponseData] = useState("")


    const getUsers = (e) => {
        // e.preventDefault()
        axios
        .get("http://localhost:5000/users")
        .then(response => {
            console.log("response data", response.data)

            let signInArray = response.data

            signInArray.forEach(item => {
                if (inputText === item.email && passwordText === item.password) {
                        handleSuccessfulAuth()
                } else {
                    console.log('failed')
                }
        })
        })
        .then(() => {
            navigate("/")
        })
        .catch(err => {
            console.error(err)
        })
    }

    const handleSuccessfulAuth = () => {
        console.log("You mf bad bitch, you did it!!")
        setLoggedInStatus("Logged In Baby!! ;)")
    }

    return(
        <div className="app">
            <div>
                <h1>{loggedInStatus}</h1>
            </div>
            <form>
                <input 
                placeholder="email"
                type="text"
                name="email"
                onChange={e => setInputText(e.target.value)}
                />
                <input
                placeholder="password"
                type="password"
                name="password"
                onChange={e => setPasswordText(e.target.value)}
                />
            </form>
            <button onClick={() => getUsers()} className="btn">Login</button>
        </div>
    )
}