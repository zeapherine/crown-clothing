import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyC25jmCaK80grxHAqiSdbkZkGf8RjgJOUQ',
	authDomain: 'crown-db-4a31e.firebaseapp.com',
	projectId: 'crown-db-4a31e',
	storageBucket: 'crown-db-4a31e.appspot.com',
	messagingSenderId: '295318510237',
	appId: '1:295318510237:web:1edcb81ee9f2782c40d274',
	measurementId: 'G-C986SCWBTP',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;
	// console.log(userAuth);

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	// console.log(snapShot);

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}
	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
