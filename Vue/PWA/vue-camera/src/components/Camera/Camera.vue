<template>
    <div class="camera">
        <video class="feed" autoplay src=""></video>
        <button class="snap">Snap!</button>
    </div>
</template>
<script>
    export default {
        name: "camera",
        methods: {
            init() {

            }
        },
    };
</script>

<style lang="scss" scoped>
    .camera {
        padding: 25px;
        width: 100vw;
        height: 100vh;
        box-sizing: border-box;

        .feed {
            display: block;
            width: 100%;
            max-width: 1280px;
            margin: 0 auto;
            background-color: #171717;
            box-shadow: 6px 6px 12px 0 rgba(0, 0, 0, 0.35);
        }
    }

    .snap {
        display: block;
        width: 75px;
        height: 75px;

        margin: 25px auto;

        border-radius: 50%;
        background-color: transparentize(#ffce80, $amount: 0.5);
        border: 1px solid black;
        outline: none;
        cursor: pointer;

        &:hover {
            background-color: transparentize(#0d8faf, $amount: 0.2);
        }

        &:active {
            background-color: darken(#ffce80, $amount: 0.2);
        }
    }
</style>
