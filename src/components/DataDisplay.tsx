import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Css/DataDisplay.css'; 

interface Prompt {
    prompt: string;
    speaker: string;
    text: string;
}

const DataDisplay: React.FC = () => {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPrompts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/data');
                setPrompts(response.data);
            } catch (err) {
                setError('Error al obtener los datos.');
                console.error(err);
            }
        };

        fetchPrompts();
    }, []);

    return (
        <div className="data-display-container">
            <h1>Historial</h1>
            <p style={{ fontStyle: 'italic', color: '#666' }}>
            </p>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <ul>
                {prompts.map((entry, index) => (
                    <li key={index}>
                        <strong>{entry.speaker}:</strong> {entry.prompt} - {entry.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DataDisplay;
