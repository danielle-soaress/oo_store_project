//=================Carrinho====================
document.getElementById("bag_icon").addEventListener("click", function() {
    document.getElementById("side_bag").classList.toggle("open");
});

document.getElementById("close_bag").addEventListener("click", function() {
    document.getElementById("side_bag").classList.remove("open");
});

//=================Visualizar produtos================
function updateProductList() {
    fetch('/api/products')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const productContainer = document.getElementById('viewProducts');
        productContainer.innerHTML = ''; // Limpa o container antes de adicionar novos produtos

        data.forEach(product => {
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
            productId.classList.add('product_item_text');
            productId.innerHTML = `<strong>Id:</strong> ${product.id}`;

            const productCategory = document.createElement('p');
            productCategory.classList.add('product_item_text');
            productCategory.innerHTML = `<strong>Category:</strong> ${product.category}`;

            const productConnectivity = document.createElement('p');
            productConnectivity.classList.add('product_item_text');
            productConnectivity.innerHTML = `<strong>Connectivity:</strong> ${product.connectivity}`;

            const productBrand = document.createElement('p');
            productBrand.classList.add('product_item_text');
            productBrand.innerHTML = `<strong>Brand:</strong> ${product.brand}`;

            const productPrice = document.createElement('p');
            productPrice.classList.add('product_item_text');
            productPrice.innerHTML = `<strong>Price:</strong> R$ ${product.price.toFixed(2)}`;

            // Botão para adicionar ao carrinho
            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Adicionar ao Carrinho';
            addToCartButton.classList.add('cart_button');
            addToCartButton.addEventListener('click', () => addToCart(product.id));

            // Adicionar informações e botão ao container principal
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

            productItem.appendChild(mainProductInfo);
            productItem.appendChild(productActions);

            productContainer.appendChild(productItem);
        });
    })
    .catch(error => {
        console.error('Error fetching products', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateProductList();
});

