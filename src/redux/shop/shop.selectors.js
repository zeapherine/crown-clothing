import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
	selectShop,
	(shop) => shop.collections
);

//converting collections object to array.
export const selectCollectionsForPreview = createSelector(
	[selectCollections],
	(collections) =>
		collections ? Object.keys(collections).map((key) => collections[key]) : []
);

export const selectCollection = memoize((collectionUrlParam) =>
	createSelector(
		[selectCollections],
		(collections) => (collections ? collections[collectionUrlParam] : null) // data normalization
	)
);

export const selectIsCollectionFetching = createSelector(
	[selectShop],
	(shop) => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
	[selectShop],
	(shop) => !!shop.collections
	//return false if it is not loaded.
	// false ( !!0 , !!''  , !null ) all will return false
	// true  ( !!{} )  will return true.
);
