import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <IoIcons.IoIosPaper className="icon"/>,
        cName: 'sidebar-text'
    },
    {
        title: 'Make an order',
        path: '/postorder',
        icon: <AiIcons.AiFillHome className="icon"/>,
        cName: 'sidebar-text'
    },
    {
        title: 'All Orders',
        path: '/allorders',
        icon: <IoIcons.IoIosPaper className="icon"/>,
        cName: 'sidebar-text'
    },
    {
        title: 'Results',
        path: '/results',
        icon: <FaIcons.FaCartPlus className="icon"/>,
        cName: 'sidebar-text'
    },
    {
        title: 'Login',
        path: '/login',
        icon: <IoIcons.IoMdPeople className="icon"/>,
        cName: 'sidebar-text'
    },
    {
        title: 'Sign Up',
        path: '/signUp',
        icon: <IoIcons.IoMdPeople className="icon"/>,
        cName: 'sidebar-text'
    }
]