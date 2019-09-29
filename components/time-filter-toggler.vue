<template>
    <div class="border-left px-2 border-right d-table">
        <span class="mr-3" v-if="params.title">{{params.title}}</span>

        <b-button variant="outline-primary" :class="{active: isActive}" @click="toggle">
            <i class="far fa-clock mr-2"></i>
            <i class="fas fa-arrow-up" v-if="myState"></i>
            <i class="fas fa-arrow-down" v-else></i>
        </b-button>

    </div>
</template>

<script>
    export default {
        props: [
            'state',
            'title',
            'active',
            'params'
        ],
        data() {
            return {
                isActive: this.active,
                myState: this.state
            }
        },
        watch: {
            active(isActive) {
                this.isActive = isActive;
            },
            state(state) {
                debugger
                this.myState = state;
            }
        },
        methods: {
            toggle() {
                this.myState = !this.isActive ? true : !this.myState;
                this.$emit('activateFilter', !this.myState);
            }
        }
    }
</script>

<style scoped lang="scss">
    span {
        color: gray;
    }
</style>
