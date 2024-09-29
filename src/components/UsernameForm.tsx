// src/components/UsernameForm.tsx
import React, { useState } from 'react';
import './Css/UsernameForm.css'; // Importar el archivo CSS

interface UsernameFormProps {
    onUsernameSubmit: (username: string) => void;
}

const UsernameForm: React.FC<UsernameFormProps> = ({ onUsernameSubmit }) => {
    const [username, setUsername] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username.trim() === '') {
            setError('El nombre de usuario es obligatorio');
        } else {
            setError(null);
            onUsernameSubmit(username);
        }
    };

    return (
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
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default UsernameForm;
