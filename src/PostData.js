import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Color from "./Color";
import { Button } from "react-bootstrap";
import axios from "axios";
import { CircularProgress } from "@mui/material";
function PostData() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])
    const [state, setState] = useState({
        title: '',
        content: '',
        image: '',

    })
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handleAddfile = (e) => {

        setState({
            ...state,
            [e.target.name]: e.target.files[0]
        })

    }
    const submit = async (e) => {
        e.preventDefault()
        try {
            const { title, content, image } = state;
            let formData = new FormData();
            formData.append('title', title)
            formData.append('content', content)
            formData.append('image', image)
            console.log("formdata", formData)
            const token = localStorage.getItem('token')
            let responce = await fetch('http://192.168.1.27:4000/posts/createpost', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            let user = await responce.json();


        } catch (error) {
            console.log(error)

        }
     }
     
    return (
        <div>
            <Color />
            <h1 className="h1">Post Data with api</h1>

            <form onSubmit={submit}>
                <input type="text" name="title" onChange={handleChange} /><br /><br />
                <textarea type="text" name="content" onChange={handleChange}></textarea>
                <br /><br />
                <input type="file" name="image" onChange={handleAddfile} />
                <br /><br />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}
export default PostData;