import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default class Layout extends Component {
    state = {

    }

    render() {
        return <>

            <Navbar />

            <Outlet />

            <Footer />
        </>

    }
}
