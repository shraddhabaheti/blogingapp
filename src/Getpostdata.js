import { useEffect, useState } from "react";
import Color from "./Color";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import './App.css';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
function Getpostdata() {
    const [postData, setPostData] = useState([])
    const [likes, setlike] = useState(false)
   const [btnColor, setBtnColor] = useState("red");
    let _id=localStorage.getItem('_id')
    
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
       //setlike(_id)
    }, [])
    console.log(postData)
    const like = async (data) => {

        try {

            const _id = localStorage.getItem('_id')
            console.log("++++", _id)
            const token = localStorage.getItem('token')
            const res = await axios.put(`http://192.168.1.27:4000/posts/likes`, { postid: data._id }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
          
            setlike(res?.data)
            setlike(token)
           getData()
               


        } catch (error) {
            console.log(error)
        }

       
    }
    const dislike = async (data) => {
        try {
            const _id = localStorage.getItem('_id')
            const token = localStorage.getItem('token')
            let responce = await axios.put(`http://192.168.1.27:4000/posts/unlikes`, { postid: data._id }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }

            })
            
            setlike(responce?.data)
            setlike(token)
            getData()

        } catch (error) {

            console.log(error)

        }
        
    }
    const deletes = async (data) => {

        try {
            const token = localStorage.getItem('token')
            let responce = await axios.delete(`http://192.168.1.27:4000/posts/deletepost/${data._id} `, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            let res = postData.filter((value) => value?._id !== data._id)
            setPostData(res)

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
                            <img className="image1" src={value.image[0].replace('localhost', '192.168.1.27')} />
                            <br />
                            { 

                                value.likes.includes(_id) ?
                                     <ThumbDownOffAltIcon onClick={() => dislike(value)}></ThumbDownOffAltIcon>
                                    : <ThumbUpIcon style={{ color: btnColor ? 'blue' : '' }} onClick={()=>like(value)}></ThumbUpIcon>
                            }

                            <h6>{value?.likes.length} likes </h6>
                            <DeleteIcon variant="danger" onClick={() => deletes(value)}>Delete</DeleteIcon>
                            {/* <button>Edit</button> */}
                        </div>

                    )

                })
            }

        </div>
    )
}
export default Getpostdata;