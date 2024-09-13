const el = document.querySelectorAll(".action_header_container");

el.forEach((element) => {
    element.addEventListener("click", () => {
        el.forEach(elem => {
            elem.classList.remove('select_action');
        });

        element.classList.add("select_action");
    });
});

/* ------------------------ WINDOW ALERT -------------------------------- */

const windowAlertContainer = document.getElementById('message')
const windowAlertText =  document.getElementById('error_message')

document.getElementById('close_error_message').addEventListener('click', () => closeAlert())

function closeAlert() {
    windowAlertContainer.classList.add('hide')
}

function showAlert(message, alertType) {
    windowAlertContainer.classList.remove('hide')
    if (alertType == 'error') {
        windowAlertContainer.classList.remove('success')
        windowAlertContainer.classList.add('error')
        windowAlertText.innerHTML = `Error: ${message}`
    } else {
        windowAlertContainer.classList.remove('error')
        windowAlertContainer.classList.add('success')
        windowAlertText.innerHTML = `${message}`
    }

    setTimeout(() => {
        closeAlert()
    }, 3000);
}

/*-------------------------------- UPDATE PRODUCTS LIST ------------------------------------*/
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

            productTextDiv.appendChild(productName);
            productTextDiv.appendChild(productId);
            productTextDiv.appendChild(productCategory);
            productTextDiv.appendChild(productBrand);
            productTextDiv.appendChild(productPrice);
            mainProductInfo.appendChild(productImage);
            mainProductInfo.appendChild(productTextDiv);

            // buttons
            const productActions = document.createElement('div');
            productActions.classList.add('product_item_actions');

            const btnStock = document.createElement('button');
            btnStock.classList.add('product_item_action_button');
            btnStock.textContent = 'Stock Information';
            btnStock.addEventListener("click", () => StockInformation(product.id, product.name, 'In-Stock', product.stock))

            const btnEdit = document.createElement('button');
            btnEdit.classList.add('product_item_action_button');
            btnEdit.textContent = 'Edit Product';
            btnEdit.addEventListener('click', () => openEditForm(product.id, product.name, product.price, product.category, product.connectivity, product.description, product.brand))

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
        showAlert(error, 'error')
        console.error('Error fetching products', error);
    });
}

updateProductList()

/*----------------------- "SEE STOCK INFORMATION" ACTION -------------------------------*/

const StockProductStatus = document.getElementById('stock_product_status')
const StockInformationDiv = document.getElementById('stock_information')
const stockInput = document.getElementById('quantity_input')
const informationBox = document.getElementById('information_box')
const stockForm = document.getElementById('product_item_colors')

function StockInformation(productId, productName, productStatus, productStock) {
    StockInformationDiv.classList.remove('hide')
    informationBox.classList.remove('hide')
    StockProductStatus.innerHTML = `Status: ${productStatus}`;

    stockForm.dataset.pID = `${productId}`;

    stockInput.value=productStock;
}

function closeStockInformation() {
    informationBox.classList.add('hide')
    StockInformationDiv.classList.add('hide')
}

stockForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    const qtd = stockInput.value

    if (qtd) {
        fetch(`/api/products/stock/${stockForm.dataset.pID}`, { 
            method: 'PATCH', 
            headers: { 
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify({ 
                quantity: qtd
            }) 
        })
        .then(async response => {
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Network response was not ok');
            }

            const data = await response.json();
            return data;
        })
        .then(result => { 
            if (result.message === 'Stock updated successfully') { 
                showAlert(result.message, 'success');
                closeStockInformation(); 
                updateProductList(); 
            } else { 
                console.error('Error:', result.message); 
            } 
        })
        .catch(error => { 
            showAlert(error, 'error')
            console.error('Request failed:', error); 
        });

    } else {
        console.error('Invalid Number...');
    }
})



// ------------------- "DELETE" ACTION ---------------------------------------------*/

function deleteProduct(productID) {
    fetch(`/api/products/${productID}`, {
        method: 'DELETE'
    })
    .then(async response => {
        let data;
        if (response.status !== 204) { 
            data = await response.json();
        } else {
            data = { message: "Product deleted successfully" }
        }
        return { ok: response.ok, data };
    })
    .then(({ ok, data }) => {
        if (ok) {
            
            showAlert(data.message, 'success')
            updateProductList();
        } else {
            alert(`Erro: ${data.error}`);
        }
    })
    .catch(error => {
        showAlert(error, 'error')
        alert('Erro na comunicação com o servidor.');
    });
}

//--------------------------------- "ADD" PRODUCT ACTION - (PRODUCT FORM)  -----------------------------*/

const addProductContainer = document.getElementById('add_product')
const productForm = document.getElementById('productForm')
const closeProductWindowButton = document.getElementById('close_productForm')
const openProductWindowButton = document.querySelector('#add_product_button')


openProductWindowButton.addEventListener('click', () => openProductWindow());

function openProductWindow() {
    addProductContainer.classList.remove('hide');
    informationBox.classList.remove('hide');
}

// button to close form window

closeProductWindowButton.addEventListener('click', () => closeProductWindow())

function closeProductWindow() {
    addProductContainer.classList.add('hide')
    informationBox.classList.add('hide')
    productForm.reset();
}

// submit form action

productForm.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const imageInput = document.getElementById('input_imge');

    if (!imageInput.files.length) {
        alert('Please select an image file.');
        event.preventDefault(); 
    } else {
        const formData = new FormData(this);
        fetch('/api/products', {
            method: 'POST',
            body: formData
        })
        .then(async response => {
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Network response was not ok');
            }
    
            if (response.status === 204) {
                return { ok: true, data: { message: "Product created successfully" } };
            }
    
            const data = await response.json();
            return { ok: response.ok, data };
        })
        .then(({ ok, data }) => {
            console.log('processou o json e entrou no utlimo then');
            if (ok) {
                showAlert(data.message, 'success');
                closeProductWindow();
                updateProductList();
            } else {
                alert(`Erro: ${data.error}`);
            }
        })
        .catch(error => {
            showAlert(error, 'error')
            alert('Erro na comunicação com o servidor ' + error);
        });
    }
})

// --------------------------------- "EDIT" PRODUCT ACTION - (PRODUCT FORM)  -----------------------------*/
const editFormContainer = document.getElementById('edit_product')
const editProductForm = document.getElementById('editProductForm')
const productIDText = document.getElementById('editForm_productId')
const closeEditFormButton = document.getElementById('close_editForm')

function openEditForm(product_ID, productName, productPrice, productCategory, productConnectivity, productDescription, productBrand) {
    const nameInput = document.getElementById('name_editForm')
    const priceInput = document.getElementById('price_editForm')
    const categoryInput = document.getElementById('category_editForm')
    const connectivityInput = document.getElementById('connectivity_editForm')
    const descInput = document.getElementById('desc_editForm')
    const brandInput = document.getElementById('brand_editForm')

    textInputs = [nameInput, priceInput, categoryInput, connectivityInput, descInput, brandInput]
    textValues = [productName, productPrice, productCategory, productConnectivity, productDescription, productBrand]

    for(let i = 0; i < textInputs.length; i++) {
        textInputs[i].value = `${textValues[i]}`
    }

    editProductForm.dataset.productId = `${product_ID}`
    informationBox.classList.remove('hide')
    productIDText.innerHTML = `${product_ID}`
    editFormContainer.classList.remove('hide')
}

closeEditFormButton.addEventListener('click', () => closeEditForm())

function closeEditForm() {
    informationBox.classList.add('hide')
    editFormContainer.classList.add('hide')
    editProductForm.reset();
    productIDText.innerHTML = ''
    editProductForm.dataset.productId = ' '
}

// submit form action
editProductForm.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const productId = this.dataset.productId; 

    fetch(`/api/products/${productId}`, {
        method: 'PATCH',
        body: formData
    })
    .then(async response => {
        const data = await response.json();
        return ({ ok: response.ok, data });
    })
    .then(({ ok, data }) => {
        if (ok) {
            showAlert(data.message, 'success');
            updateProductList();
            closeProductWindow();
            closeEditForm();
        } else {
            alert(`Erro: ${data.error}`);
        }
    })
    .catch(error => {
        alert('Erro na comunicação com o servidor.');
    });

})



