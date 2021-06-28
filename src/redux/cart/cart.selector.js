import { createSelector } from 'reselect';

//there are two types of selector.
// 1 -- input selectors --> doesn't use createSelector.
// 2 -- output selectors --> use createSelector and input selector to build themselves.

// input selector.
const selectCart = (state) => state.cart;

// output selector.
// (memoized selector)
export const selectCartItems = createSelector(
	[selectCart],
	(cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
	[selectCartItems],
	(cartItems) =>
		cartItems.reduce(
			(accumalatedQuantity, cartItem) =>
				accumalatedQuantity + cartItem.quantity,
			0
		)
);

/* Memoization helps in performance, using it, the component is only rendered if 
            the state changes and not whenever a new reducer is called.
            if we don't memoized, every action call, even though its not related to the 
            component state will return a new state object, and it will caused a re-render,
            even if the state value is the same, because reducer return will trigger a new  state object
            to be returned.

            using memoization, components are re-rendered only when the state value changed,
            and not after every state object return
            
*/
