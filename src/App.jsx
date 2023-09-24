
import React from "react"

import HomePage from "./pages/HomPage"
import { Routes,Route } from "react-router-dom"
import AboutUS from "./pages/AboutUsPage"
import NotFound from "./pages/NotFound"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import CourseList from "./pages/Course/COurseList"
import Contact from "./pages/Contact"
import Denied from "./pages/Denied"
import CourseDescription from "./pages/Course/CourseDescription"
import RequireAuth from "./Components/Auth/RequireAuth"
import CreateCourse from "./pages/Course/CreateCourse"


function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/about" element={<AboutUS/>}></Route>
      <Route path="/courses" element={<CourseList/>}></Route>
      <Route path="/contact" element={<Contact/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/course/description" element={<CourseDescription/>}></Route>
      <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
      <Route path="/course/create" element={<CreateCourse/>}></Route>
    </Route>
      <Route path="/denied" element={<Denied/>}></Route>
     
      <Route path='*' element={<NotFound/>}></Route>

    </Routes>
    </>
  )
}

export default App
