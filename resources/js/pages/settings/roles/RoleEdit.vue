<template>
    <div>
        <!-- breadcrumbs Start -->
        <breadcrumbs :items="breadcrumbs" :current="breadcrumbsCurrent" />
        <!-- breadcrumbs end -->
        

        <div class="row">
            <div class="col-md-6 m-auto">
              <form @submit.prevent="updateRole" @keydown="form.onKeydown($event)">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title mt-2">Create Role</h3>
                    <div class="card-tools">
                      <router-link :to="{ name: 'settings.roles' }" class="btn btn-block btn-danger">
                        GO back <i class="fas fa-undo-alt"></i>
                      </router-link>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="input-group">
                      <input v-model="form.name" :class="{ 'is-invalid': form.errors.has('name') }" class="form-control" placeholder="Role name">
                      <div class="input-group-append">
                        <v-button :loading="form.busy" class="btn btn-primary">
                          Add
                        </v-button>
                      </div>
                      <has-error :form="form" field="name" />                         
                    </div>
                    <!-- /input-group -->
                  </div>
                </div><!-- /. Role add card end -->

                <!-- card area start -->
                <div class="card" :class="{ 'is-invalid': form.errors.has('permission') }" v-for="(data,index) in permissions" :key="index" >
                  <!-- <table-loading v-show="loading" /> -->
                  <has-error class="permission" :form="form" field="permission" />

                  <div class="card-header">
                    <h3 class="card-title text-bold text-capitalize">{{ data[0].guard_name }}</h3>
                    <div class="card-tools">
                      <!-- Collapse Button -->
                      <button type="button" :loading="form.busy" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
                    </div>
                    <!-- /.card-tools -->
                  </div>
                  <!-- /.card-header -->
                  <div class="card-body permisson-card">
                    <ul>
                      <li v-for="(permission, key) in data" :key="key">
                        <span class="text-capitalize">{{ permission.name }}</span>
                        <toggle-button 
                            :value="form.permission.includes(permission.slug) ? true : false" 
                            :sync="form.permission.includes(permission.slug) ? true : false" 
                            color="#007bff" 
                            :labels="true" 
                            @change="onChangeEventHandler($event, permission.slug)"
                        />
                      </li>
                    </ul>
                  </div>
                  <!-- /.card-body -->
                </div>
                <!-- /.card area end -->
              </form>  
            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters } from "vuex"
import Form from 'vform'
export default {

    middleware: ['auth','check-permissions'],

    metaInfo () {
        return { title: this.$t('Edit Role') }
    },

    data: () => ({
        form: new Form({
            name:null,
            permission: [],
        }),
        loading:true,
        // Breadcrumbs
        breadcrumbsCurrent: 'Role Edit',
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
                url: 'settings.roles'
            },
            {
                name:'Edit',
                url: ''
            },
        ],
    }),

    methods: {


        // get role from server
        async getRole(){
            const { data } = await this.form.get(window.location.origin+'/api/role/'+this.$route.params.slug);
            this.form.name = data.data.name;
            this.form.permission = data.data.permissions;
        },

        // get permission data 
        async getPermission() {
            this.loading=true;
            await this.$store.dispatch('role/fetchPermissions');
            this.loading=false;
        },

        // assign v-model permission data when change checkbox event
        onChangeEventHandler(e, permission) {
            if(e.value==false) {
                // remove item from array
                this.form.permission = this.form.permission.filter(function (item) {
                    return permission != item;
                });
            } else {
                // add item in array
                this.form.permission.push(permission);
            }
        }, 

        // update role and permission
        async updateRole(){
            await this.form.patch(window.location.origin+'/api/role/'+this.$route.params.slug)
                .then((response)=>{
                    toast.fire({
                        type: 'success',
                        title: 'Role and permissions has been updated successfully.'
                    })
                }).catch(()=>{
                    toast.fire({
                    type: 'error',
                    title: 'Opps...something is wrong 😔'
                    })
                });
        }
    },

    // Map Getters
    computed: mapGetters({
        permissions: 'role/getPermissions'
    }),

    mounted() {
        this.getPermission();
        this.getRole();
    }
}
</script>