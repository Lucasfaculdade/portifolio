import { useState, useContext, useEffect } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { AuthContext } from '../../contexts/auth';
import './novo.css';
import firebase from '../../services/firebaseConnection';
import { FiPlus } from 'react-icons/fi';
import { type } from 'os';

export default function NovoChamado(){
    
    const [loadCustomers, setLoadCustomers] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [customerSelected, setCustomersSelected] = useState(0);

    const [nomeCliente, setnomeCliente] = useState('');
    const [setor, setSetor] = useState('');
    const [telefone, setTelefone] = useState('');
    const [complemento, setComplemento] = useState('');

    const { user } = useContext(AuthContext);
    
    useEffect(()=>{
        async function loadCustomers(){
           await firebase.firestore().collection('customers')
           .get()
           .then((snapshot)=>{
               let lista = [];

               snapshot.forEach((doc)=>{
                 lista.push({
                     id: doc.id,
                     setor: doc.data().setor
                 })
               })
               if(lista.length === 0){
                 console.log('Nenhum setor encontrado');
                 setCustomers([{id: '1', setor: 'sede'}]);
                 setLoadCustomers(false);
                 return;
               }
               setCustomers(lista);
               setLoadCustomers(false);
           })
           .catch((error)=>{
               console.log('Deu erro', error);
               setLoadCustomers(false);
               setCustomers([{id: '1', setor: ''}]);

           })
        }
        loadCustomers();
    }, []);

    function handleRegister(e){
       e.preventDefault();
       alert('TESTE')
    }

    function handleChangeSelect(e){
       console.log('index do setor selecionado', e.target.value);
       console.log('Setor selecionado', customers[e.target.value]);
    }
    
    function handleChangeOption(e){
        setnomeCliente(e.target.value);
    }

    return(
        <div>
           <Header />
           <div className="content">
               <Title name="Novo Chamado">
                   <FiPlus size={25}/>
               </Title>
             <div className="container" >
                 <form className="form-profile" onSubmit={handleRegister}>
                     <label>Nome de Cliente</label>
                     <input type="text" placeholder="Nome do Cliente" value={nomeCliente} onChange={handleChangeOption}/>

                     <label>Setor</label>
                     <select value={customerSelected} onChange={handleChangeSelect}>
                        {customers.map((item, index) =>{
                            return(
                                <option key={item.setor} value={index}>
                                    {item.setor}
                                </option>
                            )
                        })}
                     </select>

                     <label>Telefone</label>
                     <input  type="text" placeholder="Telefone para contato 55+ (61)91234-5678" value={telefone} onChange={ (e) => setTelefone(e.target.value) }/>
                     
                     <label>Descrição</label>
                     <textarea
                     type="text"
                     value={complemento}
                     placeholder="Descreva o ocorrido (Opcional)."
                     onChange={ (e) => setComplemento(e.target)}
                     />
                     
                     <br/>
                     <button type="submit">Registrar</button>
                 </form>
             </div>
           </div>
        </div>
    )
}