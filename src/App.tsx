// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ChatComponent from './components/ChatComponent';
import DataDisplay from './components/DataDisplay';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ChatComponent />} />
                <Route path="/data-display" element={<DataDisplay />} />
            </Routes>
        </Router>
    );
};

export default App;
