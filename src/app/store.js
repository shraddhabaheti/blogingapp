import { configureStore } from "@reduxjs/toolkit";
import getpostslice from "../redux/getpostslice";
export default configureStore({
    reducer:{
       getpost: getpostslice,
    }
})