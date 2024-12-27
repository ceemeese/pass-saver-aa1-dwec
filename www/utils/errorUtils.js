function sendError() {
    let parent = document.getElementsByTagName('tbody')[0];
    //let errorMessage = document.createElement('div')

    parent.innerHTML = `
      <div class='alert alert-danger' role='alert'>Error, revisa los campos obligatorios</div>
    `
}


function sendMessage() {
    let parent = document.getElementsByTagName('tbody')[0];
    //let validMessage = document.createElement('div')

    parent.innerHTML = `
      <div class='alert alert-success' role='alert'>Site registrado correctamente</div>
    `
}
