function checkDataSite() {
    if(document.addSiteForm.siteName.value || document.addSiteForm.siteUser.value || document.addSiteForm.sitePassword.value === '' ) {
      document.addcategory.send.disabled = true
    } else {
      document.addcategory.send.disabled = false
    }
  }

//Evento de envío de formulario añadir site
const submitButtonSite = document.querySelector("#submit-btn-site");
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    postSite();
});