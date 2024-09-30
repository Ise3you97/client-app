import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Css/ChatComponent.css'; 
import UsernameForm from './UsernameForm';

interface ChatEntry {
    prompt: string;
    response: string;
}

const ChatComponent: React.FC = () => {

    const [prompt, setPrompt] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<ChatEntry[]>(() => {
        const savedHistory = localStorage.getItem('chatHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(() => {
        // Recuperar el nombre de usuario desde localStorage
        return localStorage.getItem('username') || null;
    });
    
    const navigate = useNavigate(); 

    // Crear referencia para el último mensaje
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    // Efecto para hacer scroll al último mensaje cuando el historial cambie
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory]);

    // Efecto para almacenar el historial en localStorage cuando cambia
    useEffect(() => {
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }, [chatHistory]);

    // Efecto para almacenar el nombre de usuario en localStorage
    useEffect(() => {
        if (username) {
            localStorage.setItem('username', username);
        }
    }, [username]);

    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    };

    // Obtener respuesta del servidor al enviar un promt
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await axios.post('http://localhost:5000/api/obtener-respuesta', { prompt, speaker: username });
            const response = res.data.output;
            console.log(res.data);
            setChatHistory((prevHistory) => [...prevHistory, { prompt, response }]);
            setPrompt('');
        } catch (err) {
            setError('Error al obtener la respuesta.');
            console.error(err);
        }
    };

    const handleUsernameSubmit = (username: string) => {
        setUsername(username);
    };

    const handleShowDataDisplay = () => {
        navigate('/data-display');
    };

    //Inicio de HTML
    return (
        <div className="chat-container">
            {!username ? (
                <UsernameForm onUsernameSubmit={handleUsernameSubmit} /> /* Iniciar Chat si se ingresa un nombre de usuario*/
            ) : (
                <>
                    {/* Chat Bot */}
                    <h1>Chat con GPT - {username}</h1>
                    <div className="chat-history"> 
                        {/* Mapeo del chat */}
                        {chatHistory.map((entry, index) => (
                            <div key={index} className="chat-entry">
                                <div className="prompt-box">
                                    <p>{entry.prompt}</p>
                                    <div className='options' onClick={handleShowDataDisplay}>
                                        <i className="bi bi-clock-history"></i>
                                    </div>
                                </div>
                                {/* Imagen con la primera letra del usuario */}
                                <div className="avatar avatar-prompt">
                                    <h2 className='avatar-h2'>
                                        {username[0]}
                                    </h2>
                                </div>
                                <div className="response-box">
                                    <p>{entry.response}</p>
                                    <div className="avatar avatar-response">
                                        <h2 className='avatar-h2'>
                                            S
                                        </h2>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))}
                        <div ref={lastMessageRef} />
                    </div>
                     {/* Muestra de errores en caso de existir */}   
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    {/* Envio del prompt */}
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
                </>
            )}
        </div>
    );
};

export default ChatComponent;
