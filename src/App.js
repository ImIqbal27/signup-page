import './App.css';
import Login from './components/Login';
import { Routes, Route } from "react-router-dom";
import Signup from './components/Signup';
import Home from './components/Home';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className=''>


      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='signup' element={<Signup></Signup>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
