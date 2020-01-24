<template>
    <div id="Product">
        <div class="product">
            <div class="product-image">
                <a :href="link"><img :src="image" :alt="altText"/></a>
            </div>
            <div class="product-info">
                <h1>{{ title }}</h1>
                <!-- <h2 v-show="onSale">On Sale 🙂</h2> -->
                <p>{{ onSale }}</p>
                <p v-if="inStock">In stock!</p>
                <!-- else if only works in inStock above is edited to inStock > 10 -->
                <p v-else-if="inStock <= 10 && inStock > 0">
                    Almost sold out 💁‍♂️
                </p>
                <p v-else :class="{ outOfStock: !inStock }">
                    Out of stock 😞
                </p>
                <!-- <p>Shipping: {{ shipping }}</p> -->
                <ProductDetail
                    :details="details"
                    :shipping="shipping"
                ></ProductDetail>
                <!-- <ul>
                    <li v-for="(detail, index) in details" :key="index">
                        {{ detail }}
                    </li>
                </ul> -->
                <div
                    v-for="(variant, index) in variants"
                    :key="variant.variantID"
                    class="color-box"
                    :style="{ backgroundColor: variant.variantColour }"
                    @mouseover="updateProduct(index)"
                ></div>
                <div>
                    <button
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock }"
                        @click="addToCart"
                    >
                        Add to Cart
                    </button>

                    <button
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock }"
                        class="remove"
                        @click="removeFromCart"
                    >
                        Remove from Cart
                    </button>
                    <!-- <button color="green" @click="removeFromCart">
                        Remove from Cart
                    </button> -->
                </div>
            </div>

            <ProductTabs :get-reviews="reviews"></ProductTabs>
        </div>
    </div>
</template>

<script>
import ProductDetail from './ProductDetail.vue';
import ProductTabs from '@/components/ProductTabs.vue';
import { eventBus } from '../main';

// import ProductReview from '@/components/ProductReview.vue';

export default {
    components: {
        ProductDetail,
        ProductTabs,
        // ProductReview,
    },
    // props: {
    // premium: {
    //     type: Boolean,
    //     required: true,
    //     default: false,
    // },
    // },
    data: function() {
        return {
            premium: true,
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            // image1: require('./../assets/vmSocks-green-onWhite.jpg'),
            altText: 'A pair of socks',
            link: 'https://www.vuemastery.com',
            // inStock: false,
            // inventory: 0,
            // onSale: false,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColour: 'green',
                    img: require('./../assets/vmSocks-green-onWhite.jpg'),
                    variantQty: 5,
                    // onSale: true,
                },
                {
                    variantId: 2235,
                    variantColour: 'blue',
                    img: require('./../assets/vmSocks-blue-onWhite.jpg'),
                    variantQty: 1,
                },
            ],
            cart: 0,
            isOnSale: false,
            reviews: [],
        };
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].img;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQty;
        },
        onSale() {
            if (this.isOnSale) {
                return this.brand + ' ' + this.product + ' ' + 'is ON SALE!';
            }
            return ''; // this.brand + ' ' + this.product + ' are not on sale';
        },
        shipping() {
            if (this.premium) {
                return 'Free';
            } else {
                return '$2.99';
            }
        },
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview);
        });
    },

    methods: {
        addToCart() {
            this.$emit(
                'add-to-cart',
                this.variants[this.selectedVariant].variantId
            );
        },
        removeFromCart() {
            // this.cart = this.cart -= 1;
            console.log('Removing item');
            this.$emit(
                'remove-from-cart',
                this.variants[this.selectedVariant].variantId
            );
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    /* display: inline-block;
    margin: 0 10px; */
    font-size: 14px;
    margin: 0 20px;
    list-style-type: circle;
    /* display: inline; */
}
a {
    color: #42b983;
}

body {
    font-family: tahoma;
    color: #282828;
    margin: 0px;
}

.nav-bar {
    background: linear-gradient(-90deg, #84cf6a, #16c0b0);
    height: 60px;
    margin-bottom: 15px;
}

.product {
    display: flex;
    flex-flow: wrap;
    padding: 1rem;
}

img {
    border: 1px solid #d8d8d8;
    width: 70%;
    margin: 40px;
    box-shadow: 0px 0.5px 1px #d8d8d8;
}

.product-image {
    width: 80%;
}

.product-image,
.product-info {
    margin-top: 10px;
    width: 50%;
}

.color-box {
    width: 40px;
    height: 40px;
    margin-top: 5px;
}

.remove {
    margin-left: 20px;
    background-color: #eaa31e;
}

.cart {
    margin-right: 25px;
    float: right;
    border: 1px solid #d8d8d8;
    padding: 5px 20px;
}

button {
    margin-top: 30px;
    border: none;
    background-color: #1e95ea;
    color: white;
    height: 40px;
    width: 140px;
    font-size: 14px;
}

.disabledButton {
    background-color: #d8d8d8;
}

.review-form {
    width: 400px;
    padding: 20px;
    margin: 40px;
    border: 1px solid #d8d8d8;
}

input {
    width: 100%;
    height: 25px;
    margin-bottom: 20px;
}

textarea {
    width: 100%;
    height: 60px;
}

.tab {
    margin-left: 20px;
    cursor: pointer;
}

.activeTab {
    color: #1635c0;
    text-decoration: underline;
    font-size: 24px;
}
.outOfStock {
    text-decoration: line-through;
}
</style>
