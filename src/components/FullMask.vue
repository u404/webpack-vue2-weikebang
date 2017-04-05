<template>
    <transition name="fade" appear>
        <div class="fullmask" v-show="show" @click.self="$emit('click')">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: true
            }
        }
    };
</script>

<style>
    .fullmask { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.6); z-index: 1000; }

    .fade-enter, .fade-leave-active { opacity: 0; }
    .fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
</style>