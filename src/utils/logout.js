import storage from "../helpers/storage";

export default function Loggout() {

    storage.clear();
    window.location.href="/";    

}