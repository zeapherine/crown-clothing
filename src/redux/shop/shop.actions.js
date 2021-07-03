import ShopActionTypes from './shop.types';
import {
	firestore,
	convertCollectionSnapshotToMap,
} from '../../firebase/firebase.util';

//normal: function action returning actions.
export const fetchCollectionsStart = () => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

//thunk-->  function action returning function that gets dispatch.
// A action creator  that returns a function that gets a dispatch.
export const fetchCollectionsStartAsync = () => {
	return (dispatch) => {
		const collectionRef = firestore.collection('collections');
		dispatch(fetchCollectionsStart());

		/* database fetch with firebase .get() method. */
		collectionRef
			.get()
			.then((snapShot) => {
				const collectionsMap = convertCollectionSnapshotToMap(snapShot);
				dispatch(fetchCollectionsSuccess(collectionsMap));
			})
			.catch((error) => dispatch(fetchCollectionsFailure(error.message)));
	};
};

export const fetchCollectionsSuccess = (collectionMap) => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
	payload: collectionMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
	payload: errorMessage,
});

/* NOTE::::!!!!!!  */
/* If redux-thunk middleware is enabled, 
	any time you attempt to dispatch a function
	instead of an object, the middleware will
	call that function with dispatch method itself as the 
	argument
*/
