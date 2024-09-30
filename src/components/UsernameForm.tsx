import React, { useState } from 'react';
import './Css/UsernameForm.css'; 

interface UsernameFormProps {
    onUsernameSubmit: (username: string) => void;
}

const UsernameForm: React.FC<UsernameFormProps> = ({ onUsernameSubmit }) => {
    const [username, setUsername] = useState<string>('');

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    // Almacenar nombre de usuario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onUsernameSubmit(username);
    };

    // Inicio de HTML 
    return (
        // Form para ingreso del nombre de usuario
        <div className="username-form-container">
            <form className="username-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Nombre de Usuario</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Ingresa tu nombre de usuario"
                    required
                />
                <button type="submit">Iniciar Chat</button>
            </form>
        </div>
    );
};

export default UsernameForm;
