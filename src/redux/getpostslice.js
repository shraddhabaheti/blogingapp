import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getapi=createAsyncThunk(
'getpost',
  async()=>{
     
      try {
          let token=localStorage.getItem('token')
          
          let res=await axios.get(`http://192.168.1.27:4000/posts/getallposts`,{
              headers:{
                'Authorization': `Bearer ${token}`,
              }
             });
        return res.data
        
      } catch (error) {
          console.log(error)
      }

  }
)
const getpostslice = createSlice({
    
    name :'getpost',
    initialState:{ 
        
        data :[],
        status: 'idle',
        loading: false
    },
    reducers:{},
    extraReducers:(builder)=>{
        
        builder.addCase(getapi.fulfilled,(state,action)=>{
           
          state.data=action.payload;
          state.status='idle'
        })
        .addCase(getapi.pending,(state)=>{
         
            state.status='loading'
        })
        .addCase(getapi.rejected,(state)=>{
           
            state.status="error"
        })

    }
      

})
export const {rootReducer}=getpostslice.actions;
export default getpostslice.reducer;