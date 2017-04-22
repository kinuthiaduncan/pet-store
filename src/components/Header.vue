<template>
	 <nav class="navbar navbar-inverse" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <router-link to="/" class="navbar-brand">Eden Pet Store</router-link>
            </div>
            <ul class="nav navbar-nav navbar-right">
                <router-link to="/login" tag="li" v-if="!isLoggedInLocal"><a>Admin Login</a></router-link>
                <router-link to="/manage" tag="li" v-if="isLoggedInLocal"><a>Add Items</a></router-link>
                <router-link to="/products" tag="li" v-if="isLoggedInLocal"><a>Manage Products</a></router-link>
                <li v-if="isLoggedInLocal" class="li-pointer"><a @click="logoutLocal">Logout {{ userEmail }}</a></li>
		        <!--<router-link to="/register" tag="li" v-if="!isLoggedInLocal"><a>Register</a></router-link>-->
		        <li>
                    <router-link to="/cart" class="app-cart-link" tag="button"><i class="fa fa-shopping-cart app-cart" aria-hidden="true"></i>
                       <span class="badge">{{ numItems }} (Ksh. {{ cartValueLocal }})</span>
                    </router-link>
                </li>
		     </ul>
    
        </div>
        <!-- /.container -->
    </nav>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        computed: {
            isLoggedInLocal() {
                return this.$store.getters.isLoggedIn;
            },
            numItems() {
                let res = 0;
                this.$store.getters.cartItemList.map((item, idx) => {
                    res += item.quantity;
                });
                return res;
            }, 
            userEmail() {
                if (this.isLoggedInLocal) {
                    return this.$store.getters.currentUser.email;
                } else {
                    return '';
                }
            },
            cartValueLocal() {
                return this.$store.getters.cartValue;
            }
        },
         methods: {
           ...mapActions(['logout']),
          logoutLocal() {
            this.logout();
          }
        }
    }
</script>


<style scoped lange="sass">
    .navbar-btn a {
        color: white;
    }

    .li-pointer {
        cursor: pointer;
    }

    .li-pointer:hover {
        cursor: pointer;
    }
</style>