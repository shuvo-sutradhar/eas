<template>
  <div class="wrapper">
    <navbar />
    <sidebar />

    <!-- Main content -->
    <section class="content-wrapper">
      <div class="container-fluid">
        <child />
      </div><!-- /.container-fluid -->
    </section>

  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Sidebar from '~/components/Sidebar'

export default {
  name: 'MainLayout',

  components: {
    Navbar, Sidebar
  }
}
</script>