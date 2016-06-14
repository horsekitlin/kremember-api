/**
	*
	@flow
**/

import jwt from 'jsonwebtoken';

let token = jwt.sign({foo: 'bar'}, 'hello');

export default {};
