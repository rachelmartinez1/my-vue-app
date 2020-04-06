var app = new Vue({
    el: '#app', 
    data: {
        brand: 'Rachel'/'s socks',
        product: 'Socks',
        selectedVariant: 0,
        url: 'https://www.youtube.com/watch?v=cN7P_SgWivk',
        details: ["80% sunshine", "Beautiful Views", "Vivid Colors"],

        variants: [
            {
                variantID: 2234,
                variantColor: "green",
                variantImage: './images/palm1.jpg',
                variantQuantity: 10,
                onSale: false
            },
            {
                variantID: 2236,
                variantColor: "red",
                variantImage: './images/palm2.jpg',
                variantQuantity: 0,
                onSale: true
            },
            {
                variantID: 2238,
                variantColor: "purple",
                variantImage: './images/palm3.jpg',
                variantQuantity: 7,
                onSale: false
            },
        ],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        onSale() {
            if (this.variants[this.selectedVariant].onSale == true) {
                console.log(this.brand + ' ' + this.product)
                return true
            }
            else { return false }
        }
    }
})