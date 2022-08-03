import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Color from "./Color";
import { Button } from "react-bootstrap";
import swal from "sweetalert";
function Registration() {
    const [state, setState] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'name') {
            if (value.length < 3) {
                setError({
                    ...error,
                    [name]: "please enter the name"
                })

            } else {
                setError({
                    ...error,
                    [name]: ''
                })
            }
        }
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
        if (name === "phone") {
            if (value.length < 10) {
                setError({
                    ...error,
                    [name]: 'please enter the number'
                })
            } else {
                setError({
                    ...error,
                    [name]: ''
                })
            }
        }
        setState({
            ...state,
            [e.target.name]: e.target.value
        });

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
        if (name === " confirmPassword") {
            if (value.length < 3)
                setError({
                    ...error,
                    [name]: "Confirm password is required."
                })
            else {
                setError({
                    ...error,
                    [name]: ""
                })
            }

        }

        if (state.password && name === "confirmPassword") {

            if (state.password !== value) {
                setError({
                    ...error,
                    [name]: " password not a match...!"
                })

            } else {
                setError({
                    ...error,
                    [name]: ""
                })

            }
        }




    }
    const submit = async (e) => {
        e.preventDefault()
        try {
            if (!state.name || !state.email || !state.phone || !state.password || !state.confirmPassword || state.password !== state.confirmPassword) {
                let error = {};
                if (state.password !== state.confirmPassword) {
                    error.confirmPassword = "password and confirm password are not match"
                }
                if (!state.name) {
                    error.name = "please enter the name"
                    setError(error)
                }
                if (!state.phone) {
                    error.phone = "please enter the phone"
                    setError(error)
                }
                if (!state.email) {
                    error.email = "please enter the email"
                    setError(error)
                }
                if (!state.password) {
                    error.password = "please enter the password"
                    setError(error)
                }
                if (!state.confirmPassword) {
                    error.confirmPassword = "please enter the confirmpssword"
                    setError(error)
                }

            } else {
                const { name, phone, email, password, confirmPassword } = state
                let inputData = {
                    name: name,
                    phone: Number(phone),
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword
                }
                let responce = await fetch('http://192.168.1.27:4000/users/register', {
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Accept': 'application/json'

                    },

                    body: JSON.stringify(inputData)
                })
                let user = await responce.json();
                if(responce.status === 200){
      
                    swal(user.message)
                
                   setTimeout(()=>{
                    navigate('/login')
                   },2000)
                  
                  }

            }
          
        } catch (error) {
                 
        }
    }

    return (
        <div>
            <Color />
            <h1 className="h1">Registration Form design</h1>
            <form onSubmit={submit}>

                <label className="label">Name</label>
                <input type="text" name="name" onChange={handleChange} value={state?.name} className="input" /><br />
                <span className="invalied-error">{error.name}</span>
                <label className="label">phone</label>
                <input type="number" name="phone" onChange={handleChange} value={state?.phone} className="input" /><br />
                <span className="invalied-error">{error.phone}</span>
                <label className="label">email</label>
                <input type="text" name="email" onChange={handleChange} value={state?.email} className="input" /><br />
                <span className="invalied-error">{error.email}</span>
                <label className="label">password</label>
                <input type="text" name="password" onChange={handleChange} value={state?.password} className="input" /><br />
                <span className="invalied-error">{error.password}</span>
                <label className="label">confirmPassword</label>
                <input type="text" name="confirmPassword" onChange={handleChange} value={state.confirmPassword} className="input" /><br />
                <span className="invalied-error">{error.confirmPassword}</span><br />
                <Button type="submit" className="btn">Register</Button>
            </form>
        </div>
    )
}
export default Registration;