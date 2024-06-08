import storage from "../helpers/storage";

export default function Logout() {

    storage.clear();
    window.location.href="/";    

}