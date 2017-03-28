<template>
    <div class="page">
        <header>
            <slot name="header"></slot>
        </header>
        <div class="main">
            <slot></slot>
        </div>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'Page',
        data: function(){
            return {

            }
        }
    }
</script>


<style>
.page {
    position: absolute; top: 0; left: 0;
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
}

.page>header {
    text-align: center;
    flex: 0 0 auto;
}

.page>footer {
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.page>footer .btn {
    width: 100%;
    height: 4.8rem;
    flex-grow: 1;
    line-height: 4.8rem;
    text-align: center;
    border: none;
}

.main {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}

section, .section {
    display: block;
    background: #fff;
    border-bottom: 1px solid #e6e6e6;
}

</style>