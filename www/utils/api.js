class API {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }


    //Listar categorias
    async getListCategories(drawData) {

        try {
            const response = await fetch(`${this.baseURL}/categories`);
            console.log(response);
    
            if(response.ok) {
                const data = await response.json();
                drawData(data);
            } else {
                if (response.status === 404) throw new Error('404, No encontrado');
                if (response.status === 500) throw new Error('500, Error interno del servidor');
                
                throw new Error(response.status);
            }
        } catch (error) {
            console.error('Fetch', error);
        }
    }




    //Añadir categoría
    async postCategory(categoryName, drawData) {

        try {
            const response = await fetch(`${this.baseURL}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  
                },
                body: JSON.stringify({ name: categoryName })
            });

            if(response.ok) {
                console.log('Sitio añadido con éxito');
                await this.getListCategories(drawData);
            } else {
                if (response.status === 404) throw new Error('404, No encontrado');
                if (response.status === 500) throw new Error('500, Error interno del servidor');
                
                throw new Error(response.status);

            }
        } catch (error) {
            console.error('Fetch', error);
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

            if(response.ok) {
                console.log('Categoría eliminada con éxito')
                await this.getListCategories(drawData);
            } else {
                if (response.status === 404) throw new Error('404, No encontrado');
                if (response.status === 500) throw new Error('500, Error interno del servidor');
                
                throw new Error(response.status);
            }
        } catch (error) {
            console.error(error)
        }
    }




    //Listar sites
    async getListSites(id, drawSites) {

    try {
        const response = await fetch(`${this.baseURL}/categories/${id}`);
        console.log(response);

        if(response.ok) {
            const data = await response.json()
            console.log(data);
            drawSites(data);
        } else {
            if (response.status === 404) throw new Error('404, No encontrado');
            if (response.status === 500) throw new Error('500, Error interno del servidor');
            
            throw new Error(response.status);
        }
    } catch (error) {
        console.error(error)
    }
}




    //Añadir Site
    async postSite(id, datos) {

        try {
            const response = await fetch(`${this.baseURL}/categories/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  
                },
                body: JSON.stringify(datos)
            });

            if(response.ok) {
                const data = await response.json();
                console.log('Sitio añadido con éxito:', data);
            } else {
                if (response.status === 404) throw new Error('404, No encontrado');
                if (response.status === 500) throw new Error('500, Error interno del servidor');
                
                throw new Error(response.status);
            }
        } catch (error) {
            console.error(error)
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
    
            if(response.ok) {
                console.log('Sitio eliminado con éxito');
                await this.getListSites(selectedId, drawSites);
            } else {
                if (response.status === 404) throw new Error('404, No encontrado');
                if (response.status === 500) throw new Error('500, Error interno del servidor');
                
                throw new Error(response.status);
            }
        } catch (error) {
            console.error(error)
        }
    }
    
}

export default API;




