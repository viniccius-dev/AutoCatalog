import API from '../api';
import storage from '../../helpers/storage';
import toggleModal from '../../utils/toggleModal';

export default async function Login(body){
    const data = await API.login(body);

    if(data.status === 'error') {
        console.log(data.message)
        return;
    }

    const {token, ...profile} = data;
    storage.save("token", token);
    storage.save("profile", profile);
    toggleModal();
    location.reload();
    
    return data;
}