//=======================Save Cart============================
function getCookie(name) {
    const value = `; ${document.cookie}`; 
    console.log('value = ' + value)
    const parts = value.split(`; ${name}=`); 
    console.log('parts =' + parts)
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    } else {
        return null; 
    }
} 

function validateCart(cart) {
    return cart.every(product => product.productId && product.quantity);
}

function saveCart() {
    const username = getCookie('username'); 

    const cartProducts = cart.map(product => {
        let id = product.productId.split(': ')[1];
        return {
            productId: id,
            quantity: product.quantity
        };
    });

    if (validateCart(cartProducts)) {
        console.log(username + 'está começando o processo de salvar no carrinho')
        fetch('/save-cart', { 
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify({ 
                username: username, 
                cart: cartProducts // Sacola com o ID e a quantidade dos produtos 
            }) 
        })
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Network response was not ok');
            }
            return data;
        })
        .then(result => { 
            if (result.status === 'success') { 
                console.log('Cart saved successfully!'); 
            } else { 
                console.error('Error:', result.message); 
            } 
        })
        .catch(error => { 
            console.error('Request failed:', error); 
        });

    } else {
        console.error('Carrinho contém produtos inválidos:', cartProducts);
    }
}

//=================View cart user======================
function loadCart() {
    const username = getCookie('username');

    if (!username) {
        console.error('Usuário não autenticado.');
        return;
    }

    fetch(`/get-cart?username=${encodeURIComponent(username)}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                cart = data.cart;
                displayCart();
                updateTotal()
            } else {
                console.error('Erro ao carregar o carrinho:', data.message);
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
}

function displayCart() {
    const tableBody = document.querySelector(".bag_table tbody"); 
    tableBody.innerHTML = '';

    if (!Array.isArray(cart)) {
        console.error('Cart is not an array');
        return;
    }

    cart.forEach(product => {

        let newCartProduct = document.createElement("tr"); 
        newCartProduct.classList.add("cart_product"); 

        newCartProduct.innerHTML = 
        ` 
        <td class="productIdentification"> 

            <img src="${product.productImg}" alt="${product.productName}" class="img_product"> 
            <div class="info"> 
                <strong class="name_product">${product.productName}</strong> 
                <div class="id">${product.productId}</div> 
                <div class="category">${product.productCategory}</div> 
                <div class="brand">${product.productBrand}</div> 
            </div> 
        </td> 
        <td> 
            <span class="price_product">R$ ${product.productPrice}</span> 
        </td> 
        <td> 
            <input type="number" value="${product.quantity}" min="1" class="product_qty"> 
        </td> 
        <td> 
            <button type="button" class="product_remove">Remove</button> 
        </td> 
        `; 


        tableBody.append(newCartProduct); 

 
        const removeButton = newCartProduct.querySelector(".product_remove"); 
        removeButton.addEventListener('click', () => { 
            cart = cart.filter(item => item.productId !== product.productId);
            displayCart(); 
            updateTotal();
            saveCart(); 
        }); 


        const inputQuantity = newCartProduct.querySelector(".product_qty"); 
        inputQuantity.addEventListener('change', function() { 
            const newQuantity = parseInt(inputQuantity.value, 10); 

            if (newQuantity > 0) { 
                product.quantity = newQuantity; 
                updateTotal(); 
                saveCart(); 
            } 
        }); 
    })    
} 