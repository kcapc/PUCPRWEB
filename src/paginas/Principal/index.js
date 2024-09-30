import React, { Component } from 'react';
import firebase from '../../firebase';

class Principal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            sobrenome: "",
            nascimento: ""
        }
    }

    async componentDidMount() {
        await firebase.auth().onAuthStateChanged(async (usuario) => {
            if (usuario) {
                var uid = usuario.uid;

                await firebase.firestore().collection("usuario").doc(uid).get()
                    .then((retorno) => {
                        this.setState({
                            nome: retorno.data().nome,
                            sobrenome: retorno.data().sobrenome,
                            nascimento: retorno.data().nascimento
                        });
                    })
            }
        });
    }

    render() {
        const containerStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5',
        };

        const profileBoxStyle = {
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            width: '350px',
            textAlign: 'center',
        };

        const infoTextStyle = {
            fontSize: '18px',
            margin: '10px 0',
            color: '#333',
        };

        const titleStyle = {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#007bff',
        };

        return (
            <div style={containerStyle}>
                <div style={profileBoxStyle}>
                    <h1 style={titleStyle}>Informações do Usuário</h1>
                    <div style={infoTextStyle}>Nome: {this.state.nome}</div>
                    <div style={infoTextStyle}>Sobrenome: {this.state.sobrenome}</div>
                    <div style={infoTextStyle}>Nascimento: {this.state.nascimento}</div>
                </div>
            </div>
        );
    }
}

export default Principal;
