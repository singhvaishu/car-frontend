import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarList from './components/Car/CarList';
import CarDetail from './components/Car/CarDetail';
import CarForm from './components/Car/CarForm';
import EditCar from './components/Car/EditCar'; // Import the EditCar component
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/cars/new" element={<CarForm />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="/cars/edit/:id" element={<EditCar />} /> {/* New route for editing a car */}
      </Routes>
    </Router>
  );
};

export default App;
