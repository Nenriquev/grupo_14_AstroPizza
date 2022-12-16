window.onload = () => {
    let form = document.getElementById('form-product-edit');

    let productName = document.getElementById('product-name');
    let productPrice = document.getElementById('product-price');
    let productDescription = document.getElementById('product-description');

    productName.focus()


    form.addEventListener('submit', (e) => {

        let errors = [];



        if (productName.value == "") {
            errors.push('Nombre Del Producto no puede estar vacio.');
        }

        if (productPrice.value == "") {
            errors.push('Precio no puede estar vacio.');
        }

        if (productDescription.value == "") {
            errors.push('Descripcion no puede estar vacio.');
        } else if (productDescription.value.length < 20 ){
            errors.push('Descripcion debe tener mas de 20 caracteres.')
        }


        if (errors.length > 0) {
            e.preventDefault();

            let ulErrors = document.querySelector(".errores-v")
            ulErrors.innerHTML = " "

            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += "<li>" + errors[i] +"</li>"
                
            }
        }
    })
    
}