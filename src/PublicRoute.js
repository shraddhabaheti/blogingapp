import React from 'react'


import { Outlet, Navigate } from 'react-router-dom'

export default function PublicRoute() {
    let  token = localStorage.getItem("token") == null ? true : false;
    return (
        <>
            {token ? <Outlet  /> : <Navigate to="/getpostdata" />};
        </>

    )

}
