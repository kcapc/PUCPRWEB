import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // Importe Link
import firebase from '../../firebase'; // Certifique-se de que o caminho esteja correto

class Cadastro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            senha: "",
            nome: "",
            sobrenome: "",
            nascimento: "",
            erro: "" // Para armazenar mensagens de erro
        };

        this.gravar = this.gravar.bind(this);
    }

    async gravar() {
        try {
            // Criar usuário com e-mail e senha
            const retorno = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha);

            // Gravar dados no Firestore
            await firebase.firestore().collection("usuario").doc(retorno.user.uid).set({
                nome: this.state.nome,
                sobrenome: this.state.sobrenome,
                nascimento: this.state.nascimento,
                uid: retorno.user.uid 
            });

            console.log("Usuário criado e dados gravados com sucesso");

            // Alerta de sucesso
            alert("Cadastrado com sucesso!");

            // Limpar campos do formulário
            this.setState({
                email: "",
                senha: "",
                nome: "",
                sobrenome: "",
                nascimento: "",
                erro: "" // Limpar mensagens de erro
            });

        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            this.setState({ erro: error.message }); 
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
            textAlign: 'center'
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

        const backButtonStyle = {
            ...buttonStyle,
            backgroundColor: '#007bff', // Cor azul para o botão de voltar
        };

        return (
            <div style={containerStyle}>
                <div style={formStyle}>
                    <h1>Tela de Cadastro</h1>
                    {this.state.erro && <p style={{ color: 'red' }}>{this.state.erro}</p>}
                    <input
                        type="text"
                        placeholder="E-mail"
                        onChange={(e) => this.setState({ email: e.target.value })}
                        style={inputStyle}
                        value={this.state.email} // Adicione o valor do estado
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        onChange={(e) => this.setState({ senha: e.target.value })}
                        style={inputStyle}
                        value={this.state.senha} // Adicione o valor do estado
                    />
                    <input
                        type="text"
                        placeholder="Nome"
                        onChange={(e) => this.setState({ nome: e.target.value })}
                        style={inputStyle}
                        value={this.state.nome} // Adicione o valor do estado
                    />
                    <input
                        type="text"
                        placeholder="Sobrenome"
                        onChange={(e) => this.setState({ sobrenome: e.target.value })}
                        style={inputStyle}
                        value={this.state.sobrenome} // Adicione o valor do estado
                    />
                    <input
                        type="date"
                        placeholder="Data de Nascimento"
                        onChange={(e) => this.setState({ nascimento: e.target.value })}
                        style={inputStyle}
                        value={this.state.nascimento} // Adicione o valor do estado
                    />
                    <button onClick={this.gravar} style={buttonStyle}>Gravar</button>
                    <Link to="/">
                        <button style={backButtonStyle}>Voltar</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Cadastro;
