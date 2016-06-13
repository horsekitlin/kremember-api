/**
	*
	@flow
**/

class mailLib{
	ConnLength: 	number;
	_Conns: Array<JSON>;
	constructor(){
		this.ConnLength = 20;
		this._Conns = [];
	}
	createConn(prot:number, host:string, options:object): void{

	}
}
