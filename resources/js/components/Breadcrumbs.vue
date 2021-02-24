<template>
    <div class="content-header">
        <div class="row mb-2 align-items-center breadcrumbs-style">
            <div class="col-sm-6">
            <h3 class="m-0">{{ $t(current) }}</h3>
            </div><!-- /.col -->
            <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
                <li v-show="items" class="breadcrumb-item" v-for="(data, index) in items" :key="index">
                    <router-link :to="{ name: data.url }" v-show="data.url">
                        {{ $t(data.name) }}
                    </router-link>
                    <span v-show="!data.url" href="#">{{ $t(data.name) }}</span>
                </li>
            </ol>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.row -->
</template>

<script>

export default {
    name: 'breadcrumbs',
  
    props:['items', 'current'],

}
</script>