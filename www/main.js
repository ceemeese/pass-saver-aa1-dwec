window.addEventListener('DOMContentLoaded', (event) => {

  const selectedId = null;

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


//Función para pintar las categorías y que se active para poder seleccionar categorias
const drawData = (data) => {

  //Limpiar contenido de padre para que cuando actualice lista no se pinte de nuevo
  let parent = document.getElementsByTagName('ul')[0];
  parent.innerHTML = ''; 

  data.forEach(category => {
    let child = document.createElement('li');
    
    // child.innerText = JSON.stringify(category)
    child.innerText = category.name;
    child.setAttribute('data-id', category.id)
    child.classList.add('list-group-item');
    parent.appendChild(child);
  })

  const items = document.querySelectorAll('.list-group-item');
  const deleteButton = document.getElementById('del-btn');

  items.forEach(item => {
    item.addEventListener('click', function(event) {
    
        if (this.classList.contains('list-group-item-primary')) {
          // Quitamos la clase activa y reseteamos el selectedId
          this.classList.remove('list-group-item-primary');
          selectedId = null;
          deleteButton.disabled = true;
          
        } else {
          
          selectedId = this.getAttribute('data-id');
          document.querySelectorAll('.list-group-item').forEach(el => {
            el.classList.remove('list-group-item-primary');
          });
    
          this.classList.add('list-group-item-primary');
          deleteButton.disabled = false;
        }
    });
  });
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


//Evento de eliminar categoria
const deleteButton = document.querySelector("#del-btn");
deleteButton.addEventListener('click', (event) => {
  event.preventDefault();

  deleteCategory(selectedId);
})

