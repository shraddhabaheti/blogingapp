import { useEffect, useState } from "react";
import Color from "./Color";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AddIcon from '@mui/icons-material/Add';
import './App.css';
import Fab from '@mui/material/Fab';
import axios from "axios";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { isValidDateValue } from "@testing-library/user-event/dist/utils";
import { Identity } from "@mui/base";
import { FlashOnOutlined } from "@mui/icons-material";
import TextField from '@mui/material/TextField';
function Getpostdata() {
    const [postData, setPostData] = useState([])
    const [state, setState] = useState({
        text: '',
    })
    const [show, setShow] = useState([])
   let id = localStorage.getItem('_id')
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
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
            getData()
            setState({
                text: ''
            })

        } catch (error) {
            console.log(error)

        }
    }
    const commentShow = (id) => {
      
        if (show.includes(id)) {
            let findIndex = show.indexOf(id)
            setShow((sShow) => sShow.filter((value, index) => index !== findIndex))
           
        } else {
            setShow((sShow) => [...sShow, id])
           
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
                                    <p className="h2">{value?.postedBy?.name}</p>

                                    <Card.Title>{value.title}</Card.Title>
                                    <Card.Text>{value.content}</Card.Text>

                                    <Card.Img className="image1" src={value.image[0]?.replace('localhost', '192.168.1.27')} ></Card.Img>
                                    {
                                        value?.likes.includes(id)
                                            ? <FavoriteIcon className="button3" style={{ color: 'red' }} onClick={() => unlike(value)}></FavoriteIcon>
                                            : <FavoriteBorderIcon className="button3" onClick={() => like(value)}></FavoriteBorderIcon>

                                    }
                                    <h6 className="length">{value?.likes?.length} likes </h6>


                                    {show.includes(value._id) && <div>

                                        <div>
                                            {

                                                value.comments?.map((value, i) => {

                                                    return (
                                                        <div className="comments">
                                                            <h6>{value.postedBy.name}</h6>
                                                            <p className="p">{value.text}</p>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                        <TextField id="standard-basic" type="text"  name="text" variant="standard" placeholder=" Add a comment...." onChange={handleChange} value={state?.text || ''}/>
                                         {/* <input type="text" name="text" onChange={handleChange} value={state?.text || ''} ></input> */}
                                        {/* <button className="btncomment" onClick={() => comment(value)}>comment</button> */}
                                        <Fab size="small" color="secondary" aria-label="add" onClick={() => comment(value)}>
                                           <AddIcon />
                                             </Fab>
                                      
                                    </div>}

                                 <br/>
                                 <Fab variant="extended" size="medium" color="success" aria-label="add" onClick={() => commentShow(value._id)}>
       
                                     commentShow
                                      </Fab>
                                   {/* <button  onClick={() => commentShow(value._id)}>commentShow</button> */}

                                </div>
                                <DeleteIcon className="delete" onClick={() => deletes(value)}>Delete</DeleteIcon>


                            </Card>
                        )

                    })
                }
            </div>
        </div>
    )
}
export default Getpostdata;