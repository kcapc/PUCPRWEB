import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            senha: "",
            erro: "" // Para armazenar mensagens de erro
        };

        this.acessar = this.acessar.bind(this);
    }

    async acessar() {
        try {
            // Autenticar usuário com e-mail e senha
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha);
            window.location.href = "./principal"; // Redirecionar para a página principal
        } catch (error) {
            console.error("Erro ao acessar:", error);
            this.setState({ erro: "Usuário não cadastrado ou erro nas credenciais" }); // Exibir mensagem de erro
        }
    }

    render() {
        const containerStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f9f9f9',
        };

        const formStyle = {
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            width: '350px',
            textAlign: 'center',
        };

        const inputStyle = {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
        };

        const buttonStyle = {
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#28a745',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            margin: '10px 0'
        };

        const registerButtonStyle = {
            ...buttonStyle,
            backgroundColor: '#007bff',
        };

        return (
            <div style={containerStyle}>
                <div style={formStyle}>
                    <h1>Login</h1>
                    {this.state.erro && <p style={{ color: 'red' }}>{this.state.erro}</p>}
                    <input
                        type="text"
                        placeholder="E-mail"
                        onChange={(e) => this.setState({ email: e.target.value })}
                        style={inputStyle}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        onChange={(e) => this.setState({ senha: e.target.value })}
                        style={inputStyle}
                    />
                    <button onClick={this.acessar} style={buttonStyle}>Acessar</button>
                    <Link to="/cadastro">
                        <button style={registerButtonStyle}>Cadastrar</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Login;
