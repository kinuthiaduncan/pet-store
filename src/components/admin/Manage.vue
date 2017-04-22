<template>
        <div class="row">
            <div class="col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1">
                <form id="products-form" role="form">
                    <h3 class="text-center">Add New Products to the Store</h3>
                    <div class="form-group">
                        <input type="text" v-model="item.id" placeholder="Enter the Item Code" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <input type="text" v-model="item.title" placeholder="Enter the Item Title" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <input type="text" v-model="item.thumbnail_url" placeholder="Enter the Item Picture URL" class="form-control">
                    </div>
                    <div class="form-group">
                        <input type="number" v-model="item.price" placeholder="Enter the Item Price" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <input type="number" v-model="item.quantity" placeholder="Enter the Item Quantity" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <select v-model="item.category" class="form-control">
                            <option value="dog">Dog Store</option>
                            <option value="cat">Cat Store</option>
                            <option value="bird">Bird Store</option>
                            <option value="fish">Fish Store</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <textarea v-model="item.description"rows="5" class="form-control" placeholder="Enter the Item Description"></textarea>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-success" style="width: 100%" @click.prevent="addItem">Add Items to Store</button>
                    </div>
                </form>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import VueResource from 'vue-resource';
    import { mapActions } from 'vuex';

    export default {
        data () {
            return {
                item:
                    {
                        id:null,
                        title: null,
                        thumbnail_url:null,
                        price: null,
                        quantity: null,
                        category: null,
                        description:null
                    }
            }
        },
        methods: {
            ...mapActions(['addMessage']),
            addItem ()
            {
                //post data to the database
                console.log(this.item);
                Vue.http.post('https://edenpetshop-5d1ba.firebaseio.com/data.json', this.item)
                    .then(function (response)
                    {
                        console.log('success:', response.data);
                        //get success response
                    }, function (error) {
                        console.log('Please use correct details', response)
                    })
                this.addMessage({
                    messageClass: 'success',
                    message: 'Item was successfully added to store!'
                });

            },
        },
        mounted () {
        }
    }
</script>

<style scoped>
    .main{margin-top:5%;}
    .fade-transition {
        transition: opacity 0.2s ease;
    }
    .fade-enter, .fade-leave {
        opacity: 0;
    }
    .additems{margin-top:5%;}
    .items{width:50%;margin-left:25%;background-color: whitesmoke;}
</style>