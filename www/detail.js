import API from './utils/api.js';

const api = new API('http://localhost:3000');
let selectedId = null

window.addEventListener('DOMContentLoaded', (event) => {

  // Obtener selectedId desde el hash de la URL
  selectedId = getSelectedId();
  if (selectedId) {
    console.log("selectedId desde el hash:", selectedId);
  } else {
    console.log("No se encontró selectedId en el hash");
  }

  function getSelectedId() {
    const hash = window.location.hash;
    const match = hash.match(/^#\/(\d+)$/);
    if (match) {
      return match[1];
    }
    return null;
  }

  //Generar password aleatoria
  const autoPasswordLink = document.getElementById('autogenerateLink');
  autoPasswordLink.addEventListener("click" , (event) => {
    event.preventDefault();
    const passwordInput = document.getElementById('sitePassword');
    generate(passwordInput);
  })

  //Ver contraseña secreta
  const viewSecretPassword = document.getElementById('viewPasswordLink');
    viewSecretPassword.addEventListener("click", (event) => {
      event.preventDefault();
      const inputPassword = document.getElementById('sitePassword');
      inputPassword.type = inputPassword.type === "password" ? "text" : "password";
    })


    console.log('Hola script de añadir site')
    
  })

  


  const campos = {
    siteName: false,
    siteURL: true,
    siteUser: false,
    sitePassword: false,
    siteDescription: true
}

const validation = {
  nameValidation: /^([A-Za-zñáéíóú]+[\s]*)+$/,
  urlValidation: /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
  passValidation: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])\S{8}$/
}

const validationForm = (e) => {
  switch (e.target.name) {
      case 'siteName':
          validationInput(validation.nameValidation, e.target, 'siteName');
        break;
      case 'siteURL':
        /*if (siteURL.value !== '') {
          validationInput(validation.urlValidation, e.target, 'siteURL');
        }*/
        break;
      case 'siteUser':
          validationInput(validation.nameValidation, e.target, 'siteUser');
        break;
      case 'sitePassword':
          validationInput(validation.passValidation, e.target, 'sitePassword');
        break;
      case 'siteDescription':
        if (siteDescription.value !== '') {
        }
        break;
  }
}

const validationInput = (validation, input, campo) => {

  console.log(`Validando ${campo}: ${input.value}`);
  if(validation.test(input.value)) {
    console.log(`Campo ${campo} validado correctamente`); // Verificar si la validación pasa
    campos[campo] = true; // Cambiar el estado de validación
    document.getElementById(`field_${campo}`).classList.remove('field-incorrecto');
    document.getElementById(`field_${campo}`).classList.add('field-correcto');
    document.querySelector(`#field_${campo} .input_error`).classList.remove('input_error-activo');
    document.querySelector(`#field_${campo} .input_error_general`).classList.remove('input_error_general-activo');

  } else {
    console.log(`Campo ${campo} no válido`); // Si no pasa la validación
    campos[campo] = false; // Cambiar el estado de validación
    document.getElementById(`field_${campo}`).classList.add('field-incorrecto');
    document.getElementById(`field_${campo}`).classList.remove('field-correcto');
    document.querySelector(`#field_${campo} .input_error`).classList.add('input_error-activo');
    document.querySelector(`#field_${campo} .input_error_general`).classList.remove('input_error_general-activo');
  }
}

//validacion por cada input al levantar la tecla y al salir dar click fuera de campo
const inputs = document.querySelectorAll('#form input')
inputs.forEach((input) => {
  input.addEventListener('keyup', validationForm);
  input.addEventListener('blur', validationForm);
});


/* valida que todos los campos estén cumplimentados, en caso de OK envía alerta y resetea*/
function camposText(){
  if (siteName.value === ''){
      document.getElementById('field_siteName').classList.add('field-incorrecto');
      document.getElementById('field_siteName').classList.remove('field-correcto');
      document.querySelector('#field_siteName .input_error_general').classList.add('input_error_general-activo');
      document.querySelector('#field_siteName .input_error').classList.remove('input_error-activo');
  }
  if (siteUser.value === '') {
      document.getElementById('field_siteUser').classList.add('field-incorrecto');
      document.getElementById('field_siteUser').classList.remove('field-correcto');
      document.querySelector('#field_siteUser .input_error_general').classList.add('input_error_general-activo');
      document.querySelector('#field_siteUser .input_error').classList.remove('input_error-activo');
  }
  if (sitePassword.value === '') {
      document.getElementById(`field_sitePassword`).classList.add('field-incorrecto');
      document.getElementById(`field_sitePassword`).classList.remove('field-correcto');
      document.querySelector('#field_sitePassword .input_error_general').classList.add('input_error_general-activo');
      document.querySelector('#field_sitePassword .input_error').classList.remove('input_error-activo');
      }
}


function resetField(){
  document.getElementById('field_siteName').classList.remove('field-correcto');
  document.getElementById('field_siteURL').classList.remove('field-correcto');
  document.getElementById('field_siteUser').classList.remove('field-correcto');
  document.getElementById('field_sitePassword').classList.remove('field-correcto');
  document.getElementById('field_siteDescription').classList.remove('field-correcto');
}


//Evento de envío de formulario añadir site
form.addEventListener('submit', function (event){
    event.preventDefault();

    //Validación de campos obligatorios
    if (siteName.value === '' || siteUser.value === '' || sitePassword.value === '') {
      camposText();
    } else {
      const datos = getFormData();
      api.postSite(selectedId, datos)
      .then(() => {
        sendMessage();
        form.reset();
        resetField();

        //Eliminar alerta cuando pasan 5 segundos
        setTimeout(() => {
          clearMessage();
        }, 3000)
      })
      .catch(() => {
        sendError();

        setTimeout(() => {
          clearMessage();
        }, 3000)
      });
    }
});




const generatePassword = () => {
const length = 8;
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const specialChar = ".?,;-_¡!¿*%&$/()[]{}|@><";

const allChars = lowerCase + upperCase + numbers + specialChar;

const passwordArray = [
  lowerCase.charAt(Math.floor(Math.random() * lowerCase.length)),
  upperCase.charAt(Math.floor(Math.random() * upperCase.length)),
  numbers.charAt(Math.floor(Math.random() * numbers.length)),
  specialChar.charAt(Math.floor(Math.random() * specialChar.length)),
];

while (passwordArray.length < length) {
  passwordArray.push(allChars.charAt(Math.floor(Math.random() * allChars.length)));
}

return passwordArray.sort(() => Math.random() - 0.5).join('');

}

const generate = (passwordInput) => {
  const newPassword = generatePassword();
  passwordInput.value = newPassword;
  console.log("Contraseña:", newPassword);
};


function getFormData() {
  return {
      name: document.querySelector("#siteName").value,
      url: document.querySelector("#siteURL").value,
      user: document.querySelector("#siteUser").value,
      password: document.querySelector("#sitePassword").value,
      description: document.querySelector("#siteDescription").value,
  };
}
