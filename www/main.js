import API from './utils/api.js';
const api = new API('http://localhost:3000');

let selectedId = null;
let siteId = null;



window.addEventListener('DOMContentLoaded', (event) => {

  const categoryInput = document.querySelector('#category');
  categoryInput.addEventListener('input', checkName);

  //Obtener y pintar categorías
  api.getListCategories(drawData);


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

          //se limpia hash si no hay categoria seleccionada
          window.location.hash = '';
          
        } else {
          
          selectedId = this.getAttribute('data-id');
          document.querySelectorAll('.list-group-item').forEach(el => {
            el.classList.remove('list-group-item-primary');
          });
    
          this.classList.add('list-group-item-primary');
          deleteButton.disabled = false;

          // hash de ruta modificado
          window.location.hash = `/${selectedId}`

          api.getListSites(selectedId, drawSites);
        }
    });
  });


}


//Función para habilitar/deshabilitar botón de enviar
function checkName() {

  const categoryInput = document.querySelector('#category');
  const submitButton = document.querySelector('#submit-btn');

  if(categoryInput.value === '' ) {
    submitButton.disabled = true
  } else {
    submitButton.disabled = false
  }
}

function redirectToAddPage() {
  if (selectedId) {
    location.href = 'addpage.html#/' + selectedId;
  } else {
    console.log('selectedId no tiene valor');
  }
}

//Evento para añadir página asociada a un ID de categoria
const addButton = document.querySelector('#add-site');
addButton.addEventListener('click', redirectToAddPage);

//Evento de envío de formulario
const submitButton = document.querySelector("#submit-btn");
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const categoryName = document.querySelector("#category").value;
    api.postCategory(categoryName, drawData);
});


//Evento de eliminar categoria
const deleteButton = document.querySelector("#del-btn");
deleteButton.addEventListener('click', (event) => {
  event.preventDefault();

  api.deleteCategory(selectedId, drawData);
});


//Mostrar los Sites
const drawSites = (categoryId) => {

  //Limpiar contenido de padre para que cuando actualice lista no se pinte de nuevo
  let parent = document.getElementsByTagName('tbody')[0];
  parent.innerHTML = ''; 

  const {
    sites
  } = categoryId

  sites.forEach(site => {

    var createdDate = new Date(site.createdAt);

    let trSite = document.createElement('tr')
    let nameSite = document.createElement('td');
    let userSite = document.createElement('td');
    let createSite = document.createElement('td');
    let actions = document.createElement('td');

    parent.appendChild(trSite)
    
    
    nameSite.innerText = site.name;
    nameSite.setAttribute('data-id', site.id)
    trSite.appendChild(nameSite);

    userSite.innerText = site.user;
    trSite.appendChild(userSite);

    createSite.innerText = createdDate.getDate()+'/'+createdDate.getMonth()+'/'+createdDate.getFullYear();
    trSite.appendChild(createSite);

    actions.innerHTML = `
      <a href="${site.url}" target="_blank"><i class="fa-solid fa-globe"></i></a>
      <a href="" data-id="${site.id}"  onclick="return false" name="delsite"><i class="fa-solid fa-trash" style="color: #ec3257;"></i></a>
      <a href=""><i class="fa-solid fa-pen-to-square" style="color: #000000;"></i></a>
    `
    trSite.appendChild(actions);

    const actionDelete = document.querySelectorAll('[name="delsite"]');

    actionDelete.forEach(deleteSiteLink => {
      deleteSiteLink.addEventListener('click', (event) => {
        event.preventDefault();

        const siteId = deleteSiteLink.getAttribute('data-id');
        api.deleteSite(siteId, selectedId, drawSites);
      });
    });
  });
};






