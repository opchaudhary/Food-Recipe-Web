// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage'
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import Register from './components/Register';
import AuthGuard from './guards/AuthGaurd';
import Dashboard from './components/Dashboard';
const App = () => {

  return ( 
<>
<AuthProvider>
    <Router>
      <div >
      <Routes>
        <Route path="*" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AuthGuard/>} >
        <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
      </Routes>
      </div>
    </Router>
   </AuthProvider>
    </>
  );
};

export default App;