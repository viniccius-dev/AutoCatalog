import API from '../api';
import storage from '../storage';

export default async function UpdateAccount(body){
    const data = await API.updateaccount(body);

    console.log(data);

    if(data.status === 'error') {
        console.log(data.message)
        return;
    }
    
    storage.removeItem("profile");
    storage.save("profile", data);
    location.reload();

    return data;
}