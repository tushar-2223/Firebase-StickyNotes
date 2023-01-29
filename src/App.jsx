import React from 'react'
import Header from './components/Header';
import Home from './components/Home';
import Addnote from './components/Addnote';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <Addnote />
      <Header name="Firebase Sticky Notes" />

      <Home />

    </BrowserRouter>
  )
}

export default App
