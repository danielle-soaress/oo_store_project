const el = document.querySelectorAll(".action_header_container");

el.forEach((element) => {
    element.addEventListener("click", () => {
        el.forEach(elem => {
            elem.classList.remove('select_action');
        });

        element.classList.add("select_action");
    });
});

/* ------------------------ "Add Product" form functions--------------------*/

/*--------------------------------------------------------------------------*/
function updateProductList() {
    fetch('/api/products')
    .then(response => response.json())
    .then(data => {
        const productContainer = document.getElementById('products_list_container');
        productContainer.innerHTML = ''
        data.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product_item');

            // text and image content
            const mainProductInfo = document.createElement('div');
            mainProductInfo.classList.add('main_product_info');
            
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

            /*
            const productStatus = document.createElement('p');
            productStatus.classList.add('product_item_text');
            productStatus.innerHTML = `<strong>Status:</strong> ${product.status}`;*/

            productTextDiv.appendChild(productName);
            productTextDiv.appendChild(productId);
            productTextDiv.appendChild(productCategory);
            productTextDiv.appendChild(productBrand);
            productTextDiv.appendChild(productPrice);
            /*productTextDiv.appendChild(productStatus);*/

            mainProductInfo.appendChild(productImage);
            mainProductInfo.appendChild(productTextDiv);

            // buttons
            const productActions = document.createElement('div');
            productActions.classList.add('product_item_actions');

            const btnStock = document.createElement('button');
            btnStock.classList.add('product_item_action_button');
            btnStock.textContent = 'Stock Information';
            btnStock.addEventListener("click", () => StockInformation(product.name, 'in-stock', product.colorStock))

            const btnEdit = document.createElement('button');
            btnEdit.classList.add('product_item_action_button');
            btnEdit.textContent = 'Edit Product';

            const btnDelete = document.createElement('button');
            btnDelete.classList.add('product_item_action_button');
            btnDelete.textContent = 'Delete Product';
            btnDelete.addEventListener('click', () => deleteProduct(product.id))
            productActions.appendChild(btnStock);
            productActions.appendChild(btnEdit);
            productActions.appendChild(btnDelete);

            productItem.appendChild(mainProductInfo);
            productItem.appendChild(productActions);

            productContainer.appendChild(productItem);
        });
    })
    .catch(error => {
        console.error('Error fetching products', error);
    });
}

updateProductList()


/*----------------------- STOCK INFORMATION -------------------------------*/

const StockProductName = document.querySelector('#stock_product_name')
const StockProductStatus = document.querySelector('#stock_product_status')
const StockProductColorsDiv = document.querySelector('#stock_product_colors')
const StockInformationDiv = document.querySelector('#stock_information')
const informationBox = document.querySelector('#information_box')

function StockInformation(productName, productStatus, productStock) {
    StockInformationDiv.classList.remove('hide')
    informationBox.classList.remove('hide')
    StockProductName.innerHTML = `${productName}`;
    StockProductStatus.innerHTML = `${productStatus}`;

    StockProductColorsDiv.innerHTML = '';

    for (var color in productStock) {
        const colorDiv = document.createElement('div');
        colorDiv.classList.add('color_info');

        const colorCircle = document.createElement('div');
        colorCircle.classList.add('p_color');
        colorCircle.style.backgroundColor = `${color}`;

        const inputElement = document.createElement('input');
        inputElement.classList.add('quantity_input');
        inputElement.type = 'number';
        inputElement.min = '0';
        inputElement.step = '1';
        inputElement.value = productStock[color];

        colorDiv.appendChild(colorCircle);
        colorDiv.appendChild(inputElement);
        StockProductColorsDiv.appendChild(colorDiv);
    }
}

function closeStockInformation() {
    informationBox.classList.add('hide')
    StockInformationDiv.classList.add('hide')
}

function saveStockInformation() {
    informationBox.classList.add('hide')
    StockInformationDiv.classList.add('hide')
}

function deleteProduct(productID) {
    fetch(`/api/products/${productID}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log('EBAA! Produto foi deletado.');
            updateProductList();
        } else {
            console.log('ERRO: Produto não foi deletado.');
        }
    })
    .catch(error => {
        console.error('Erro na requisição: ', error);
    });
}




/* --------------------------------- PRODUCT FORM  -----------------------------*/

const addProductContainer = document.getElementById('add_product')
const productForm = document.getElementById('productForm')
const addColorStockButton = document.getElementById('add_color_productForm')
const container = document.getElementById('colorStockContainer');

// color stock - button to add colors


addColorStockButton.addEventListener('click', () => addColorStock())

function addColorStock() {
    const div = document.createElement('div');
    div.className = 'color-stock';
    div.innerHTML = `
        <input  class="productForm_input" type="text" name="colorStock" placeholder="Hex Color (ex: #FFFFFF)" required>
        <input  class="productForm_input" style="width: 90px;" type="number" name="colorStockQuantity" placeholder="Quantity" min="0" required>
        <br>
        `;
    container.appendChild(div);
}


function openProductWindow() {
    addProductContainer.classList.remove('hide')
    informationBox.classList.remove('hide')
}

function closeProductWindow() {
    addProductContainer.classList.add('hide')
    informationBox.classList.add('hide')
    productForm.reset();

}

productForm.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const imageInput = document.getElementById('input_imge');

    if (!imageInput.files.length) {
        alert('Please select an image file.');
        event.preventDefault(); 
    } else {

        const formData = new FormData(this);

        formData.forEach((value, key) => {
            console.log(key, value);
        });

        fetch('/api/products', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert('deu certo')
                updateProductList();
            } else {
                alert(`Erro`);
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            alert('Erro na comunicação com o servidor.');
        });

        closeProductWindow()
    }
})



