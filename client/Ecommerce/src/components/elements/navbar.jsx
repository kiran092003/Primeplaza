import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlineShoppingCart } from "react-icons/md";
import {userinfo} from "../services/api";
import { GoBell } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import { MdLogout } from "react-icons/md";
import CategoriesDropdown from "./CategoriesDropdown";


function Navbar(){
    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState(null);
    const [categoriesDropdown, setCategoriesDropdown] = useState(false);
    const [dropdown, setDropDown] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("PrimeplazaToken");
        localStorage.removeItem("PrimeplazaId");
        setIsLogin(false);
        setDropDown(false);
      };

      useEffect(() => {
        const fetchUserInfo = async () => {
          try {
            const data = await userinfo();
            setUserData(data.user);
            setIsLogin(true);
          } catch (error) {}
        };
        fetchUserInfo();
      }, []);

    return (
        <>
            <div className="bg-white w-full h-20 text-black py-2 shadow-lg sticky z-50 top-0 flex items-center mb-8"       onMouseEnter={() => setCategoriesDropdown(false)}
                >
             <div className="h-full w-1/5  flex justify-start gap-3 items-center pl-2 pt-4 cursor-pointer">
                <img
                src="https://firebasestorage.googleapis.com/v0/b/primeplaza-b7db1.appspot.com/o/Logo%20maker%20project%20(4).png?alt=media&token=057eabe9-f882-4e64-a796-7aed8f472188"
                 alt="Brand-logo"
                className="w-50 h-120"
                />
             </div>
                <div className="h-full w-[36%] flex items-center justify-between">
                    <ul className="text-gray-900 text-xl flex gap-5 justify-center items-center">
                        <Link to="/"  className="cursor-pointer pr-4  text-txt hover:border-b-2 transition-all duration-200">Home</Link>
                        <li
                        className="cursor-pointer text-txt hover:border-b-2 pr-4  transition-all duration-200"
                         onMouseEnter={() => setCategoriesDropdown(true)}
                        >
                            Categories
                        </li>
                        <li className="cursor-pointer text-txt hover:border-b-2  pr-4 transition-all duration-200">
                            Offers
                        </li>
                        <li className="cursor-pointer text-txt hover:border-b-2 pr-4  transition-all duration-200">
                            About Us
                        </li>
                    </ul>
                    {categoriesDropdown && (
                    <>
                        <div
                         className="w-[60vw] h-[40vh] bg-white absolute top-20 z-20 border-t-2"
                         onMouseLeave={() => setCategoriesDropdown(false)}
                        >
                        <CategoriesDropdown />
                     </div>
                        <div
                        className="h-screen w-[98.7vw] absolute top-20 left-0 bg-black opacity-20 z-10"
                        onMouseEnter={() => setCategoriesDropdown(false)}></div>
                    </>
                    )}
                </div>
                <div className="py-2 px-2 bg-page_theam h-fit w-80 flex items-center gap-4">
                    <IoIosSearch className="w-5 h-5 text-txt" />
                    <input
                    type="search"
                    className="w-full bg-transparent outline-none text-[0.8rem] placeholder-txt_col"
                    placeholder="Search for products,brand and more"
                    />
                </div>
                <div className="h-full flex items-center pl-10">
                    <Link className="h-10 w-10 p-2 rounded-full mr-2 cursor-pointer hover:bg-page_theam text-txt transition-all duration-150">
                    <MdOutlineShoppingCart size="25px"/>
                    </Link>
                     <div
                    className="h-10 w-36 bg-white rounded-full px-3 flex justify-between items-center cursor-pointer"
                    onClick={() => setDropDown((prev) => !prev)}>
                    {!isLogin ? (
                        <>
                        <Link className="roboto text-txt" to="/userlogin">
                          Login
                         </Link>
                        <p className="roboto text-txt">/</p>
                         <Link
                        className="roboto text-log_btn  "
                         to="/signup"
                         >
                         Sign Up
                        </Link>
                         </>
                         ) : (
                         <>
                         <p className="h-[40px] w-[40px] text-txt rounded-full bg-page_theam flex justify-center items-center text-xl font-logo uppercase ml-8">
                            {userData.username[0]}
                        </p>
                        <RiArrowDropDownLine size="35px" className="text-txt"/>
                        </>
                        )}
                     </div>
                </div>
                {dropdown && userData && (
                      <div className="shadow-lg h-56 w-64 absolute right-0  top-20 flex flex-col bg-white border-1">
                        <div className="flex items-center h-24 w-full border-b-2 border-t-2 cursor-pointer">
                            <div>
                            <p className="h-[40px] w-[40px] rounded-full ml-1 bg-page_theam text-txt font-logo flex justify-center items-center  text-lg uppercase ">
                            {userData.username[0]}
                            </p>
                            </div>   
                            <div className="flex-col items-center justify-center pl-4 pb-1">
                            <p className="text-lg font-bold uppercase text-txt flex justify-start items-center"> {userData.username}</p>
                            <p className="text-xs flex justify-center text-txt font-medium items-center">{userData.email}</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between h-20 w-full border-b-2 ">
                            <div className="flex items-center h-10 w-full">
                                <CiUser size="20px" className="font-extrabold ml-1 text-txt"/>
                                <Link className="text-lg pl-3 text-txt">Profile</Link>
                            </div>
                            <div className="flex items-center h-10 w-full">
                                <GoBell className="ml-1 text-txt"/>
                                <Link className="text-lg pl-3 text-txt">Notification</Link>
                            </div>
                        </div>
                        <div className="flex items-center h-20 w-full">
                            <MdLogout className="ml-2 text-txt" size="20px"/>
                            <button className="text-lg pl-3 pb-1 text-txt" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    ); 
}

export default Navbar;