import firebase from 'firebase'


const config = {
	apiKey: "AIzaSyDjS-XDSyu6rWQ6gmjRC49ojlltj1QWjBQ",
	authDomain: "edenpetshop-5d1ba.firebaseapp.com",
	databaseURL: "https://edenpetshop-5d1ba.firebaseio.com",
}

firebase.initializeApp(config);

export function firebaseListener(func) {
	firebase.auth().onAuthStateChanged(function (user) {
	  if (user) {
	  	console.log("User log in success", user);
	    func(true, user)
	  } else {
	  	console.log("User log in failed", user);
	    func(false)
	  }
	}, function(error) {
	  console.log(error)
	});
}


export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;


