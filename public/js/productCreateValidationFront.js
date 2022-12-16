window.onload = function(){

    let form = document.querySelector('.form-create');

    form.product_name.focus()

    let names = document.getElementById('names-product');
    let price = document.getElementById('price-product');
    let description = document.getElementById('description-product');
    let category = document.getElementById('category-product');
    /*let image = document.getElementById('');*/

    /*let checkNames = document.querySelector('.check-names');
    let checkPrice = document.querySelector('.check-price');
    let checkImg = document.querySelector('.check-img');
    let checkDescription = document.querySelector('.check-text');*/
 

   /* let alertNames = document.querySelector('.alert-circle-names');
    let alertPrice = document.querySelector('.alert-circle-price');
    let alertImg = document.querySelector('.alert-circle-img');
    let alertDescription = document.querySelector('.alert-circle-text');*/
    
    form.addEventListener('submit', (e) =>{

        let errors = [];

        if(names.value === ""){
            errors.push('Nombre del producto no puede estar vacio.');
        } else if (names.value.length < 5){
            errors.push('Nombre del producto debe tener al menos 5 caracteres.')
        }

        if(price.value === ""){
            errors.push('El precio no puede estar vacio.')
        
        }

       

        if (description.value === ""){
            errors.push('Descripcion no puede estar vacio.')
          
        } else if (description.value.length < 20){
            errors.push(' Descripcion debe tener al menos 20 caracteres.')
         
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