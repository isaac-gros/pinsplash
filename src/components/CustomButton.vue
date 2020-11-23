<template>
    <button>
        {{ buttonText }}
    </button>
</template>

<script>
export default {
    name: 'custom-button',
    props: ['buttonText']
}
</script>