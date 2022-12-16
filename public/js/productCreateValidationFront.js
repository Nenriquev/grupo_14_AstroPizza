window.onload = function(){

    let form = document.querySelector('.form-create');

    form.product_name.focus()

    let names = document.getElementById('names-product');
    let price = document.getElementById('price-product');
    let description = document.getElementById('description-product');
    let category = document.getElementById('category-product');
    let image = document.getElementById('');

    let checkNames = document.querySelector('.check-names');
    let checkPrice = document.querySelector('.check-price');
    let checkImg = document.querySelector('.check-img');
    let checkDescription = document.querySelector('.check-text');
 

    let alertNames = document.querySelector('.alert-circle-names');
    let alertPrice = document.querySelector('.alert-circle-price');
    let alertImg = document.querySelector('.alert-circle-img');
    let alertDescription = document.querySelector('.alert-circle-text');
    
    form.addEventListener('submit', (e) =>{

        let errors = [];

        if(names.value === ""){
            errors.push('Nombre no puede estar vacio.');
            names.classList.add('fg-field-invalid')
            names.classList.remove('fg-field-valid');
            alertNames.classList.remove('hidden'); 
        } else if (names.value.length < 5){
            errors.push('Nombre debe tener al menos 5 caracteres.')
            names.classList.add('fg-field-invalid')
            names.classList.remove('fg-field-valid');
            alertNames.classList.remove('hidden');
        } else{
            names.classList.add('fg-field-valid');
            names.classList.remove('fg-field-invalid');
            alertNames.classList.add('hidden');
            checkNames.classList.remove('hidden');
        }

        if(price.value === ""){
            errors.push('El precio no puede estar vacio.')
            email.classList.add('fg-field-invalid')
            email.classList.remove('fg-field-valid')
            alertEmail.classList.remove('hidden');
        } else{
            email.classList.add('fg-field-valid')
            email.classList.remove('fg-field-invalid')
            checkEmail.classList.remove('hidden');
            alertEmail.classList.add('hidden');
        }

        /*if(img.value === ""){
            errors.push('Telefono no puede estar vacio.');
            telefono.classList.add('fg-field-invalid')
            telefono.classList.remove('fg-field-valid')
            alertTelefono.classList.remove('hidden');
        } else{
            telefono.classList.add('fg-field-valid')
            telefono.classList.remove('fg-field-invalid')
            checkTelefono.classList.remove('hidden');
            alertTelefono.classList.add('hidden');
        }*/

        if(description.value === ""){
            errors.push('Contrasena no puede estar vacio.')
            password.classList.add('fg-field-invalid')
            password.classList.remove('fg-field-valid')
            alertPassword.classList.remove('hidden');
        } else if (password.value.length < 20){
            errors.push('Contrasena debe tener al menos 6 caracteres.')
            password.classList.add('fg-field-invalid')
            password.classList.remove('fg-field-valid')
            alertPassword.classList.remove('hidden');
        } else{
            password.classList.add('fg-field-valid')
            password.classList.remove('fg-field-invalid')
            checkPassword.classList.remove('hidden');
            alertPassword.classList.add('hidden');
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