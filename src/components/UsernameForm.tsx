import React, { useState } from 'react';
import './Css/UsernameForm.css'; // Importar el archivo CSS

interface UsernameFormProps {
    onUsernameSubmit: (username: string) => void;
}

const UsernameForm: React.FC<UsernameFormProps> = ({ onUsernameSubmit }) => {
    const [username, setUsername] = useState<string>('');

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username.trim() === '') {
            console.log('El nombre de usuario es obligatorio');
        } else {
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
            </form>
        </div>
    );
};

export default UsernameForm;
