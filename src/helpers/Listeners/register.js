import API from '../api';

export default async function Register(body){
    const data = await API.createaccount(body);

    if(data.status === 'error') {
        console.log(data.message)
        return;
    }
    
    window.location.href ="/"

    return data;
}