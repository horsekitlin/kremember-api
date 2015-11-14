import mongoose from 'mongoose';
import _ from 'lodash';
import Promise from 'bluebird';
import config from '../../config';
import ErrorManager from './ErrorManager';

export default class Collection{
    constructor(name, schema){
        this.lib = mongoose;
        this.db = mongoose.createConnection('mongodb://'
                                            + config.server.host + ':'
                                            + config.mongodb.port + '/'
                                            + config.mongodb.dbname);
        schema.methods.reload = function(){
            return new Promise((resolve, reject) => {
                this.model(name)
                .findOne({_id : this._id}, (err, data) => {
                    if(err){
                        reject(ErrorManager.GetDBSearchError('搜尋失敗'));
                    }else{
                        resolve(data);
                    }
                });
            }.bind(this));
        }
        schema.methods.syncSave = function(){
            return new Promise((resolve, reject) => {
                this.save((err) => {
                    if(err){
                        reject(ErrorManager.GetDBUpdateError('修改失敗'));
                    }else{
                        resolve();
                    }
                });
            }.bind(this));
        };

        this.model = this.db.model(name, schema);

    }

    ObjectId(str){
        if(_.isUndefined(str)){
            return mongoose.Types.ObjectId();
        }else{
            mongoose.Types.ObjectId(str);
        }
    }

    created(query){

        return new Promise((resolve, reject) => {
            this.model(query)
            .save(function(err, data){

                if(err){
                    reject(ErrorManager.GetDBInsertError('資料庫寫入失敗'));
                }else{
                    resolve(data);
                }

            });
        }.bind(this));
    }
    show(query){
        return new Promise(function(resolve, reject){
            this.model
                .findOne(query)
            .exec(function(err, data){
                if(err){
                    reject(ErrorManager.GetDBSearchError('搜尋失敗'));
                }else{
                    resolve(data);
                }
            });
        }.bind(this));
    }

    showById(id){
        return new Promise(function(resolve, reject){
            this.model.findOne(
                {_id : id})
            .exec()
            .then(function(data){
                resolve(data);
            }, function(err){
                reject(ErrorManager.GetDBSearchError('搜尋失敗'));
            });
        }.bind(this));
    }

    update(query, update, options={}){
        return new Promise(function(resolve, reject){
            this.model
            .update(
                query,
                update,
                options)
            .exec(function(err, data){
                if(err){
                    reject(ErrorManager.GetDBUpdateError('修改失敗'));
                }else{
                    resolve();
                }
            });
        }.bind(this));
    }

    listAll(query = {}, sort='-created_time', options){
        return new Promise(function(resolve, reject){
            this.model
            .find(query)
            .sort(sort)
            .exec(function(err, data){
                if(err){
                    reject(ErrorManager.GetDBSearchError('搜尋失敗'));
                }else{
                    if(_.isUndefined(options)){
                        var content = data;
                    }else{
                        var content = _.slice(data, options.skip, (options.skip + options.limit));
                    }
                    resolve({
                        content : content,
                        total : data.length
                    });
                }
            });
        }.bind(this));
    }
    list(query={}, sort='-created_time', select='_id created_time', options){
        return new Promise(function(resolve, reject){
            this.model
            .find(query)
            .select(select)
            .sort(sort)
            .exec(function(err, data){
                if(err){
                    reject(ErrorManager.GetDBSearchError('搜尋失敗'));
                }else{
                    if(_.isUndefined(options)){
                        var content = data;
                    }else{
                        var content = _.slice(data, options.skip, (options.skip + options.limit));
                    }
                    resolve({
                        content : content,
                        total : data.length
                    });
                }
            });
        }.bind(this));
    }
    kill(query){
        return new Promise((resolve, reject) => {
            this.model
            .remove(query, (err) => {
                if(err){
                    reject(ErrorManager.GetDBDeleteError('刪除失敗'));
                }else{
                    resolve();
                }
            });
        });
    }
    clean(){
        return new Promise(function(resolve, reject){
            this.model
            .remove({})
            .then(function(){
                resolve();
            }, function(err){
                reject(ErrorManager.GetDBDeleteError('刪除失敗'));
            });

        }.bind(this));
    }
    commit(query){
         return new Promise((resolve, reject) => {
            this.model(query)
            .save((err, data) => {
                if(err){
                    if(err.code === 11000){
                        const key = err.toJSON().errmsg.split('$')[1].split('_')[0];
                        reject(ErrorManager.GetDBInsertError(key + '已存在'));
                    }else{
                        reject(ErrorManager.GetDBInsertError('儲存失敗'));
                    }
                }else{
                    resolve(data);
                }
            });
        }.bind(this));
    }

    pass(){
        return new Promise((resolve) => {
            resolve();
        });
    }
}
