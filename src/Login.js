import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Color from "./Color";
import swal from "sweetalert";
import { CircularProgress } from "@mui/material";


function Login() {
    const [state, setState] = useState({
        email: '',
        password: '',
        loading:false,
    })
    const [error, setError] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === "email") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(value)) {
                setError({
                    ...error,
                    [name]: "please enter the email address ."
                })
            }
            else {
                setError({
                    ...error,
                    [name]: ""
                })
            }
        }
        if (name === "password") {
            var password_pattern = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/);
            if (!password_pattern.test(value))
                setError({
                    ...error,
                    [name]: "please enter strong password uppercase and lowercase number specialCharacter."
                })
            else {
                setError({
                    ...error,
                    [name]: ""
                })

            }

        }
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    console.log(state)
    const Submit = async (e) => {
        e.preventDefault()
        try {
            if (!state.email || !state.password) {
                let error = {};
                if (!state.email) {
                    error.email = "please enter the email"
                    setError(error)
                }
                if (!state.password) {
                    error.password = "please enter the password"
                    setError(error)
                }
            } else {
                const { email, password } = state
                let inputData = {
                    email: email,
                    password: password
                }
                setState({
                    loading :true
                })
                let responce = await fetch('http://192.168.1.27:4000/users/login', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(inputData)
                })
                let user = await responce.json();
                localStorage.setItem('token', user.data.token)
                localStorage.setItem('_id',user.data._id)
                     setTimeout(()=>{
                        setState({
                            loading: false
                          
                          })
                          if (responce.status === 200) {
                            swal(user.message)
                            navigate('/getpostdata')
                        }
                     },1000)
                  }


        } catch (error) {
            setState({
                error,
                loading: false,
         })
     }
    }
    
    return (

        <div>
            <Color />
            <h1 className="h1">Login from Design</h1>
            <form onSubmit={Submit}>
                <label className="label">email</label>
                <input type="text" name="email" onChange={handleChange} value={state?.email} className="input" /><br />
                <span className="invalied-error">{error.email}</span>
                <label className="label">password</label>
                <input type="text" name="password" onChange={handleChange} value={state?.password} className="input" /><br />
                <span className="invalied-error">{error.password}</span><br />
              
                <Button  className="btn" onClick={(e) => {Submit(e) }} type="submit">
               {state.loading ? <CircularProgress color="success" disableShrink /> : "Submit"}
             
        </Button>
            </form>
        </div>
    )
}
export default Login;