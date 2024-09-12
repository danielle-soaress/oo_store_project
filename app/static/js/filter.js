const filtersDiv = document.querySelectorAll('.filter_category')
console.log(filtersDiv)

filtersDiv.forEach(div => {
    div.addEventListener('click', () => {
        filterProducts(div.dataset.filter, div.dataset.name)
    })
})


function filterProducts(criterion, name) {
    fetch(`/api/products/${criterion}/${name}`)
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

            //==============Botão para adicionar ao carrinho==============
            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Adicionar ao Carrinho';
            addToCartButton.classList.add('cart_button');
            addToCartButton.addEventListener('click', (event) => addToCart(event));

            // =========Adicionar informações e botão ao container principal============
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



