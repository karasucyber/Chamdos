
"use client";
import React, { FormEvent, useState, useRef } from "react";
import Modal from 'react-modal';
import emailjs from '@emailjs/browser';
import Win from "./Win";
import "./style.css";
import Demo from "../app/pop";

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [emailSent, setEmailSent] = useState<boolean | null>(null);
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current) {
      emailjs.sendForm('service_fl4twhq', 'template_5oims9r', form.current, {
        publicKey: 'Poxs5uXpRAqX-CHsK',
      })
        .then(
          () => {
            setEmailSent(true);
            setModalIsOpen(true);
            form.current?.reset(); // Limpa o formulário após o envio com sucesso
          },
          (error) => {
            setEmailSent(false);
            setModalIsOpen(true);
            console.log('Failed to send email:', error.text);
          }
        );
    }
  };

  return (
    <main className="primary-section">
      <div className="Nav-Bar"> 
        <img className="Logo_kopermax" src="Logo KoperMax.png" alt="Logo KoperMax" />
      </div>

      <div className="primary-container">
        <div className="container_Text"> 
          <h1>Bem-vindo ao nosso canal de suporte técnico!</h1>
          <p>Este é o seu ponto de apoio para qualquer problema técnico de hardware e software. Estamos aqui para ajudar você a resolver suas questões e garantir que tudo volte a funcionar rapidamente. Conte conosco para um suporte eficiente e sem complicações. Estamos prontos para tornar sua experiência mais tranquila e satisfatória!

</p>
        </div>
      </div>

      <div className="secundary-container">
        <div className="Container-Left">
          <form className="Form" ref={form} onSubmit={sendEmail}>
            <a className="Titulos_forms">Preencha o formulário</a>

            <div className="Forms-center">
              <input type="text" className="CampoST" placeholder="Seu Setor" name="setor" />
              <input type="text" className="CampoNM" placeholder="Seu nome" name="nome" /> 
            </div>

            <input type="text" className="CampoT" placeholder="Título da solicitação:" name="titulo" />

            <div className="Forms-center">
              <select className="Option" id="options" name="opcao">
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
                <option value="urgente">Urgente</option>
              </select>
            </div>

            <a className="Titulos_forms">Descreva sua solicitação</a>
            <textarea className="CampoPR" name="problema"></textarea>
          
            <button type="submit" className="ButtonEN" value="Send">Enviar</button>
          </form>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Resultado do envio do e-mail"
            className="Modal"
          >
            {emailSent !== null && (
              <p>{emailSent ? "E-mail enviado com sucesso!" : "Falha ao enviar o e-mail. Por favor, tente novamente mais tarde."}</p>
            )}
            <button onClick={() => setModalIsOpen(false)}>Fechar</button>
          </Modal>
        </div>

        <div className="Container-Right">
          <div className="Container-Win">
            <Win />
          </div>
        </div>
      </div>

      <div className="Container_Feedback"> 
        <div className="Feedback">
          <Demo />
        </div>
      </div>
      
      <div className="Footer">
        <div className="icon-img">
          <a href="https://www.linkedin.com/company/kopermax-do-brasil/?originalSubdomain=br" target="_blank" rel="noopener noreferrer">
            <img style={{ width: "30px", height: "30px", padding: "5px" }} src="Logo LinkedIn.png" alt="LinkedIn" />
          </a>
        </div>
        <div className="icon-img">
          <a href="https://www.instagram.com/kopermax.oficial/" target="_blank" rel="noopener noreferrer">
            <img style={{ width: "30px", height: "30px", padding: "5px" }} src="Logo Instagram.png" alt="Instagram" />
          </a>
        </div>
        <div className="icon-img">
          <a href="https://www.facebook.com/kopermax/?locale=pt_BR" target="_blank" rel="noopener noreferrer">
            <img style={{ width: "30px", height: "30px", padding: "5px" }} src="Logo Facebook.png" alt="Facebook" />
          </a>
        </div>
      </div>
    </main>
  );
}
