
import React from "react"

import HomePage from "./pages/HomPage"
import { Routes,Route } from "react-router-dom"
import AboutUS from "./pages/AboutUsPage"
import NotFound from "./pages/NotFound"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

import Contact from "./pages/Contact"
import Denied from "./pages/Denied"
import CourseDescription from "./pages/Course/CourseDescription"
import RequireAuth from "./Components/Auth/RequireAuth"
import CreateCourse from "./pages/Course/CreateCourse"

 import CourseList from "./pages/Course/CourseList"
import Profile from "./pages/User/Profile"
import EditProfile from "./pages/User/EditProfile"
  
import Checkout from "./pages/Payment/checkout"


function App() {
  

  return (
    <>
    <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutUS />} />
  <Route path="/courses" element={<CourseList />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />
  <Route path="/course/description" element={<CourseDescription />} />

  {/* Protect routes with admin access */}
<Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
<Route path="/courses/createCourse" element={<CreateCourse/>}></Route>
</Route>

  <Route path="/denied" element={<Denied />} />

  {/* Protect routes with user access */}
 <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
 <Route path="/user/profile" element={<Profile/>}></Route>
 <Route path="/user/editprofile" element={<EditProfile/>}></Route>
 <Route path="/checkout" element={<Checkout/>}></Route>
 </Route>

  <Route path='*' element={<NotFound />} />
</Routes>

    </>
  )
}

export default App
