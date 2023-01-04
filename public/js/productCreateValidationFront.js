window.onload = function(){

    let form = document.querySelector('.form-create');

    form.product_name.focus()

    let names = document.querySelector('[name=product_name]');
    let price = document.querySelector('[name=price]');
    let category = document.querySelector('[name=category]');
    let description = document.querySelector('[name=description]');

    
    form.addEventListener('submit', (e) =>{
        

        let errors = [];
        

        if(names.value === ""){
            errors.push({id:'#productName-error', msg: 'Nombre de producto requerido'});
        } else if (names.value.length < 3){
            errors.push({id:'#productName-error', msg: 'El nombre del producto debe tener al menos 3 caracteres'})
        }
        else{
            document.querySelector('#productName-error').innerHTML = ''
        }

        if(price.value === ""){
            errors.push({id:'#price-error', msg: 'Debe dar un precio'})
        }
        else{
            document.querySelector('#price-error').innerHTML = ''
        }

    
        if (description.value === ""){
            errors.push({id:'#description-error', msg: 'Debe dar una descripcion al producto'})
        }
        else{
            document.querySelector('#description-error').innerHTML = ''
        }

        if (category.value === ""){
            errors.push({id:'#category-error', msg: 'Debe elegir una categoria'})
        }
        else{
            document.querySelector('#category-error').innerHTML = ''
        }


        if (errors.length > 0) {
            e.preventDefault()
            errors.forEach((error) =>{
                let errorTag = document.querySelector(`${error.id}`)
                errorTag.innerHTML = `<span>${error.msg}<span>`
            })

        }
    })
    



    }