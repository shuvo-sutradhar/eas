<template>
    <div>
        <!-- breadcrumbs Start -->
        <breadcrumbs :items="breadcrumbs" :current="breadcrumbsCurrent" />
        <!-- breadcrumbs end -->
        

        <div class="row">
            <div class="col-md-6 m-auto">
              
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
                    <form @submit.prevent="submit" @keydown="form.onKeydown($event)">
                        <div class="row">
                            <div class="col-md-12 form-group">
                                <label for="name">Name <span class="required-field text-danger">*</span></label> 
                                <input v-model="form.name" id="name" type="text" placeholder="Staff Name" :class="{ 'is-invalid': form.errors.has('name') }" class="form-control ">
                                <has-error :form="form" field="name" /> 
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 form-group">
                                <label for="email">Email <span class="required-field text-danger">*</span></label> 
                                <input v-model="form.email" id="email" type="text" placeholder="example@gmail.com" :class="{ 'is-invalid': form.errors.has('email') }" class="form-control ">
                                <has-error :form="form" field="email" /> 
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 form-group">
                                <label for="acc_type">Role <span class="required-field text-danger">*</span></label> 
                                <select id="acc_type" v-model="form.role" :class="{ 'is-invalid': form.errors.has('role') }" class="form-control ">
                                    <option v-for="(data, i) in roles" :key="i" :value="data.id">{{ data.name }}</option>
                                </select>
                                <has-error :form="form" field="role" /> 
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 form-group">
                                <v-button :loading="form.busy" class="btn btn-primary">
                                    <i class="fas fa-save"></i>
                                    Add User
                                </v-button> 
                            </div>
                        </div>
                        <!-- /input-group -->
                    </form> 
                  </div>
                </div><!-- /. Role add card end -->

               
            </div>
        </div>
    </div>
</template>


<script>
import Form from 'vform'
import { mapGetters } from 'vuex'

export default {

    middleware: ['auth', 'check-permissions'],

    metaInfo () {
        return { title: this.$t('User') }
    },

    data: () => ({
        form: new Form({
            name:'',
            email:'',
            password:'',
            role:12,
        }),
        // Breadcrumbs
        breadcrumbsCurrent: 'User Create',
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
                name:'Users',
                url: 'users'
            },
            {
                name:'Create',
                url: ''
            },
        ],
    }),

    // Map Getters
    computed: {
        ...mapGetters('role', ['roles']),
    },

    methods: {

        async getRole() {
            await this.$store.dispatch('role/fetchRoles');
            this.options = this.roles
        },

        async submit() {
            // Register the team member.
            await this.form.post('/api/users').then((response)=>{
              toast.fire({
                type: 'success',
                title: 'Team created successfully.'
              })
              this.$router.push({ name: 'settings.team'});
            }).catch(()=>{
                toast.fire({
                    type: 'error',
                    title: 'Opps...something went to wrong :('
                })
            })
        },
    },

    created () {
        this.getRole();
    }
}
</script>