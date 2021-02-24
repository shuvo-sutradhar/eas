<template>
    <div>
        <!-- breadcrumbs Start -->
        <breadcrumbs :items="breadcrumbs" :current="breadcrumbsCurrent" />
        <!-- breadcrumbs end -->
        

        <div class="row">
            <div class="col-md-6 m-auto">
              <div class="card card-primary card-outline">

                <div class="card-header">
                  <h3 class="card-title mt-2">Role</h3>
                  <div class="card-tools">
                    <router-link :to="{ name: 'role.create' }" class="btn btn-block btn-primary">
                      Create <i class="fas fa-plus-circle"></i>
                    </router-link>
                  </div>
                </div>
                <!-- /.card-header -->

                <div class="card-body p-0">
                  <div class="table-responsive mailbox-messages">
                    <table class="table table-hover table-striped">
                      <tbody>
                        <tr v-for="(data, i) in roles" :key="i">
                          <td>
                            <a href="read-mail.html" class="text-capitalize">{{ data.name }}</a>
                          </td>
                          <td class="tbl-btns text-right">
                            <div class="btn-group show">
                              <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-secondary dropdown-toggle action-dropdown-toggle"><i class="fas fa-ellipsis-v"></i></button>
                              <div class="dropdown-menu dropdown-menu-right">
                                <router-link v-if="$can('role_edit')" :to="{ name: 'role.edit', params: { slug: data.slug } }" class="dropdown-item"><i class="fas fa-edit"></i> Edit</router-link> 
                                <a v-if="$can('role_delete')" @click="deleteData(data.slug)" href="#" class="dropdown-item delete-btn">
                                  <i class="fas fa-trash"></i> Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- /.table -->
                  </div>
                  <!-- /.mail-box-messages -->
                </div>
                <!-- /.card-body -->
                <div class="card-footer p-0">
                  <div class="mailbox-controls">
                    <!-- Check all button -->
                    <button type="button" class="btn btn-default btn-sm checkbox-toggle">
                      <i class="far fa-square"></i>
                    </button>
                    <div class="btn-group">
                      <button type="button" class="btn btn-default btn-sm">
                        <i class="far fa-trash-alt"></i>
                      </button>
                      <button type="button" class="btn btn-default btn-sm">
                        <i class="fas fa-reply"></i>
                      </button>
                      <button type="button" class="btn btn-default btn-sm">
                        <i class="fas fa-share"></i>
                      </button>
                    </div>
                    <!-- /.btn-group -->
                    <button type="button" class="btn btn-default btn-sm">
                      <i class="fas fa-sync-alt"></i>
                    </button>
                    <div class="float-right">
                      1-50/200
                      <div class="btn-group">
                        <button type="button" class="btn btn-default btn-sm">
                          <i class="fas fa-chevron-left"></i>
                        </button>
                        <button type="button" class="btn btn-default btn-sm">
                          <i class="fas fa-chevron-right"></i>
                        </button>
                      </div>
                      <!-- /.btn-group -->
                    </div>
                    <!-- /.float-right -->
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>



<script>
import { mapGetters } from "vuex"
export default {

    middleware: ['auth','check-permissions'],

    metaInfo () {
      return { title: this.$t('Role') }
    },

    data: () => ({
      breadcrumbsCurrent: 'Roles',
      breadcrumbs:[
        {
            name:'Dashboard',
            url: 'home'
        },
        {
            name:'Settings',
            url: 'settings'
        },
        {
            name:'Role',
            url: ''
        },
      ]
    }),

    methods: {

        // get data 
        async getData() {
            this.$store.state.role.loading=true;
            await this.$store.dispatch('role/fetchRoles');
        },

        // Pagination
        async paginate(){
            this.getData();
        },

        //delete data
        async deleteData(roleSlug) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You will not be able to return to this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, Delete it!'
                }).then((result) => {
                    // Send request to the server
                    if (result.value) {
                        this.$store.dispatch('role/deleteRoles', roleSlug)
                        .then((response)=>{
                           if(response==true) {
                               Swal.fire('Deleted!','Your file has been deleted.','success' )
                           } else {
                               Swal.fire("Failed! "," There was something wrong.", "warning");
                           }
                        })
                    }
                })
        }
    },

    // Map Getters
    computed: {
        ...mapGetters('role', ['roles','loading',]),
    },
    

    created() {
        this.getData();
    }
}
</script>