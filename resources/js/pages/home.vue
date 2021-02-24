<template>
<div>
    <!-- breadcrumbs Start -->
    <breadcrumbs :items="breadcrumbs" :current="breadcrumbsCurrent" />
    <!-- breadcrumbs end -->
      
</div>
</template>

<script>
export default {
  middleware: 'auth',

  metaInfo () {
    return { title: this.$t('home') }
  },

  data: () => ({
      breadcrumbsCurrent: 'Dashboard',
      breadcrumbs:[
          {
              name:'Home',
              url: ''
          }
      ]
  }),

}
</script>
