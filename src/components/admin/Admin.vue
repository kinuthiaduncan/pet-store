<template>
    <div class="row">
        <div>
            <h3 class="text-center">Below are all the items in the store. You can edit their details or Delete them</h3>
            <br />
        </div>
        <div class="col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1">
            <input type="text" v-model="searchString" placeholder="Search Items in store..." class="form-control">
            <br />
            <br />
        </div>
        <div class=" table-scroll" >
            <table class="table">
                <thead>
                <th>Item ID</th>
                <th>Item Title</th>
                <th>Item Category</th>
                <th></th><th></th>
                </thead>
                <tbody>
                <tr v-for="item, key in filteredItems" class="app-items">
                    <td>{{item.id}}</td>
                    <td>{{item.title}}</td>
                    <td>{{item.category}}</td>
                    <td> <router-link :to="'/edit/' + key"><a class="btn btn-success btn-sm"><i class="fa fa-pencil-square-o"></i></a></router-link></td>
                    <td><button class="btn btn-danger btn-sm" v-on:click="deleteItems(key)"><i class="fa fa-trash-o"></i></button></td>
                </tr>
                </tbody>
            </table>

        </div>

    </div>

</template>

<script>
    import Vue from 'vue';
    import VueResource from 'vue-resource';
    import Firebase from 'firebase'
    import { mapActions } from 'vuex';

    export default {
        name: 'product',

        data () {
            return {
                items: [],
                serch_items:[],
                searchString:'',
            }
        },

        methods: {
            ...mapActions(['deleteItem','addMessage']),


            deleteItems: function (key) {
                console.log(key);
                let vm = this;
                this.deleteItem({item:key});
                this.addMessage({
                    messageClass: 'success',
                    message: 'Item was successfully deleted from store!'
                });
                this.loadData();
            },

            loadData: function () {
                let vm = this;
                this.$http.get('https://edenpetshop-5d1ba.firebaseio.com/data.json')
                    .then(response => {

                        this.items = response.data;

                    });

            },
        },
//        created: function () {
//            this.loadData()
//        },
        computed: {
            filteredItems: function () {

            this.loadData();
                let serch_items = this.items;
                let searchString = this.searchString;

                if (!searchString) {
                    return serch_items;
                }
                else {
//                    searchString = searchString.trim().toLowerCase();

                    serch_items = this.serch_items.filter(function (item) {
                        if (item.indexOf(searchString) !== -1) {
                            console.log("item", this.item);
                            return item;
                        }
                        console.log("item",serch_items);
                    });
                }
            }
        }

    }
</script>

<style scoped>
    th{text-align: center;color:red;}
    .table{width:90%;margin-left: 5%;}
    .main{margin-top:5%;}
    .fade-transition {
        transition: opacity 0.2s ease;
    }
    .fade-enter, .fade-leave {
        opacity: 0;
    }
    .manageitems{margin-top:5%;}
</style>