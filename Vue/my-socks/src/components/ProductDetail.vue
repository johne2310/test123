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
            <ul id="ProductDetail">
                <li v-for="(detail, index) in details" :key="index">
                    {{ detail }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        details: {
            type: Array,
            required: true,
        },
        shipping: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            tabs: ['Details', 'Shipping'],
            selectedTab: 'Details', //set from @click
        };
    },
};
</script>

<style>
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
</style>
