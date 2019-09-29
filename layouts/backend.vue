<template>
   <section>
       <b-nav tabs  class="pt-2 fixed-top nav-line ">
           <site-logo></site-logo>
           <div class="px-5 d-flex">


               <b-nav-item active-class="active" to="/backend/news">News</b-nav-item>
               <b-nav-item active-class="active" to="/backend/sources">Sources</b-nav-item>
           </div>

       </b-nav>

       <section class="container pb-5">
           <Nuxt />
       </section>
   </section>
</template>

<script>
    export default {
        name: "backend",
    }
</script>

<style scoped>
    .logo {
        display: block;
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }

    .nav-line {
        background: #fff;
    }

    .container {
        margin-top: 100px;
    }
</style>
