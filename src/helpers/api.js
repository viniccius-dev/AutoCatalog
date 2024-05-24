const ApiBase = 'http://localhost/projeto/backend/public' ;
import storage from "./storage";

const API = {
    
    test:async () => {
        const res = await fetch(ApiBase + '/teste', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await res.json();
    
        
        return json;
    },

    createaccount:async (e) => {
        const response = await fetch(ApiBase + '/createaccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(e) 
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    
        return await response.json();
    },

    login:async (e) => {
        const response = await fetch(ApiBase + '/loginuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(e) 
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    
        return await response.json();
    },

    updateaccount: async (formData) => {
        const token = storage.get("token");
    
        const response = await fetch(ApiBase + '/updateaccount', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData 
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    
        return await response.json();
    },

    createVehicle: async (formData) => {
        const token = storage.get("token");
    
        const response = await fetch(ApiBase + '/addcar', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData 
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    
        return await response.json();
    },

    renderBrands:async () => {
        const response = await fetch(ApiBase + '/renderbrands', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        const json = await response.json();
        return json;
    },

    renderCars:async () => {
        const response = await fetch(ApiBase + '/rendercars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        const json = await response.json();
        return json;
    }




};



export default API;