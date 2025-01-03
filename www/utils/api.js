class API {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }


    //Listar categorias
    async getListCategories(drawData) {

        try {
            const response = await fetch(`${this.baseURL}/categories`);
            console.log(response);
    
            if(response.status === 200) {
                const data = await response.json()
                drawData(data);
            } else if (response.status === 401) {
                console.log('Hay un error en la petición')
            } else {
            console.log('Hubo un error, revisa parámetros')
            }
        } catch (error) {
            console.log(error)
        }
    }




    //Añadir categoría
    async postCategory(categoryName, drawData) {

        const datos = {
            name: categoryName
        };

        try {
            const response = await fetch(`${this.baseURL}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  
                },
                body: JSON.stringify(datos)
            });

            if(response.status === 200) {
                console.log('Sitio añadido con éxito');
                await this.getListCategories(drawData);
            } else if (response.status === 401) {
                console.log('Hay un error en la petición')
            } else {
            console.log('Hubo un error, revisa parámetros')
            }
        } catch (error) {
            console.log(error)
        }
    }




    //Eliminar categoría
    async deleteCategory(id, drawData) {

        try {
            const response = await fetch(`${this.baseURL}/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',  
                },
            });

            if(response.status === 200) {
                console.log('Categoría eliminada con éxito')
                const data = await this.getListCategories(drawData);
            } else if (response.status === 401) {
                console.log('Hay un error en la petición')
            } else {
            console.log('Hubo un error al eliminar la categoría')
            }
        } catch (error) {
            console.log(error)
        }
    }




    //Listar sites
    async getListSites(id, drawSites) {

    try {
        const response = await fetch(`${this.baseURL}/categories/${id}`);
        console.log(response);

        if(response.status === 200) {
            const data = await response.json()
            console.log(data);
            drawSites(data);
        } else if (response.status === 401) {
            console.log('Hay un error en la petición')
        } else {
        console.log('Hubo un error, revisa parámetros')
        }
    } catch (error) {
        console.log(error)
    }
}




    //Añadir Site
    async postSite(id) {

        const datos = {
            name: document.querySelector("#siteName").value,
            url: document.querySelector("#siteURL").value,
            user: document.querySelector("#siteUser").value,
            password: document.querySelector("#sitePassword").value,
            description: document.querySelector("#siteDescription").value
        };

        try {
            const response = await fetch(`${this.baseURL}/categories/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  
                },
                body: JSON.stringify(datos)
            });

            if(response.status === 200) {
                const data = await response.json();
                console.log('Sitio añadido con éxito:', data);
            } else if (response.status === 401) {
                console.log('Hay un error en la petición')
            } else {
            console.log('Hubo un error, revisa parámetros')
            }
        } catch (error) {
            console.log(error)
        }
    }



    //Eliminar Site
    async deleteSite(id, selectedId, drawSites) {

        try {
            const response = await fetch(`${this.baseURL}/sites/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',  
                },
            });
    
            if(response.status === 200) {
                console.log('Sitio eliminado con éxito');
                const data = await this.getListSites(selectedId, drawSites);
            } else if (response.status === 401) {
                console.log('Hay un error en la petición');
            } else {
            console.log('Hubo un error al eliminar la categoría');
            }
        } catch (error) {
            console.log(error)
        }
    }
    
}

export default API;




