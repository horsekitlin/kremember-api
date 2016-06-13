/**
	*
	@flow
**/

import jwt from 'jsonwebtoken';

let token = jwt.sign({foo: 'bar'}, 'hello');
console.log(token);

console.log(jwt.verify(token, 'hello'));

export default {};
