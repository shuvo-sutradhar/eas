<template>
    <div>
        <!-- breadcrumbs Start -->
        <breadcrumbs :items="breadcrumbs" :current="breadcrumbsCurrent" />
        <!-- breadcrumbs end -->
        

        <div class="row">
            <div class="col-md-10 m-auto">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title mt-2">
                            <div class="input-group input-group-sm" style="width: 150px;">
                                <input type="text" name="table_search" class="form-control float-right" placeholder="Search">

                                <div class="input-group-append">
                                <button type="submit" class="btn btn-default">
                                    <i class="fas fa-search"></i>
                                </button>
                                </div>
                            </div>
                        </div>
                        <div class="card-tools mt-2">
                            <div class="card-tools">
                                <router-link :to="{ name: 'user.create' }" class="btn btn-block btn-primary">
                                Create <i class="fas fa-plus-circle"></i>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <table class="table table-bordered">
                        <thead>
                            <tr>
                            <th style="width: 10px">#</th>
                            <th>Task</th>
                            <th>Progress</th>
                            <th style="width: 40px">Label</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1.</td>
                            <td>Update software</td>
                            <td>
                                <div class="progress progress-xs">
                                <div class="progress-bar progress-bar-danger" style="width: 55%"></div>
                                </div>
                            </td>
                            <td><span class="badge bg-danger">55%</span></td>
                            </tr>
                            <tr>
                            <td>2.</td>
                            <td>Clean database</td>
                            <td>
                                <div class="progress progress-xs">
                                <div class="progress-bar bg-warning" style="width: 70%"></div>
                                </div>
                            </td>
                            <td><span class="badge bg-warning">70%</span></td>
                            </tr>
                            <tr>
                            <td>3.</td>
                            <td>Cron job running</td>
                            <td>
                                <div class="progress progress-xs progress-striped active">
                                <div class="progress-bar bg-primary" style="width: 30%"></div>
                                </div>
                            </td>
                            <td><span class="badge bg-primary">30%</span></td>
                            </tr>
                            <tr>
                            <td>4.</td>
                            <td>Fix and squish bugs</td>
                            <td>
                                <div class="progress progress-xs progress-striped active">
                                <div class="progress-bar bg-success" style="width: 90%"></div>
                                </div>
                            </td>
                            <td><span class="badge bg-success">90%</span></td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer clearfix">
                        <ul class="pagination pagination-sm m-0 float-right">
                        <li class="page-item"><a class="page-link" href="#">«</a></li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">»</a></li>
                        </ul>
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
      breadcrumbsCurrent: 'User',
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
            name:'User',
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

