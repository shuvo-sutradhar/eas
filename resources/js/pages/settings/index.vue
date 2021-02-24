<template>
  <div>
    <!-- breadcrumbs Start -->
    <breadcrumbs :items="breadcrumbs" :current="breadcrumbsCurrent" />
    <!-- breadcrumbs end -->

    <div class="row set-up-page">
      <div class="col-md-4 col-sm-6 col-12">
          <a href="https://productify.codeshaper.net/admin/general-settings">
            <div class="info-box">
                <span class="info-box-icon bg-success"><i class="fas fa-tools"></i></span> 
                <div class="info-box-content"><span class="info-box-text">General Settings</span> <span class="info-box-number">18</span></div>
            </div>
          </a>
      </div>
      <div class="col-md-4 col-sm-6 col-12">
          <router-link :to="{ name: 'users'}">
            <div class="info-box">
                <span class="info-box-icon bg-success"><i class="fas fa-wallet"></i></span> 
                <div class="info-box-content"><span class="info-box-text">User</span> <span class="info-box-number text-bold">8</span></div>
            </div>
          </router-link>
      </div>
      <div class="col-md-4 col-sm-6 col-12">
          <router-link :to="{ name: 'settings.roles' }">
            <div class="info-box">
                <span class="info-box-icon bg-success"><i class="fas fa-stream"></i></span> 
                <div class="info-box-content"><span class="info-box-text">Role & Permission</span> <span class="info-box-number text-bold">9</span></div>
            </div>
          </router-link>
      </div>
      <div class="col-md-4 col-sm-6 col-12">
          <a href="https://productify.codeshaper.net/admin/sizes">
            <div class="info-box">
                <span class="info-box-icon bg-success"><i class="fas fa-ruler"></i></span> 
                <div class="info-box-content"><span class="info-box-text">Permission</span> <span class="info-box-number">11</span></div>
            </div>
          </a>
      </div>
      <div class="col-md-4 col-sm-6 col-12">
          <a href="https://productify.codeshaper.net/admin/showrooms">
            <div class="info-box">
                <span class="info-box-icon bg-success"><i class="fas fa-store"></i></span> 
                <div class="info-box-content"><span class="info-box-text">Showrooms</span> <span class="info-box-number text-bold">7</span></div>
            </div>
          </a>
      </div>
      <div class="col-md-4 col-sm-6 col-12">
          <a href="https://productify.codeshaper.net/admin/units">
            <div class="info-box">
                <span class="info-box-icon bg-success"><i class="fas fa-balance-scale"></i></span> 
                <div class="info-box-content"><span class="info-box-text">Units Setting</span> <span class="info-box-number">7</span></div>
            </div>
          </a>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  metaInfo () {
    return { title: this.$t('Settings') }
  },

  data: () => ({
      breadcrumbsCurrent: 'Settings',
      breadcrumbs:[
          {
              name:'Dashboard',
              url: 'home'
          },
          {
              name:'Settings',
              url: ''
          },
      ]
  }),

}
</script>
