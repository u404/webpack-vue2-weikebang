<template>
    <full-mask class="bottom-menu-wrap" :show="show" @click="$emit('maskclick');">
        <transition name="bottomIn" appear>
            <div class="bottom-menu">
                <slot></slot>
            </div>
        </transition>
    </full-mask>
</template>
<script>
    import FullMask from './FullMask';
    export default {
        props: {
            show: {
                type: Boolean,
                default: true
            }
        },
        components: {
            FullMask
        }
    }
</script>
<style>
    .bottom-menu-wrap { display: flex; flex-flow: column nowrap; justify-content: flex-end; }
    .bottom-menu { background: #fff; }
    .bottomIn-enter,.bottomIn-leave-active { transform: translateY(100%); }
    .bottomIn-enter-active, .bottomIn-leave-active { transition: transform 0.3s ease; }
</style>