window.addEventListener('DOMContentLoaded', (event) => {

  //Obtener y pintar categorías
  getListCategories().then(data => {
    drawData(data);
  });


  //Lógica para abrir y cerrar formulario popup
  const closeCategory = document.getElementById('close-btn')
  const addCategory = document.getElementById('add-btn')
  const submitCategory = document.getElementById('submit-btn')

  addCategory.addEventListener('click', () => popup.classList.add("show-popup"))
  closeCategory.addEventListener('click', () => popup.classList.remove("show-popup"))
  submitCategory. addEventListener('click', () =>  popup.classList.remove("show-popup"))


  console.log('Hola script principal')

})


//Función para pintar las categorías
const drawData = (data) => {

  //Limpiar contenido de padre para que cuando actualice lista no se pinte de nuevo
  let parent = document.getElementsByTagName('ul')[0];
  parent.innerHTML = ''; 

  data.forEach(category => {
    let child = document.createElement('li')
    // child.innerText = JSON.stringify(category)
    child.innerText = category.name
    child.classList.add('list-group-item')
    parent.appendChild(child)
  })
}

//Función para habilitar/deshabilitar botón de enviar
function checkName() {
  if(document.addcategory.category.value === '' ) {
    document.addcategory.send.disabled = true
  } else {
    document.addcategory.send.disabled = false
  }
}

//Evento de envío de formulario
const submitButton = document.querySelector("#submit-btn");
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    postCategory();
});