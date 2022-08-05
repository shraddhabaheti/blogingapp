import { useEffect, useState } from "react";
import Color from "./Color";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import './App.css';
import axios from "axios";
//import state from "sweetalert/typings/modules/state";
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
    console.log(postData)
    const submit = async (data) => {
       
          try {
            
                const _id=localStorage.getItem('_id')
                const token = localStorage.getItem('token')
               const res = await axios.put(`http://192.168.1.27:4000/posts/likes`, { postid: data._id }, {
                   headers: {
                       'Authorization': 'Bearer ' + token
                   }
               })
               setlike(res?.data)
               setlike(token)
               setlike(_id)
               setlike(true)
             // setlike(likes+1)
           } catch (error) {
               console.log(error)
           }
          
         
    }
    const disSubmit = async (data) => {
        try {
            const _id=localStorage.getItem('_id')
            const token = localStorage.getItem('token')
            let responce = await axios.put(`http://192.168.1.27:4000/posts/unlikes`, { postid: data._id }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            setlike(responce?.data)
            setlike(token)
            setlike(_id)
            //setlike(likes - 1)
            setlike(false)
        } catch (error) {
            console.log(error)
        }

    }
   const deletes = async(data)=>{
        
       try {
           const token=localStorage.getItem('token')
           let responce=await axios.delete(`http://192.168.1.27:4000/posts/deletepost/${data._id} `,{
           headers:{
            'Authorization': 'Bearer ' + token
           }
         })
        let res=postData.filter((value)=>value?._id !== data._id)
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
                           
                                value?.likes.every((likes)=>value === likes) ?<ThumbDownOffAltIcon onClick={() => disSubmit(value)}></ThumbDownOffAltIcon> :
                                    <ThumbUpIcon style={{color:btnColor?'blue':''}}  onClick={() => submit(value)}></ThumbUpIcon>
                            }
                            <h4>{value?.likes.length}</h4>
                            <Button variant="danger" onClick={()=>deletes(value)}>Delete</Button>
                            {/* <button>Edit</button> */}
                      </div>

                    )

                })
            }

        </div>
    )
}
export default Getpostdata;