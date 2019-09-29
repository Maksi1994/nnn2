<template>
    <div>
        <b-form @submit.prevent="save" @reset.prevent="reset">
            <b-form-group
                    id="input-group-1"
                    label="Title:"
                    label-for="input-1">
                <b-form-input
                        id="input-1"
                        :state="getState('title')"
                        v-model="form.title"
                        type="text"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                    id="input-group-1"
                    label="Body:"
                    label-for="input-1">
                <b-form-textarea
                        id="textarea"
                        :state="getState('body')"
                        v-model="form.body"
                        rows="3"
                        max-rows="6"></b-form-textarea>
            </b-form-group>
            <div class="d-flex justify-content-end mt-5">
                <b-button type="reset" variant="danger" class="mr-3">Reset</b-button>
                <b-button type="submit" variant="primary" class="save-btn">Save</b-button>
            </div>

        </b-form>
    </div>
</template>

<script>
    import * as _ from 'lodash';
    import {required, minLength} from 'vuelidate/lib/validators'

    export default {
        layout: 'backend',
        data() {
            return {
                wasSubmitted: false,
                form: {
                    title: '',
                    body: ''
                }
            }
        },
        async asyncData({params: {id}, $axios}) {
            let data = {};

            if (id) {
                data = await $axios.get(`/backend/news/get-one/${id}`);
            }

            return {
                form: {
                 ..._.pick(data, ['title', 'body'])
                }
            }

        },
        methods: {
            save() {
                this.wasSubmitted = true;

                if (!this.$v.form.$invalid) {
                    console.log('valid!!!');
                }
            },
            reset() {
                for (let k in this.form) {
                    this.form[k] = null;
                }
            },
            getState(field) {
                return !this.wasSubmitted ? null : !this.$v.form[field].$invalid;
            }
        },
        validations: {
            form: {
                title: {
                    required,
                    minLength: minLength(3)
                },
                body: {
                    required,
                    minLength: minLength(100)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
 .save-btn {
     width: 250px;
 }
</style>
