import './cliente.css';
import Title from '../../components/Title';
import Header from '../../components/Header';
import firebase from '../../services/firebaseConnection';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react';

import { toast } from 'react-toastify'

export default function Customers(){
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [setor, setSetor] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
  
    async function handleAdd(e){
        e.preventDefault();
        
        if(nome !== '' && cpf !== '' && setor !== '' && email !=='' && telefone !==''){
          await firebase.firestore().collection('customers')
          .add({
              nome: nome,
              cpf: cpf,
              setor: setor,
              email: email,
              telefone: telefone
          })
          .then(()=>{
              setNome('');
              setCpf('');
              setEmail('');
              setSetor('');
              setTelefone('');
              toast.info('Dados de usuário cadastrado com sucesso!');
          })
          .catch((error)=>{
            console.log(error);
            toast.error('Erro ao cadastrar essa empresa');
          })
        }else{
            toast.error('Preencha todos os campos!')
        }
    }

    return(
        <div>
            <Header/>
            
            <div className="content">
                <Title name="Dados do Cliente">
                  <FiUser size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile customers" onSubmit={handleAdd}>
                        <label>Nome</label>
                        <input type="text" placeholder="Nome" value={nome} onChange={ (e) => setNome(e.target.value) } />
                        
                        <label>CPF</label>
                        <input type="text" placeholder="Seu CPF" value={cpf} onChange={ (e) => setCpf(e.target.value) } />
                        
                        <label>Setor</label>
                        <input type="text" placeholder="Nome do Setor" value={setor} onChange={ (e) => setSetor(e.target.value) } />

                        <label>E-mail</label>
                        <input type="text" placeholder="E-mail para contato" value={email} onChange={ (e) => setEmail(e.target.value) } />

                        <label>Telefones</label>
                        <input type="text" placeholder="Número para contato" value={telefone} onChange={ (e) => setTelefone(e.target.value) } />
                        <br/>
                        <button type="submit">Cadastrar Dados</button>

                    </form>
                </div>
            </div>
        </div>
    )
}