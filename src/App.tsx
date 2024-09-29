// src/App.tsx
import React from 'react';
import './App.css';
import ChatComponent from './components/ChatComponent';

const App: React.FC = () => {
    return (
        <div className="App">
            <ChatComponent />
        </div>
    );
}

export default App;
