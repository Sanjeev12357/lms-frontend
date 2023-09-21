
import React from "react"

import HomePage from "./pages/HomPage"
import { Routes,Route } from "react-router-dom"
import AboutUS from "./pages/AboutUsPage"


function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/about" element={<AboutUS/>}></Route>
    </Routes>
    </>
  )
}

export default App
