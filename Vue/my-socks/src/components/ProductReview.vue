<template>
    <div>
        <form class="review-form" @submit.prevent="onSubmit">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
            </p>

            <ul>
                <li v-for="(error, index) in errors" :key="index">
                    {{ error }}
                </li>
            </ul>

            <p>
                <label for="name">Name:</label>
                <input v-model="name" placeholder="name" type="text" />
            </p>
            <p>
                <label for="review"></label
                ><textarea
                    id="review"
                    v-model="review"
                    cols="30"
                    rows="10"
                ></textarea>
            </p>
            <p>
                <label for="rating">Rating</label>
                <select id="rating" v-model.number="rating">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </p>
            <p>Would you recommend this product?</p>

            <label for="yes">Yes </label>
            <input v-model="recommend" value="Yes" type="radio" />
            <label for="no">No</label>
            <input v-model="recommend" value="No" type="radio" />
            <p><input type="submit" value="submit" /></p>
        </form>
    </div>
</template>

<script>
import { eventBus } from '../main';

export default {
    name: 'ProductReview',
    data: function() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: [],
        };
    },
    methods: {
        onSubmit() {
            this.errors = [];
            if (this.name && this.review && this.rating && this.recommend) {
                const productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend,
                };
                eventBus.$emit('review-submitted', productReview);
                console.log(productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
                this.recommend = null;
                this.errors = [];
            } else {
                if (!this.name) this.errors.push('Name required.');
                if (!this.review) this.errors.push('Review required.');
                if (!this.rating) this.errors.push('Rating required.');
                if (!this.recommend)
                    this.errors.push('Recommendation required.');
            }
        },
    },
};
</script>

<style scoped></style>
