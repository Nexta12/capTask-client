
import { paths } from "@routes/paths";

import { IoIosLogOut  } from "react-icons/io";
import { MdDashboard,  } from "react-icons/md";

import { FaRegAddressCard, } from "react-icons/fa";
import {  BsGraphUpArrow, BsListCheck, BsPeople,} from "react-icons/bs";


export const DashMiddleMenu = [
    {
      title: "Dashboard",
      link: paths.AdminDashboard,
      icon: MdDashboard,
    },
    {
      title: "Tasks",
      link: paths.Tasks,
      icon: BsGraphUpArrow ,
    },
    {
      title: "Users",
      link: paths.Users,
      icon: BsPeople ,
    },
  
  ];

export const GuestDashenu = [
    {
      title: "Dashboard",
      link: paths.GuestDashboard,
      icon: MdDashboard,
    },
    {
      title: "My Tasks",
      link: paths.StaffTasks,
      icon: FaRegAddressCard ,
    },
  
  ];
  
   export const DashBottomMenu = [
  
    {
      title: "Notes",
      link: paths.Notes,
      icon: BsListCheck,
    },
    {
      title: "Logout",
      link: "#",
      icon: IoIosLogOut,
    },
  ];
  