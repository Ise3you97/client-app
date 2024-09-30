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
    {/* Constantes */ }
    const [prompt, setPrompt] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<ChatEntry[]>(() => {
        const savedHistory = localStorage.getItem('chatHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(() => {
        return localStorage.getItem('username') || null;
    });
    const [displayedText, setDisplayedText] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory]);

    useEffect(() => {
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }, [chatHistory]);

    useEffect(() => {
        if (username) {
            localStorage.setItem('username', username);
        }
    }, [username]);

    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!username) {
            setError('Debe ingresar un nombre de usuario.');
            return;
        }

        try {
            // Add the new prompt to history with an empty response
            setChatHistory((prevHistory) => [...prevHistory, { prompt, response: '' }]);
            setPrompt('');

            // Get the response from the server
            const res = await axios.post('http://localhost:5000/api/obtener-respuesta', { prompt, speaker: username });
            const response = res.data.output;
            console.log(res.data);

            // Start typing effect
            typeText(response);
        } catch (err) {
            setError('Error al obtener la respuesta.');
            console.error(err);
        } finally {
            setLoading(false); // Set loading to false after response is processed
        }
    };

    // Function to show text character by character
    const typeText = (fullText: string) => {
        let index = 0;
        setDisplayedText('');
        setIsTyping(true);

        const typingInterval = setInterval(() => {
            setDisplayedText((prev) => prev + fullText[index]);
            index++;
            if (index === fullText.length) {
                clearInterval(typingInterval);
                setIsTyping(false);
                // Update the last message with the full response
                setChatHistory((prevHistory) => {
                    const updatedHistory = [...prevHistory];
                    updatedHistory[updatedHistory.length - 1].response = fullText;
                    return updatedHistory;
                });
            }
        }, 10); // Adjust typing speed here (ms)
    };

    const handleUsernameSubmit = (username: string) => {
        setUsername(username);
    };

    const handleShowDataDisplay = () => {
        navigate('/data-display');
    };

    return (
        <div className="chat-container">
            {!username ? (
                <UsernameForm onUsernameSubmit={handleUsernameSubmit} />
            ) : (
                <>
                    <h1>Chat con GPT - {username}</h1>
                    <div className="chat-history">
                        {chatHistory.map((entry, index) => (
                            <div key={index} className="chat-entry">
                                <div className="prompt-box">
                                    <p>{entry.prompt}</p>
                                    <div className='options' onClick={handleShowDataDisplay}>
                                        <i className="bi bi-clock-history"></i>
                                    </div>
                                </div>
                                <div className="avatar avatar-prompt">
                                    <h2 className='avatar-h2'>
                                        {username[0].toUpperCase()}
                                    </h2>
                                </div>
                                {/* Show Response with typing effect */}
                                <div className="response-box">
                                    <p>
                                        {index === chatHistory.length - 1 && isTyping
                                            ? displayedText : entry.response
                                        }
                                        {index === chatHistory.length - 1 && isTyping && <span className="blinking-cursor">|</span>}
                                    </p>
                                    <div className="avatar avatar-response">
                                        <h2 className='avatar-h2'>
                                            S
                                        </h2>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))}

                        {/* Condicion para conocer si no se a enviado una respuesta */}
                        {loading && (<div >Esperando respuesta...</div>)}

                        <div ref={lastMessageRef} />
                    </div>

                    {/* Mostrar error en caso de existir */}
                    {error && <div style={{ color: 'red' }}>{error}</div>}

                    {/* Enviar Prompt ingresado por el usuario */}
                    <form className="chat-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            disabled={loading}
                            style={{cursor: loading? 'not-allowed': 'pointer'}}
                            value={prompt}
                            onChange={handlePromptChange}
                            placeholder="Escribe tu pregunta"
                            required
                        />
                        <button type="submit"
                         disabled={loading} 
                        style={{
                            backgroundColor: loading ? 'gray' : 'blue', 
                            color: loading ? 'black' : 'white', 
                            cursor: loading ? 'not-allowed' : 'pointer', 
                        }}>Enviar</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default ChatComponent;
