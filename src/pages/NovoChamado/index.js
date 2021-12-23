import Header from '../../components/Header';
import Title from '../../components/Title';
import { useState, useContext } from 'react';
import './novo.css';

import { FiPlus } from 'react-icons/fi';
import { type } from 'os';

export default function NovoChamado(){
    const [nomeCliente, setnomeCliente] = useState('');
    const [setor, setsetor] = useState('');
    const [telefone, settelefone] = useState('');
    
    function handleRegister(e){
       e.preventDefault();
       alert('TESTE')
    }

    return(
        <div>
           <Header />
           <div className="content">
               <Title name="Novo Chamado">
                   <FiPlus size={25}/>
               </Title>
             <div className="container">
                 <form className="form-profile" onSubmit={handleRegister}>
                     <label>Nome de Cliente</label>
                     <input type="text" placeholder="Nome do Cliente" value={nomeCliente} onChange={ (e) => setnomeCliente(e.target.value) }/>

                     <label>Setor</label>
                     <input  type="text" placeholder="Setor" value={setor} onChange={ (e) => setsetor(e.target.value) }/>
                     
                     <label>Telefone</label>
                     <input  type="text" placeholder="Telefone para contato 55+ (61)91234-5678" value={telefone} onChange={ (e) => settelefone(e.target.value) }/>
                     
                     <label>Descrição</label>
                     <textarea
                     type="text"
                     placeholder="Descreva o ocorrido (Opcional)."
                     />
                     <br/>
                     <button type="submit">Registrar</button>
                 </form>
             </div>
           </div>
        </div>
    )
}