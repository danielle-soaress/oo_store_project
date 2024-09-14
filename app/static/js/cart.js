document.getElementById("product_info_buy_button").addEventListener('click', addToCart);

//==================Carrinho open and close======================
document.getElementById("bag_icon").addEventListener("click", function() {
    document.getElementById("side_bag").classList.toggle("open");
});

document.getElementById("close_bag").addEventListener("click", function() {
    document.getElementById("side_bag").classList.remove("open");
});

//===================================================Carrinho preço total=================================================
function updateTotal() {
    let total = 0;
    const cartProduct = document.querySelectorAll(".cart_product");
    
    cartProduct.forEach(product => {
        const productPrice = product.querySelector(".price_product").textContent;
        const priceValue = parseFloat(productPrice.replace(/[^0-9,.]/g, '').replace(',', '.'))
        const quantity = parseInt(product.querySelector(".product_qty").value, 10);
        total += priceValue * quantity;
    });

    document.getElementById("total").textContent = `Total: R$ ${total.toFixed(2).replace('.',',')}`;
}

//=========================Add to cart======================
let cart = [];

function addToCart() {

    const userID = getCookie('userID');

    if(userID) {
        console.log(cart)

        const productImg = document.getElementById("product_info_image").src
        const productName = document.getElementById("product_info_name").textContent

        const productId =document.getElementById("product_info_id").textContent.split(': ')[1]
        
        const productCategory = document.getElementById("product_info_category").textContent.split(': ')[1]
        const productBrand = document.getElementById("product_info_brand").textContent.split(': ')[1]
        const productPrice = document.getElementById("product_info_price_in_cash").textContent
        const productPriceValue = parseFloat(productPrice.replace(/[^0-9,.]/g, '').replace(',', '.'));
        //Verifica se o produto está no carrinho
        const existingProduct = cart.find(product => product.productId === productId);

        if (existingProduct) {
            // Se o produto já está no carrinho, aumentar a quantidade
            existingProduct.quantity++;
            displayCart(cart);  
            saveCart();        
            updateTotal();   
            return;
        }

        const newProduct = {
            productId,
            productName,
            productCategory,
            productBrand,
            productPrice: productPriceValue,
            productImg,
            quantity: 1
        };

        console.log(newProduct)
        cart.push(newProduct);


        let newCartProduct = document.createElement("tr")
        newCartProduct.classList.add("cart_product")

        newCartProduct.innerHTML = 
        `
        <td class="productIdentification">
            <img src="${productImg}" alt="${productName}" class="img_product">
            <div class="info">
                <strong class="name_product">${productName}</strong>

                <div class="category">${productCategory}</div>
                <div class="brand">${productBrand}</div>
            </div>
        </td>
        <td>
            <span class="price_product">R$ ${productPriceValue}</span>
        </td>
        <td>
            <input type="number" value="1" min="1" class="product_qty">
        </td>
        <td>
            <button type="button" class="product_remove">Remove</button>
        </td>
        `
            
        const tableBody = document.querySelector(".bag_table tbody")
        tableBody.append(newCartProduct)

        //============================================Botão de Remover========================================================
        const removeButton = newCartProduct.querySelector(".product_remove");
        removeButton.addEventListener('click', function() {
            newCartProduct.remove()
            cart = cart.filter(product => product.productId !== productId);//Remove do cart = []
            updateTotal();
            saveCart()
        });

        //==============================================Input Quantity========================================================
        const inputQuantity = newCartProduct.querySelector(".product_qty");
        inputQuantity.addEventListener('change', function() {
            const newQuantity = parseInt(inputQuantity.value, 10);
            if (newQuantity > 0) {
                const product = cart.find(product => product.productId === productId);
                if (product) {
                    product.quantity = newQuantity;
                    updateTotal();
                    saveCart();
                }
            }
        });

        updateTotal();
        saveCart();
        alert('Produto adicionado com sucesso!')
    } else {
        alert('Você precisa estar logado para adicionar produtos ao carrinho.');
        window.location.href = '/login_page';
    }
}

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
    const userID = getCookie('userID'); 

    const cartProducts = cart.map(product => {
        return {
            productId: product.productId,
            quantity: product.quantity
        };
    });

    if (validateCart(cartProducts)) {
        console.log(userID + 'está começando o processo de salvar no carrinho')
        fetch('/save-cart', { 
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify({ 
                userID: userID, 
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
    const userID = getCookie('userID');

    if (!userID) {
        console.error('Usuário não autenticado.');
        return;
    }

    fetch(`/get-cart?userID=${encodeURIComponent(userID)}`)
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

document.addEventListener('DOMContentLoaded', () => {
    loadCart(),
    updateTotal()
});