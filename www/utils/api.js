const datos = {
    name: 'Nueva Categoria'
};

const postCategory = async(data) => {
    try {
        const response = await fetch('http://localhost:3000/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  
            },
            body: JSON.stringify(datos)
        });

        if(response.status === 200) {
            const data = await response.json()
            console.log(data);
        } else if (response.status === 401) {
            console.log('Hay un error en la petición')
        } else {
        console.log('Hubo un error, revisa parámetros')
        }
    } catch (error) {
        console.log(error)
    }
}
