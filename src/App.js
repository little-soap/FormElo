import React, { useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import "./styles.css";
import Logo from "./logo_elo.png";

import Input from './components/Form/Input';

function App() {

  const formRef = useRef(null);



  async function handleSubmit(data, {reset}){

    try{
      const form = Yup.object().shape({
      usr : Yup
        .string()
        .required('Esse campo é obrigatório'),

      pwd : Yup
        .string()
        .min(8, 'Mínimo 8 caracteres')
        .matches(/[a-zA-Z]/, 'Mínimo uma letra')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mínimo um caracter especial')
        .matches(/[0-9]/, 'Mínimo um número')
        .required('Esse campo é obrigatório'),

      pwdconf : Yup
        .string()
        .oneOf([Yup.ref('pwd'),null],'A confirmação precisa ser igual a password')
        .required('Esse campo é obrigatório')

    });
    
    await form.validate(data, {abortEarly : false})
     console.log(data);
     reset();
     alert('Registro concluído com sucesso!');

    } catch (err){

      if(err instanceof Yup.ValidationError){
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;

        })

        formRef.current.setErrors(errorMessages);

      }
    }
    
  }

  return (
    <div className="App">

      <Form ref = {formRef} onSubmit={handleSubmit}>

        <img
          src={Logo}
          alt = "Logo"
        />

        <Input   
          name = "usr" 
          label = 'Usuário *' />

        <Input 
          type="password" 
          name="pwd" 
          label = 'Password *' />

        <Input   
          type="password" 
          name="pwdconf"
          label = 'Confirmação password *' />

        <button type="submit">Registrar</button>


      </Form>
    </div>
  );
}

export default App;
