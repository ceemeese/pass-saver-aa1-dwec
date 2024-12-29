window.addEventListener('DOMContentLoaded', (event) => {
  

    console.log('Hola script de añadir site')
    
  })

  function checkDataSite() {
    if(document.addSiteForm.siteName.value === '' || document.addSiteForm.siteUser.value === '' || document.addSiteForm.sitePassword.value === '' ) {
      document.addSiteForm.sendSite.disabled = true
    } else {
      document.addSiteForm.sendSite.disabled = false
    }
  }

//Evento de envío de formulario añadir site
const submitButtonSite = document.querySelector("#submit-btn-site");
submitButtonSite.addEventListener("click", (event) => {
    event.preventDefault();
    postSite();
});