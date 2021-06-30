import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.util';
import { selectCartHidden } from '../../redux/cart/cart.selector';
import { selectCurrentUser } from '../../redux/user/user.selector';

import {
	HeaderContainer,
	LogoContainer,
	OptionsContainer,
	OptionLink,
} from './header.styles';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header = ({ currentUser, hidden }) => (
	<HeaderContainer>
		<LogoContainer to='/'>
			<Logo />
		</LogoContainer>
		<OptionsContainer className='options'>
			<OptionLink to='/shop'>SHOP</OptionLink>
			<OptionLink to='/contact'>CONTACT</OptionLink>
			{currentUser ? (
				<OptionLink as='div' onClick={() => auth.signOut()}>
					SIGN OUT
				</OptionLink>
			) : (
				<OptionLink to='/signin'>SIGN IN</OptionLink>
			)}
			<CartIcon />
		</OptionsContainer>
		{hidden ? null : <CartDropdown />}
	</HeaderContainer>
);

//createStructureSelector will passed the state to subsequent selectors automatically.
//so we don't need to pass the state as argument and call it each time like --
// eg: currentUser: selectCurrentUser.state

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
