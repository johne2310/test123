export const selectAll = {
    inserted(el) {
        const input = el.querySelector('.q-field__native');
        input.addEventListener('focus', () => {
            if (input.value.length) {
                console.log('Select text');
                input.select();
            }
        });
    },
}