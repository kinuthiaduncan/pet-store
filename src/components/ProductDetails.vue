<template>
	<div class="container">
		<div class="col-md-12">
            <div class="row text-center" v-if="loading">
                <grid-loader :loading="loading" :color="loaderColor" :size="loaderSize" class="inline-block"></grid-loader>
            </div>
            <div class="thumbnail" v-if="!loading">
                <img class="img-responsive" :src="item.thumbnail_url" alt="">
                <div class="caption-full">
                    <h4 class="pull-right">Ksh.{{ item.price }}</h4>
                    <h4> {{ item.title }}</h4>
                    <p> {{ item.description }} </p>
                </div>
                <div class="ratings">
                    <span>{{ item.quantity }} left in stock</span>
                    <p class="pull-right">
                        <button 
                            @click="addItem"
                            :disabled="item.quantity === 0"
                            class="btn btn-success" >
                            Add to cart
                        </button>
                    </p>
                    <div class="clearfix"></div>
                </div>
            </div>

            
		</div>
		
	</div>
</template>

<script>
    import { mapActions } from 'vuex';
    import GridLoader from 'vue-spinner/src/GridLoader.vue';

    export default {
        data() {
            return {
                loaderColor: "#5cb85c",
                loaderSize: "5px",
                item:[]
            }
        },
        computed: {
            loading() {
                return this.$store.getters.isProductLoading;
            }
        },
        methods: {
            ...mapActions(['updateCart']),

            getItems(){
                let id = this.$route.params.id;
                console.log(id);
                this.$http.get('https://edenpetshop-5d1ba.firebaseio.com/data/'+id+'.json' )
                    .then(response => {
                        this.item = response.data;
                        console.log(response.data);
                        // return response.json()
                    });
            },
            addItem() {
                const order = {
                    item: Object.assign({}, this.item),
                    quantity: 1,
                    isAdd: true
                };
                // console.log(order);
                this.updateCart(order);
            }
        },
        components: {
            GridLoader
        },

        created: function() {
            this.getItems();
        },
    }
</script>

<style scoped>
    .caption-full {
        padding-right: 10px;
        padding-left: 10px;
    }
    .ratings {
        padding-right: 10px;
        padding-left: 10px;
        color: #d17581;
    }
</style>