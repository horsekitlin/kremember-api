
export default class StoreBase extends Object{
    constructor(name){
        super(name);
        if(_.isUndefined(window.localStorage[name])){
            window.localStorage.setItem(name, JSON.stringify({
                list : [],
                item : {}
            }));
        }

        this._db = window.localStorage[name];
        this._data = JSON.parse(this._db);
        this._name = name;
    }
    inital(name){
        window.localStorage.setItem(name, JSON.stringify({
            list : [],
            item : {}
        }));
    }
    reloadcache(){
        this._data = JSON.parse(this._db);
    }
    update(key='list', data=[]){
        this._data[key] = data;
        this.commit();
    }
    commit(){
        window.localStorage.setItem(this._name, JSON.stringify(this._data));
    }
    listAll(){
        return this._data.list;
    }
    find(query){
        return _.filter(this._data.list, query);
    }
    unshify(item){
        this._data.list.unshift(item);
        this.commit();
        return this._data.list;
    }
    push(item){
        this._data.list.push(item);
        this.commit();
        return this._data.list;
    }
    pop(){
        this._data.list.pop();
        return this._data.list;
    }
    findOne(query={}){
        return _.find(this._data.list, query);
    }
    detail(){
        return this._data.item;
    }
}
