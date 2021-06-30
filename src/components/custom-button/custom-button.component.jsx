import './custom-button.styles.scss';

const CustomButton = ({
	children,
	isGoogleSignIn,
	inverted,
	...otherProps
}) => (
	<button
		className={`${inverted ? 'inverted' : ''} custom-button ${
			isGoogleSignIn ? 'google-sign-in' : ''
		}`}
		{...otherProps}
	>
		{children}
	</button>
);

export default CustomButton;
