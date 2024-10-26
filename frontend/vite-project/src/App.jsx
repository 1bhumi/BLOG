import React from 'react'
import Blog from "./pages/blog"
import Login from './pages/login'
import Signup from './pages/signup'
import { Route, Routes } from "react-router-dom";

function App() {
  
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Blog/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
      
    </div>
  )
}

export default App
