import * as Utils from '/utils/api.js';

window.addEventListener('DOMContentLoaded', (event) => {

    let drawData = (data) => {
        data.forEach(category => {
          let parent = document.getElementsByTagName('ul')[0]
          let child = document.createElement('li')
          // child.innerText = JSON.stringify(category)
          child.innerText = category.name
          child.classList.add('list-group-item')
          parent.appendChild(child)
        })
      }
  
      const closeCategory = document.getElementById('close-btn')
      const addCategory = document.getElementById('add-btn')
      const submitCategory = document.getElementById('submit-btn')
  
      addCategory.addEventListener('click', () => popup.classList.add("show-popup"))
      closeCategory.addEventListener('click', () => popup.classList.remove("show-popup"))
      submitCategory. addEventListener('click', () =>  popup.classList.remove("show-popup"))
  
      fetch("http://localhost:3000/categories")
        .then(res => res.json())
        .then(data => drawData(data))

    console.log('Hola script principal')

    Utils.postCategory(Utils.datos);

})