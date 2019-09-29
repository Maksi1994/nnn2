import Vue from 'vue';
import Logo from '@/components/Logo.vue';
import SiteLogo from '@/components/site-logo.vue';
import FilterToggler from '@/components/time-filter-toggler.vue';

const components = {
    Logo,
    SiteLogo,
    FilterToggler,
};

Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component)
});
