// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import AddExpense from './components/AddExpense';
import Settle from './components/Settle';
import Dashboard from './components/Dashboard';
import './App.css';
import AddGroup from './components/AddGroup'
import Default from "./components/Default";
const App = () => {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);





  return (
      <Router>
        <div>

          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/settle" element={<Settle />} />
            <Route path="/" element={<Default/>} />
            <Route path="/dashboard" element={<Dashboard  />} />
            <Route path="/add-group" element={<AddGroup/>} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
