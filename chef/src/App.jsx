import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Adds from './pages/adds/add.jsx';
import List from './pages/list/list.jsx';
import NavBar from './components/navbar/navbar.jsx';
import SideBar from './components/sidebar/sidebar.jsx';
// import Ans from './pages/adminAns/adminAns.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const url = "http://localhost:4000";
  return (
    <div>
      <ToastContainer />
      <NavBar />
      <hr />
      <SideBar />
      <Routes>
        <Route path='/add' element={<Adds url={url}/>} />
        <Route path='/list' element={<List url={url}/>} />
         {/* <Route path='/ans' element={<Ans url={url}/>} /> */}
      </Routes>
    </div>
  );
}

export default App;

