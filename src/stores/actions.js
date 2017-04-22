import Vue from 'vue';
import { ref, firebaseAuth } from '../config/firebaseConfig';

export const updateCart = ({commit}, {item, quantity, isAdd}) => {
	commit('UPDATE_CART', {item, quantity, isAdd});
	if (isAdd) {
		let message_obj = {
		  message: `Add ${item.title} to cart successfully`,
		  messageClass: "success",
		  autoClose: true
		}
		commit('ADD_MESSAGE', message_obj);
	}
}

export const removeItemInCart = ({commit}, {item}) => {
	commit('REMOVE_CART_ITEM', {item});
}

export const registerByEmail = ({commit}, {email, password}) => {
	return firebaseAuth().createUserWithEmailAndPassword(email, password);
}

export const logout = ({commit}) => {
  commit('SET_CART', []); // clear current cart
  return firebaseAuth().signOut();
}

export function loginWithEmail ({commit}, {email, password}) {
  return firebaseAuth().signInWithEmailAndPassword(email, password);
}

export function listenToProductList({commit}) {
	return ref.child("data").on('value', (products) => {
		console.log(products.val());
		commit('UPDATE_PRODUCT_LIST', products.val());
	});
}

export function getShoppingCart({commit}, {uid, currentCart}) {
	if (uid) {
		return ref.child("cart/" + uid).once('value').then((cart) => {
			// console.log(cart.val());
			if (cart.val() && (!currentCart || currentCart.length == 0)) {
				commit('SET_CART', cart.val());
			}
		});
	} else {
		console.log("User has not logged in");
	}
}

export function saveShoppingCart({commit}, {uid, cartItemList}) {
	return ref.child("cart/" + uid).set(cartItemList);
}

export function saveToTransaction({commit}, {uid, cartItemList}) {
    let newTransactionKey = ref.child("transactions").push().key;
    var newTransaction = {}
    newTransaction['/transactions/' + uid + '/' + newTransactionKey] = cartItemList;
    return ref.update(newTransaction);
}

export const deleteItem = ({commit},{item}) => {
    console.log(item);
    return ref.child('/data/'+item).remove();
}

export const editItem = ({commit},{key, item}) => {
    console.log(item);
    return ref.child("data/" + key).set(item);
}


