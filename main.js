Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `<div class="product">

    <div class="product-image">
        <img :src="image">
    </div>

    <div class="product-info">
    <h1>{{ product }}</h1>
    <p>
        <span v-if="inStock">In Stock</span>
        <span v-else>Out of Stock</span>

        <span v-if="onSale"
        class="sale">Sale!</span>

        <p>Shipping: {{ shipping }}</p>
    </p>

    <div v-for="(variant, index) in variants"
        :key="variant.variantID"
        class="color-box"
        :style="{ backgroundColor: variant.variantColor }"
        @mouseover="updateProduct(index)">
    </div>

    <product-details></product-details>

    <button v-on:click="addToCart" 
    :disabled="!inStock"
    :class="{ disabledButton: !inStock }">Add to Cart</button>

</div>

<div>
    <h2>Reviews</h2>
    <p v-if="!reviews.length">The are no reviews yet</p>
    <ul>
        <li v-for="review in reviews">
            <p>{{ review.name }}</p>
            <p>{{ review.rating }}</p>
            <p>{{ review.review }}</p>
            <p>{{ review.recommend }}</p>
        </li>
    </ul>
</div>

    <product-review @review-submitted="addReview"></product-review>

</div>`,

data() {
    return {
        brand: 'Rachels socks',
        product: 'Socks',
        selectedVariant: 0,
        url: 'https://www.youtube.com/watch?v=cN7P_SgWivk',

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
        reviews: []
    }
},
methods: {
    addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].variantID)
    },
    updateProduct(index) {
        this.selectedVariant = index
        console.log(index)
    },
    addReview(productReview) {
        this.reviews.push(productReview)
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
        return false
    }, 
    shipping() {
        if (this.premium) {
            return "Free"
        }
        return "$2.99"
    }
}

})

Vue.component('product-details', {
    template: `
        <ul>
            <li>{{ details.first }}</li>
            <li>{{ details.second }}</li>
            <li>{{ details.third }}</li>
        </ul>
    `,
    data() {
        return { 
            details: { first: "80% sunshine", second: "Beautiful Views", third: "Vivid Colors" }
        }
    },
    computed: {
        thedetails() {
            if (this.details) {
                return "yo"
            }
            return "false"
        }
    }
})

Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">

            <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>

            <p>
                <label for="rating">Name:</label>
                <input id="name" v-model="name">
            </p>

            <p>
                <label for="review">Review:</label>
                <textarea id="review" v-model="review"></textarea>
            </p>

            <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>

            <p>
                <fieldset>
                    <label for="recommend">Would you recommend this product?</label>
                    <br>
                    <input type="radio" value="1" id="recommend" class="radio" v-model="recommend">Yes</input>
                    <input type="radio" value="0" id="recommend" class="radio" v-model="recommend">No</input>
                </fieldset>
            </p>

            <p>
                <input type="submit" value="Submit">
            </p>
        </form>
        `,
        data() {
            return {
                name: null,
                review: null,
                rating: null,
                recommend: null,
                errors: []
            }
        },
        methods: {
            onSubmit() {
                if (this.name && this.review && this.rating) {
                    let productReview = {
                        name: this.name,
                        review: this.review,
                        rating: this.rating,
                        recommend: this.recommend,
                    }
                        //sending productReview to review-submitted
                        //and setting the values back to null
                        this.$emit('review-submitted', productReview)
                        this.name = null
                        this.review = null
                        this.rating = null
                        this.recommend = null
                }
                else {
                    if (!this.name) this.errors.push("Name required.")
                    if (!this.review) this.errors.push("Review required.")
                    if (!this.rating) this.errors.push("Rating required.")
                    if (!this.recommend) this.errors.push("Recommendation required")
                }
            }
        }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    }
})