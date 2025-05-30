import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/LoginPage.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            // Aqui será implementada a chamada à API quando estiver pronta
            setMessage('Se este e-mail estiver cadastrado, você receberá as instruções para redefinir sua senha.');
        } catch (err) {
            setError('Ocorreu um erro ao processar sua solicitação. Tente novamente.');
        }
    };

    return (
        <div className="login-container">
            <h2 className="title-login">Recuperar Senha</h2>
            <div className="separator"></div>
            
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu e-mail"
                        required
                    />
                </div>

                <button type="submit" className="login-button">
                    Enviar Instruções
                </button>
            </form>

            <div className="links">
                <Link to="/login">Voltar para o Login</Link>
            </div>
        </div>
    );
};

export default ForgotPassword; 