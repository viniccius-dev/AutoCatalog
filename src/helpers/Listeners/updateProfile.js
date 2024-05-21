import API from '../api';

export default async function UpdateAccount(body){
    console.log(body);
    const data = await API.updateaccount(body);

    if(data.status === 'error') {
        console.log(data.message)
        return;
    }
    
    storage.clear();
    const {token, ...profile} = data;
    storage.save("token", token);
    storage.save("profile", profile);
    location.reload();

    return data;
}