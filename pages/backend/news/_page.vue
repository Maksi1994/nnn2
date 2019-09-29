<template>
    <section>
        <div class="py-3 d-flex mb-2">
            <div class="right-part ml-auto d-flex ">
                <filter-toggler @activateFilter="changeFilter('orderType', ['new', $event])"
                                     :params="filterBtnsParams['new']"
                                     :active="isActFilt('new')">
                </filter-toggler>
            </div>
        </div>
        <div class="content-wrap pb-5">
            <ul class="list-unstyled d-flex flex-wrap align-items-center">

                <b-media v-for="newsItem in news" :key="newsItem.id" tag="li" class="mb-3 w-100 border-bottom pb-2 pl-4 pr-4">
                    <div class="mb-2 mr-2">
                        <b-img blank blank-color="#abc" width="64" alt="placeholder"></b-img>
                    </div>
                    <h5 class="mt-0 mb-1">{{newsItem.title}}</h5>
                    <p class="mb-0 w-100">
                      {{newsItem.body}}
                    </p>
                </b-media>
            </ul>
        </div>

        <div class="mt-5 py-3 d-flex justify-content-center fixed-bottom pagination-wrap border-top shadow">
            <b-pagination
                    v-model="page"
                    :total-rows="meta.total"
                    :per-page="meta.per_page"
            ></b-pagination>
        </div>

    </section>
</template>

<script>
    import * as _ from 'lodash';

    export default {
        layout: 'backend',
        data() {
            return {
                page: 1,
                order: 'desc',
                orderType: 'new',
                news: [],
                meta: null,
                filterBtnsParams: {
                    new: {
                        title: 'Newest',
                        mainIcon: '',
                        iconUp: '',
                        iconDown: ''
                    },
                    popular: {
                        title: 'Newest',
                        mainIcon: '',
                        iconUp: '',
                        iconDown: ''
                    }
                }
            }
        },
        async asyncData({params: {page}, query: {order}, $axios,}) {
            const componentParams = {
                page: page || 1,
                order: order || 'desc'
            };

            const {data: {meta, data}} = await $axios.post('https://news-parser.com/api/backend/news/get-list', componentParams);

            return {
                news: data,
                meta,
                ...componentParams
            }
        },
        watch: {
            $route({order, orderType}) {
                this.order = order;
                this.orderType = orderType;

                this.load();
            },
        },
        methods: {
            async load() {
                const reqParams = _.pick(this, ['order', 'orderType', 'page']);
                const {data: {data, meta}} = await this.$axios.post('https://news-parser.com/api/backend/news/get-list', reqParams);

                this.news = data;
                this.meta = meta;
            },
            changeFilter(type, params) {
                this[type] = params[0];
                this.order = params[1] ? 'desc' : 'asc';
                this.load();

            },
            isActFilt(name) {
                return this.orderType === name;
            }
        },
    }
</script>

<style scoped lang="scss">
    .content-wrap {
        min-height: 70vh;
    }

    .media-body {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .pagination-wrap {
        background:#fff;
    }
</style>
