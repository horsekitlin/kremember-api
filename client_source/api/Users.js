import { fetch_to } from '../utils/requests';
import { Notifier, Users } from '../stores';

export default{
    Login : (data) => {
        var query = {
            fb_id : data.id,
            name : data.name
        };
        fetch_to('/users/login/v1/', query)
        .done((res) => {
            if(res.status !== 200){
                alert('登入失敗');
            }else{
                data.token = res.data.token;
                Users.update('item', data);
                location.href='/public/home.html';
            }
        });
    }
};
