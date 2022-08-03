import { useEffect, useState } from "react";
import Color from "./Color";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';


import './App.css';
import axios from "axios";
function Getpostdata() {
    const [postData, setPostData] = useState([])
    const [likes, setlike] = useState(false)
    const [btnColor, setBtnColor] = useState("red");
    const getData = async () => {
        const token = localStorage.getItem("token")
        let response = await fetch('http://192.168.1.27:4000/posts/getallposts', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        let user = await response.json();
        setPostData(user)


    }
    useEffect(() => {
        getData();
    }, [])
    const submit = async (data) => {

        try {

            const token = localStorage.getItem('token')
            const res = await axios.put(`http://192.168.1.27:4000/posts/likes`, { postid: data._id }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            setlike(res?.data)
            setlike(token)
            setlike(true)
            setlike(likes + 1)
        } catch (error) {
            console.log(error)
        }
       
    }
    const disSubmit = async (data) => {
        try {
            const token = localStorage.getItem('token')
            let responce = await axios.put(`http://192.168.1.27:4000/posts/unlikes`, { postid: data._id }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            setlike(responce?.data)
            setlike(token)
            setlike(likes - 1)
            setlike(false)
        } catch (error) {
            console.log(error)
        }

    }
    
    return (
        <div>
            <Color />
            <h1 className="h1">Get post data</h1>
            {
                postData.map((value, i) => {

                    return (

                        <div id={value._id}>
                            <h3 >{value.title}</h3>
                            <h5>{value.content}</h5>
                             
                            <img className="image1" src={value.image[0].replace('localhost', '192.168.1.27')} /><br />
                            {
                                likes ?<ThumbDownOffAltIcon onClick={() => disSubmit(value)}></ThumbDownOffAltIcon> :
                                    <ThumbUpIcon style={{color:btnColor?'blue':''}}  onClick={() => submit(value)}></ThumbUpIcon>
                            }
                            <h4>{likes}</h4>
                          
                      </div>

                    )

                })
            }

        </div>
    )
}
export default Getpostdata;