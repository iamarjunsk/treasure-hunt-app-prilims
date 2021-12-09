import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Admin from './Admin';
import Home from "./Home";
// import Result from './Result';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/admin" element={<Admin/>}/>
          {/* <Route path="/result" element={<Result/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
