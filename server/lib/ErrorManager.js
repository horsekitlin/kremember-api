/**
 * 集中並定義各種類型的Errors handler
 *
 * @params : RequestError : 輸入的Request Error
 *
 *      欄位名稱錯誤
 *
 *      缺少必要欄位
 *
 *      輸入的type 錯誤
 *
 *  EmptyData : 516 EmptyResponse
 *
 *      搜尋資料為空
 *
 * **/
import moment from "moment";

class ErrorFactory{

    constructor(){

        this.name = "Padkaka";
    }

    created(msg, options){

        let e = new Error();
        e.name = options.name;
        e.status = options.status || 500;
        e.path = options.path;
        e.method = options.method;
        e.message = msg;
        e.created_time = moment().unix();
        return e;

    }

    GetReqError(msg){
        return this.created(msg, {
            name : "RequestError",
            status : 400
        });
    }

    GetDBInsertError(msg){
        return this.created(msg, {
            name : "DB Insert Error",
            status : 516
        });
    }

    GetDBSearchError(msg){
        return this.created(msg, {
            name : "DB Search Error",
            status : 517
        });
    }

    GetDBUpdateError(msg){
        return this.created(msg, {
            name : "DB Update Error",
            status : 518
        });
    }

    GetDBDeleteError(msg){
        return this.created(msg, {
            name : "DB Delete Error",
            status : 519
        });
    }

    GetIOError(msg){
        return this.created(msg, {
            name : 'System IO Error',
            status : 520
        });
    }

    NotFoundError(msg){
        return this.created(msg, {
            name : 'Data Empty Error',
            status : 521
        });
    }

    GetSendMailError(msg){
        return this.created(msg, {
            name : 'Send Mail Error',
            status : 522
        });
    }

    GetNotificationError(msg){
        return this.created(msg, {
            name : 'Mobile Notification Error',
            status : 523
        });
    }

    GetDataError(msg){
        return this.created(msg, {
            name : 'Data Error',
            status : 524
        });
    }

    TokenOverTimeError(msg){
        return this.created(msg, {
            name : 'OverTime Error',
            status : 525
        });
    }

    FileIOError(msg){
        return this.created(msg, {
            name : 'File IO Error',
            status : 526
        });
    }

    RegisterError(msg){
        return this.created(msg, {
            name : 'registe Error',
            status : 527
        });
    }

    AccountLockError(msg){
        return this.created(msg, {
            name : 'account lock Error',
            status : 528
        });
    }

    GetFileTypeError(msg){
        return this.created(msg, {
            name : 'File Type Error',
            status : 421
        });
    }

    GetNotEqualError(msg){
        return this.created(msg, {
            name : 'Input Not Equal Error',
            status : 422
        });
    }


    SyntaxError(msg){
        return this.created(msg, {
            name : 'Input Syntax Error',
            status : 423
        });
    }

    GetEmptyReqError(msg){
        return this.created(msg, {

            name : "Request Error",
            status : 424

        });
    }

    GetStartCodeError(msg){
        return this.created(msg, {

            name : "StartCode Error",
            status : 425

        });
    }

    GetDeviceError(msg){
        return this.created(msg, {

            name : "Change Device Error",
            status : 426

        });
    }

    SendErrorResp(error, res){

        res.json({
            status:error.status,
            message:error.message,
            errors:error
        });
    }

}

export default  new ErrorFactory();
