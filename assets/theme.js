var matchedVariant;

document.querySelectorAll('.product-option input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
        // Find Selected Options
        var selectedOptions = []
        document.querySelectorAll('.product-option input[type="radio"]:checked ').forEach(radio => {
            selectedOptions.push(radio.value);
        })

        // Select variant based on selected options
        matchedVariant = product.variants.find((variant) => {
            return variant.options.every((option, index) => option === selectedOptions[index]);
        });

        // Set the variant ID directly in the hidden input field
        document.querySelector('#product-id').value = matchedVariant.id;
        // Call the function to update with variant id 
        updateUrlWithVariant(matchedVariant.id);
        priceUpdate();
        imageUpdate();
    });
});

//Function to update the url
function updateUrlWithVariant(variantId) {
    let currentUrl = window.location.href.split('?')[0];
    let newUrl = `${currentUrl}?id=${variantId}`;
    window.history.pushState({
        path: newUrl
    }, '', newUrl);
}

function priceUpdate() {
    let priceWithoutDiscount = matchedVariant.price / 100;
    document.querySelector(".product-info .price span").textContent = priceWithoutDiscount.toFixed(2);
}


function imageUpdate() {
    if (matchedVariant && matchedVariant.featured_image) {
        document.querySelector(".main_product-media .product_main-item img").setAttribute("src", matchedVariant.featured_image.src);
    }
}









// Quantity Selector
let quantityInputs = document.querySelectorAll(".quantity-selector");

document.querySelectorAll(".quantity-plus, .quantity-minus").forEach((adjustbtn) => {
    adjustbtn.addEventListener("click", () => {
        // Correct the class name typo here
        let quantityInput = adjustbtn.closest('.quantity-selector').querySelector(".quantity");
        let quantity = parseInt(quantityInput.value);
        if (adjustbtn.classList.contains('quantity-plus')) {
            quantity++;
        } else {
            if (quantity > 1) {
                quantity--;
            }
        }
        quantityInput.value = quantity;
    });
});
