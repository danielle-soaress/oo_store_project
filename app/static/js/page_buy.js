console.log('Script carregado')
//=======================================================Perfil===========================================================
document.getElementById('perfil_icon').addEventListener('click', function() {
    console.log('Icone perfil clicado')

    fetch('/authenticate')
        .then(response => response.json())
        .then(data => {
            console.log('Dados recebidos', data)

            if (data.authenticated) {
                window.location.href = `/pagina/${data.userID}`;
            } else {
                window.location.href = '/login_page';
            }
        })
        .catch(error => {
            console.error('Erro ao verificar autenticação:', error);
            // Em caso de erro, redireciona para a página de login
            window.location.href = '/login';
        });
});
//======================================================Carrinho==========================================================
document.getElementById("bag_icon").addEventListener("click", function() {
    document.getElementById("side_bag").classList.toggle("open");
});

document.getElementById("close_bag").addEventListener("click", function() {
    document.getElementById("side_bag").classList.remove("open");
});

//===================================================SearchForm=================================================
/*document.getElementById('search_bar').addEventListener('submit', (event) => {
    event.preventDefault()
    const query = document.getElementById('search_input').value;
    searchProducts(query);
});


function searchProducts(query) {
    fetch(`/api/products?query=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
        updateProductList(data.products)
    })
    .catch(error => {
        console.error('Error fetching products', error);
    });
}*/
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


//===========================================Adicionando os produtos no carrinho==========================================
let cart = [];

function addToCart(event) {
//========================Modificação==========================================
    const userID = getCookie('userID');

    if(userID) {
        console.log(cart)
        const buttonAdd = event.target;
        const productInfos = buttonAdd.parentElement.parentElement
        const productImg = productInfos.getElementsByClassName("product_item_image")[0].src
        const productName = productInfos.getElementsByClassName("product_item_name")[0].textContent
        const productId = productInfos.getElementsByClassName("product_item_id")[0].textContent.split(': ')[1]
        const productCategory = productInfos.getElementsByClassName("product_item_category")[0].textContent.split(': ')[1]
        const productBrand = productInfos.getElementsByClassName("product_item_brand")[0].textContent.split(': ')[1]
        const productPrice = productInfos.getElementsByClassName("product_item_price")[0].textContent
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
                <div class="id">${productId}</div>
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
//============================================================================

//=====================================================Save Cart==========================================================
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

    console.log(cartProducts)

    if (validateCart(cartProducts)) {
        console.log(userID + ' está começando o processo de salvar no carrinho')
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

//=================================================View cart user=========================================================
function loadCart() {
    const userID = getCookie('userID');

    if (!userID) {
        console.error('userID não autenticado.');
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
        console.log(product)

        let newCartProduct = document.createElement("tr"); 
        newCartProduct.classList.add("cart_product"); 

        newCartProduct.innerHTML = 
        ` 
        <td class="productIdentification"> 

            <img src="../../static/img/${product.productImg}" alt="${product.productName}" class="img_product"> 
            <div class="info"> 
                <strong class="name_product">${product.productName}</strong> 
                <div class="id">Id: ${product.productId}</div> 
                <div class="category">Category: ${product.productCategory}</div> 
                <div class="brand">Brand: ${product.productBrand}</div> 
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

//=================================================Visualizar produtos====================================================

function updateProductList(searchQuery ='') {

    fetch('/api/products')
    .then(response => response.json())
    .then(data => {
        const productContainer = document.getElementById('viewProducts');
        productContainer.innerHTML = ''; // Limpa o container antes de adicionar novos produtos

        //Garanti que o searchQuery seja uma string
        const query = typeof searchQuery === 'string' ? searchQuery.toLowerCase() : '';

        //Filtra os produtos baseado pelo input search
        const filteredProducts = query ? data.filter(product => {
            return product.name.toLowerCase().includes(query) || 
            product.category.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query);
        }) : data;

        //Se os produtos não forem encontrados
        if (filteredProducts.length === 0) {
            const noProductsMessage = document.createElement('p');
            noProductsMessage.textContent = 'No products found.';
            productContainer.appendChild(noProductsMessage);
            return;
        }

        //Mostra os produtos filtrados ou todos
        filteredProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product_item');

            // Informações do produto (texto e imagem)
            const mainProductInfo = document.createElement('div');
            mainProductInfo.classList.add('main_product_info');
            
            const productLink = document.createElement('a'); 
            productLink.classList.add('product_link')
            productLink.setAttribute('href', `/viewProduct/${product.id}`)

            const productImage = document.createElement('img');
            productImage.classList.add('product_item_image');
            productImage.src = `../../static/img/${product.imageFileName}`;
            
            const productTextDiv = document.createElement('div');
            productTextDiv.classList.add('product_item_div_text');

            const productName = document.createElement('h3');
            productName.classList.add('product_item_name');
            productName.textContent = product.name;

            const productId = document.createElement('p');
            productId.classList.add('product_item_id');
            productId.innerHTML = `<strong class = 'productId'>Id:</strong> ${product.id}`;

            const productCategory = document.createElement('p');
            productCategory.classList.add('product_item_category');
            productCategory.innerHTML = `<strong class = 'productCategory'>Category:</strong> ${product.category}`;

            const productConnectivity = document.createElement('p');
            productConnectivity.classList.add('product_item_connectivity');
            productConnectivity.innerHTML = `<strong class='productConnectivity'>Connectivity:</strong> ${product.connectivity}`;

            const productBrand = document.createElement('p');
            productBrand.classList.add('product_item_brand');
            productBrand.innerHTML = `<strong class = 'productBrand'>Brand:</strong> ${product.brand}`;

            const productPrice = document.createElement('p');
            productPrice.classList.add('product_item_price');
            productPrice.innerHTML = `<strong class = 'productPrice'>Price:</strong> R$ ${product.price.toFixed(2)}`;

            //====================================Botão para adicionar ao carrinho========================================
            const addToCartButton = document.createElement('button');
            addToCartButton.innerHTML = 'Add to Cart';
            addToCartButton.classList.add('cart_button');
            addToCartButton.addEventListener('click', (event) => addToCart(event));

            const linkViewProduct = document.createElement('a');
            linkViewProduct.classList.add('view_product_link')
            linkViewProduct.href=`/viewProduct/${product.id}`
            linkViewProduct.innerHTML = `<button class="view_product_button">
                                            View Product
                                        </button>`

            // ===========================Adicionar informações e botão ao container principal============================
            productTextDiv.appendChild(productName);
            productTextDiv.appendChild(productId);
            productTextDiv.appendChild(productCategory);
            productTextDiv.appendChild(productBrand);
            productTextDiv.appendChild(productPrice);

            productLink.appendChild(productImage);
            productLink.appendChild(productTextDiv);

            mainProductInfo.appendChild(productLink);

            const productActions = document.createElement('div');
            productActions.classList.add('product_item_actions');
            productActions.appendChild(addToCartButton);
            productActions.appendChild(linkViewProduct);

            productItem.appendChild(mainProductInfo);
            productItem.appendChild(productActions);

            productContainer.appendChild(productItem);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar produtos', error);
    });
}

//============================================================
document.getElementById('search_button').addEventListener('click', function() {
    const search_input = document.getElementById('search_input').value;
    updateProductList(search_input);
});

document.getElementById('search_input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const search_input = document.getElementById('search_input').value;
        updateProductList(search_input)
    }
});
//============================================================

document.addEventListener('DOMContentLoaded', () => {
    updateProductList(),
    loadCart(),
    updateTotal()
});



// ====== buy button action =============== 

document.getElementById('buy_bag').addEventListener('click', () => {
    const userID = getCookie('userID')

    if (userID) {
        window.location.href = `/payment/${userID}`;
    }
    else {
        window.location.href = "/home"
    }
})