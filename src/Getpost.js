import { useEffect, useState } from "react";
import { getapi } from "./redux/getpostslice";
import { useDispatch, useSelector } from "react-redux";
import Color from "./Color";


function Getpost() {
    const data = useSelector((state) => state.getpost.data)
   const dispatch = useDispatch();
     useEffect(() => {
        dispatch(getapi())
    }, [])


     
    return (
        <div>
            <Color/>
            <h1 className="h1">Get post data redux</h1>
            {
                data.map((post,i)=>{
                    
                    return(
                        <div id={post._id}>
                            <h2>{post.title}</h2>
                            <h5>{post.content}</h5>
                            <img className="image1" src={post.image[0].replace('localhost', '192.168.1.27')} /><br />
                        </div>
                    )
                })
            }

         

        </div>
    )
}
export default Getpost;