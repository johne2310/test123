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
        <div v-show="selectedTab === 'Shipping'">
            {{ shipping }}
        </div>
        <div v-show="selectedTab === 'Details'">
            <ProductDetail :details="details"></ProductDetail>
        </div>
    </div>
</template>

<script>
import ProductDetail from '@/components/ProductDetail.vue';
export default {
    name: 'Shipping',
    components: {
        ProductDetail,
    },
    props: {
        premium: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            tabs: ['Details', 'Shipping'],
            selectedTab: 'Details', //set from @click
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        };
    },
    computed: {
        shipping: function() {
            if (this.premium) {
                return 'Free';
            } else {
                return '$2.99';
            }
        },
    },
};
</script>
