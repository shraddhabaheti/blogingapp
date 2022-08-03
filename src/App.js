import './App.css';
import Registration from './Registration';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';

import PostData from './PostData';
import Getpostdata from './Getpostdata';

import Getpost from './Getpost';

function App() {
  
  return (
    <div className="App">
      
      <BrowserRouter>
     
       <Routes>
        
    <Route path="/" element={<Registration/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/postdata" element={<PostData/>}></Route>
    <Route path="/getpostdata" element={<Getpostdata/>}></Route>
    <Route path="/getpost" element={<Getpost/>}></Route>
      </Routes>
      </BrowserRouter>
    
     
      </div>
  );
}

export default App;
