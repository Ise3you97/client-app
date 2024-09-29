// src/components/UsernameForm.tsx
import React, { useState } from 'react';

const UsernameForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username) {
            setError('El nombre de usuario es obligatorio');
        } else {
            setError(null);
            console.log('Nombre de usuario ingresado:', username);
            // Aquí puedes agregar cualquier lógica adicional después del ingreso del nombre de usuario.
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Nombre de Usuario:</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Ingresa tu nombre de usuario"
                required
            />
            <button type="submit">Enviar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default UsernameForm;
