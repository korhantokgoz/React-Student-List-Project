import React from 'react';

function Error({ message }) {

	return (
		<div data-testid="errorMsg" className="error">

			{message}

		</div>
	);
}

export default Error;
