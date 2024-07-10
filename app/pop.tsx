import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import Modal from 'react-modal';
import React, { FormEvent, useState, useRef } from "react";
import emailjs from '@emailjs/browser';




export default function SimplePopup() {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popup' : undefined;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [emailSent, setEmailSent] = useState<boolean | null>(null);
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current) {
      emailjs.sendForm('service_1luqnab', 'template_r2cg9v8', form.current, {
        publicKey: 'MjC0rqYOOwZ5ouwE2',
      })
        .then(
          () => {
            setEmailSent(true);
            setModalIsOpen(true);
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
    <div>
      <Button aria-describedby={id} type="button" onClick={handleClick}>
         Feedback
      </Button>
      <BasePopup id={id} open={open} anchor={anchor}>
        <PopupBody>      
          <div className="">
          <form className="Form1" ref={form} onSubmit={sendEmail}>
            <a className="">Descreva sua solicitação</a>
            <textarea className="CampoPR1" name="problema" />
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

        </div></PopupBody>
      </BasePopup>
    </div>
  );
}

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const PopupBody = styled('div')(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
`,
);

const Button = styled('button')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 127, 255, 0.5)'
  }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &:active {
    background-color: ${blue[700]};
    box-shadow: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }

  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
    &:hover {
      background-color: ${blue[500]};
    }
  }
`,
);
