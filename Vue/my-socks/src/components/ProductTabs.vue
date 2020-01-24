<template>
    <div>
        <div>
            <span
                v-for="(tab, index) in tabs"
                :key="index"
                :class="{ activeTab: selectedTab === tab }"
                class="tab"
                @click="selectedTab = tab"
                >{{ tab }}
            </span>
        </div>
        <div v-show="selectedTab === 'Reviews'">
            <p v-show="!getReviews.length">
                There are no reviews for this product
            </p>
            <ul v-for="(review, index) in getReviews" :key="index">
                <li>Name: {{ review.name }}</li>
                <li>Rating: {{ review.rating }}</li>
                <li>Review: {{ review.review }}</li>
                <li>Recommended: {{ review.recommend }}</li>
            </ul>
        </div>
        <div v-show="selectedTab === 'Write a Review'">
            <ProductReview></ProductReview>
        </div>
    </div>
</template>

<script>
import ProductReview from '@/components/ProductReview.vue';
export default {
    components: {
        ProductReview,
    },
    props: {
        getReviews: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            tabs: ['Reviews', 'Write a Review'],
            selectedTab: 'Reviews', //set from @click
        };
    },
};
</script>
