import { useState, useEffect, useContext } from 'react';
import firebase from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { AuthContext } from '../../contexts/auth';

import './novo.css';
import { FiPlusCircle } from 'react-icons/fi'

export default function NovoChamado(){
    
    const [loadCustomers, setLoadCustomers] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [customerSelected, setCustomersSelected] = useState(0);

    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('');

    const { user } = useContext(AuthContext);

    useEffect(()=> {
        async function loadCustomers(){
          await firebase.firestore().collection('customers')
          .get()
          .then((snapshot)=>{
              let lista = [];

              snapshot.forEach((doc) => {
                  lista.push({
                      id: doc.id,
                      nomeFantasia: doc.data().nomeFantasia
                  })
              })
              if(lista.length === 0){
                  console.log('Nenhuma empresa encontrada');
                  setCustomers([ { id: '1', nomeFantasia: 'Freira' } ]);
                  setLoadCustomers(false);
                  return;
            }
            setCustomers(lista);
            setLoadCustomers(false);
          })
          .catch((error)=>{
            console.log('Deu algum erro!', error);
            setLoadCustomers(false);
            setCustomers([{ id: '1', nomeFantasia: ''} ]);
          })
        }

        loadCustomers();
    }, []);

    function handleRegister(e){
    e.prevent.Default();

    alert('TESTE')
    }

    function handleChangeSelect(e){
      setAssunto(e.target.value);
    }

    function handleOptionChange(e){
      setStatus(e.target.value);
    }

    function handleChangeCustomers(e){
       console.log('INDEX DO CLIENTE SELECIONADO: ', e.target.value);
       console.log('Cliente selecionado ', customers[e.target.value])
    }

    return(
      <div>
          <Header/>
          <div className="content">
              <Title name="Novo Chamado">
                  <FiPlusCircle size={25}/>
              </Title>
              <div className="container">
                  <form className="form-profile" onSubmit={handleRegister}>

                      <label>Cliente</label>
                      <select value={customerSelected} onChange={handleChangeCustomers}>
                         {customers.map((item, index) => {
                             return(
                                 <option key={item.id} value={index} >
                                     {item.nomeFantasia}
                                 </option>
                             )
                         })} 
                      </select>

                      <label>Assunto</label> 
                      <select value={assunto} onChange={handleChangeSelect}>
                          <option value="Suporte">Suporte</option>
                          <option value="Visita Técnica">Visita técnica</option>
                          <option value="Financeiro">Financeiro</option>
                      </select>

                      <label>Status</label>
                       <div className="status">
                        <input
                         type="radio"
                         name="radio"
                         value="Aberto"
                         onChange={handleOptionChange}
                         checked={ status === 'Aberto' }
                        />
                        <span>Em Aberto</span>

                        <input
                         type="radio"
                         name="radio"
                         value="Em Atendimento"
                         onChange={handleOptionChange}
                         checked={ status === 'Progresso' }
                        />
                        <span>Em Atendimento</span>

                        <input
                         type="radio"
                         name="radio"
                         value="Em finalização"
                         onChange={handleOptionChange}
                         checked={ status === 'Finalizado' }
                        />
                        <span>Em finalização</span>
                       </div>
                       <label>Complemento</label>
                       <textarea
                         type="text"
                         placeholder="Descreva o ocorrido(obrigatorio)."
                         value={complemento}
                         onChange={ (e) => setComplemento(e.target.value)}
                       />

                       <button type="submit">Registrar</button>
                  </form>
              </div>
          </div>
      </div>
  )    
}