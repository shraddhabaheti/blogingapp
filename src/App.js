import './App.css';
import Registration from './Registration';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';

import PostData from './PostData';
import Getpostdata from './Getpostdata';
import Color from './Color';

function App() {
  
  return (
    <div className="App">
      
      <BrowserRouter>
     
       <Routes>
        
    <Route path="/" element={<Registration/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/postdata" element={<PostData/>}></Route>
    <Route path="/getpostdata" element={<Getpostdata/>}></Route>
      </Routes>
      </BrowserRouter>
    
     
      </div>
  );
}

export default App;
