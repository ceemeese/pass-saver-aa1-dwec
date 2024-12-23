
//Listar categorías
const getListCategories = async() => {

    try {
        const response = await fetch('http://localhost:3000/categories');
        console.log(response);

        if(response.status === 200) {
            const data = await response.json()
            console.log(data);
            return data;
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
const postCategory = async() => {

    const categoryName = document.querySelector("#category").value;

    const datos = {
        name: categoryName
    };

    try {
        const response = await fetch('http://localhost:3000/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  
            },
            body: JSON.stringify(datos)
        });

        if(response.status === 200) {
            const data = await getListCategories();
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




