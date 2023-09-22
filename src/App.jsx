
import React from "react"

import HomePage from "./pages/HomPage"
import { Routes,Route } from "react-router-dom"
import AboutUS from "./pages/AboutUsPage"
import NotFound from "./pages/NotFound"
import Signup from "./pages/Signup"


function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/about" element={<AboutUS/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>

      <Route path='*' element={<NotFound/>}></Route>
    </Routes>
    </>
  )
}

export default App
