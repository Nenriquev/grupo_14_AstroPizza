window.onload = () => {
    let form = document.getElementById('form-product-edit');

    let productName = document.getElementById('product-name');
    let productPrice = document.getElementById('product-price');
    let productDescription = document.getElementById('product-description');

    productName.focus()


    form.addEventListener('submit', (e) => {

        let errors = [];



        if (productName.value == "") {
          errors.push({id:'#producName-error', msg: 'Debe dar un nombre al producto'})
        }
        else{
          document.querySelector('#productName-error').innerHTML = ''
        }

        if (productPrice.value == "") {
					errors.push({id:'#price-error', msg: 'Debe dar un precio al producto'})
        }
        else{
          document.querySelector('#price-error').innerHTML = ''
        }

        if (productDescription.value == "") {
					errors.push({id:'#description-error', msg: 'Debe dar una breve descripcion del producto'})
        }
        else{
          document.querySelector('#description-error').innerHTML = ''
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