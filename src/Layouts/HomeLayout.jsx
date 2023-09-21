

import {FiMenu} from "react-icons/fi";
import {AiFillCloseCircle} from "react-icons/ai";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function HomeLayout({children}){


    const dispatch=useDispatch();
    const navigate=useNavigate();

    const isLoggedIn=useSelector((state)=>state?.auth?.isLoggedIn);
    const role=useSelector((state)=>state?.auth?.role);

    function changeWidth(){
        const drawerSide=document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width='auto';
    }
    function hidedrawer(){
        const element=document.getElementsByClassName("drawer-toggle");
        element[0].checked=false;
        //changeWidth();
        const drawerSide=document.getElementsByClassName("drawer-side");
          drawerSide[0].style.width=0;
    }

    function handleLogout(e){
        e.preventdefault();

        //const res=await dispatch(logout());
       // if(res?.payload?.success)
        navigate("/");
    }
     return (
        < div className="min-h-[90vh]">
            <div className="drawer absolute left-0 z-50 w-fit">
                <input className="drawer-toggle " id="my-drawer" type="checkbox"/>
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu
                        onClick={changeWidth}
                        size={"32px"}
                        className=" font-bold text-white m-4"/>
                    </label>
                </div>
                <div  className="drawer-side w-0">
                    <label htmlFor="my-drawer" className="drawer-overlay">
                    </label>
                    <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-100 text-base-content relative">
                        <li className="w-fit absolute right-2 z-50"><button><AiFillCloseCircle size={24} onClick={hidedrawer}/></button></li>
                        <li>
                        <Link to="/">Home</Link>
                        </li>
                        {isLoggedIn && role==='ADMIN' &&(
                            <li>
                                <Link to="/admin/dashboard">
                                    Admin Dashboard
                                </Link>
                            </li>
                        )}

                        <li>
                        <Link to="/courses">Courses</Link>
                        </li>
                        <li>
                        <Link to="/contact">Contact</Link>
                        </li>
                        <li>
                        <Link to="/about">About us</Link>
                        </li>

                        {!isLoggedIn && (
                            <li className=" absolute bottom-4 w-[90%]">
                            <div className="w-full flex items-center justify-center ">
                            <button className="btn-primary px-4 py-1 font-semibold rounded-md w-full">
                                <Link to="/login"> Login</Link>
                            </button>
                            <button className="btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                                <Link to="/login"> Signup</Link>
                            </button>
                            </div>
                            </li>
                        )}
                        {isLoggedIn && (
                            <li className="absolute bottom-4 w-[90%]">
                            <div className="w-full flex items-center justify-center ">
                            <button className="btn-primary px-4 py-1 font-semibold rounded-md w-full">
                                <Link to="/user/profile"> Profile</Link>
                            </button>
                            <button className="btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                                <Link onClick={handleLogout}> Logout</Link>
                            </button>
                            </div>
                            </li>
                        )}
                    </ul>
                    
                </div>

            </div>
            {children}
           <Footer/>

        </div>
     )
}
export default HomeLayout;