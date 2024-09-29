// src/components/ChatComponent.tsx
import React, { useState } from 'react';
import axios from 'axios';
import './Css/ChatComponent.css'; // Estilos CSS personalizados
import UsernameForm from './UsernameForm';


interface ChatEntry {
    prompt: string;
    response: string;
}

const ChatComponent: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await axios.post('http://localhost:5000/api/obtener-respuesta', { prompt });
            const response = res.data.respuesta;
            
            const endTime = new Date(); // Marca el tiempo de fin
            const timestamp = endTime.toISOString(); // Genera el timestamp ISO 8601

            // Muestra el tiempo de respuesta y la respuesta en la consola
            console.log(`Timestamp de respuesta: ${timestamp}`);
            console.log(`Respuesta: ${response}`);

            // Agregar el nuevo prompt y respuesta al historial
            setChatHistory((prevHistory) => [...prevHistory, { prompt, response }]);
            setPrompt(''); // Limpiar el campo de entrada
        } catch (err) {
            setError('Error al obtener la respuesta.');
            console.error(err);
        }
    };

    return (
        <div className="chat-container">
            <UsernameForm/>
            <h1>Chat con GPT</h1>

            {/* Mostrar el historial de prompts y respuestas */}
            <div className="chat-history">
                {chatHistory.map((entry, index) => (
                    <div key={index} className="chat-entry">
                        <div className="prompt-box">
                            <div className="avatar avatar-prompt">
                                <h2 className='avatar-h2'>K</h2>
                            </div> {/* Círculo marrón para prompt */}
                            <p>{entry.prompt}</p>
                        </div>
                        <div className="response-box">
                            <p>{entry.response}</p>
                            <div className="avatar avatar-response">
                            <h2 className='avatar-h2'>B</h2>
                            </div> {/* Círculo marrón para respuesta */}
                        </div>
                        <hr />
                    </div>
                ))}
            </div>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            {/* Formulario de entrada y botón */}
            <form className="chat-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={prompt}
                    onChange={handlePromptChange}
                    placeholder="Escribe tu pregunta"
                    required
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default ChatComponent;
