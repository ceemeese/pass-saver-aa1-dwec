//Función mostrar mensaje KO
function sendError() {
  const form = document.querySelector('#form');
    
  if (form) {
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('alert', 'alert-danger');
      errorMessage.setAttribute('role', 'alert');
      errorMessage.textContent = 'Error, revisa los campos obligatorios';

      form.appendChild(errorMessage);
  } else {
      console.log('Formulario no encontrado');
  }
}

// Función mostrar mensaje OK
function sendMessage() {
    const form = document.querySelector('#form');

    if (form) {
      const sendMessage = document.createElement('div');
      sendMessage.id = 'message';
      sendMessage.classList.add('alert', 'alert-success');
      sendMessage.setAttribute('role', 'alert');
      sendMessage.textContent = 'Site registrado correctamente';

      form.appendChild(sendMessage);
  } else {
      console.log('Formulario no encontrado');
  }
}

//Función eliminar mensaje alerta
function clearMessage() {
  const messageElement = document.querySelector('#message')
  
  if (messageElement) {
    messageElement.remove();
  }
}