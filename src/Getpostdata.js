import { useEffect, useState } from "react";
import Color from "./Color";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import './App.css';
import axios from "axios";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
function Getpostdata() {
    const [postData, setPostData] = useState([])
    const [btnColor, setBtnColor] = useState('red');
   const [state, setState] = useState({
        text: '',
     })
    let id = localStorage.getItem('_id')
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })

    }

    console.log('state', state)

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
    const like = async (data) => {
         
        try {

            const _id = localStorage.getItem('_id')
            const token = localStorage.getItem('token')
            const res = await axios.put(`http://192.168.1.27:4000/posts/likes`, { postid: data._id }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
           
            getData()
        } catch (error) {
            console.log(error)
        }


    }
    const unlike = async (data) => {
        try {
            const _id = localStorage.getItem('_id')
            const token = localStorage.getItem('token')
            let responce = await axios.put(`http://192.168.1.27:4000/posts/unlikes`, { postid: data._id }, {
                headers: {

                    'Authorization': `Bearer ${token}`
                }

            })
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

    const comment = async (data) => {

        try {
            const token = localStorage.getItem('token')
            let responce = await axios.put(`http://192.168.1.27:4000/posts/comments`,
                { postid: data._id, text: state.text },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                },
                })


        } catch (error) {
            console.log(error)

        }
    }
   
    return (
        <div>
            <Color />
            <h1 className="h1">Get post data</h1>
            <div className="card1">
            {

                postData.map((value, i) => {

                    return (
                        
                       <Card className="card">
                        <div id={value._id}>
                        <p className="h2">{value.postedBy.name}</p>
                            <Card.Title>{value.title}</Card.Title>
                            <Card.Text>{value.content}</Card.Text>
                           
                            <Card.Img className="image1" src={value.image[0].replace('localhost', '192.168.1.27')} ></Card.Img>
                          
                            {

                              value?.likes.includes(id) 
                               ?<FavoriteIcon className="button3" style={{ color: btnColor ? 'red' : '' }}  onClick={() => unlike(value)}></FavoriteIcon>
                               : <FavoriteBorderIcon  className="button3"  onClick={() => like(value)}></FavoriteBorderIcon>
                               
                            }
                            <h6 className="length">{value?.likes?.length} likes </h6>
                         
                            <div>
                                {
                                    value.comments?.map((value, i) => {
                                        return (
                                            <div className="comments">
                                                <h6>{value.postedBy.name}</h6>
                                                <p>{value.text}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <input type="text" name="text" onChange={handleChange} />
                            <button onClick={() => comment(value)}>comment</button>
                            <DeleteIcon variant="danger" onClick={() => deletes(value)}>Delete</DeleteIcon>
                        </div>
                        </Card>
                        
                    )

                })
            }
           </div>
        </div>
    )
}
export default Getpostdata;