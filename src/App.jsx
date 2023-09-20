
import React from "react"

import HomePage from "./pages/HomPage"
import { Routes,Route } from "react-router-dom"


function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
    </Routes>
    </>
  )
}

export default App
