import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);

var server = chai.request(app);

const { expect } = chai;
/*
	server.get('/login/')
	.send({
		account : 'timas',
		pwd : '123456'
	});
*/
describe('demo test', () => {
	it('should get array', (done) => {
	    done();

	})
});
