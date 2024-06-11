const ApiBase = 'https://autocatalogproject.000webhostapp.com/public/api' ;
const ApiImages = 'https://autocatalogproject.000webhostapp.com/public/';
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
                'Authorization': `Bearer ${token}`,
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
            method: 'POST'
        });
    
        const json = await response.json();
        return json;
    },

    renderCars:async () => {
        const response = await fetch(ApiBase + '/rendercars', {
            method: 'POST'
        });
    
        const json = await response.json();
        return json;
    },

    
    renderFilters:async (filters) => {

        const url = `${ApiBase}/search?search=${filters.search}&valueMin=${filters.valueMin}&valueMax=${filters.valueMax}&consumptionMin=${filters.consumptionMin}&consumptionMax=${filters.consumptionMax}&brandsSelected=${filters.brandsSelected}&yearsSelected=${filters.yearsSelected}&fuelsSelected=${filters.fuelsSelected}`;

        const response = await fetch(url, {
            method: 'GET'
        });

        const json = await response.json();
        return json;
    },

    renderVehicle:async (id) => {

        const url = `${ApiBase}/rendervehicle?id=${id}`;

        const response = await fetch(url, {
            method: 'GET'
        });

        const json = await response.json();
        return json;
    },

    updatebrand: async (formData) => {
        const token = storage.get("token");
    
        const response = await fetch(ApiBase + '/updatebrand', {
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

    deletebrand: async (id) => {


        const token = storage.get("token");
    
        const response = await fetch(ApiBase + '/deletebrand', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id })
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    
        return await response.json();
    },

    updatevehicle: async (formData) => {
        const token = storage.get("token");
    
        const response = await fetch(ApiBase + '/updatecar', {
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

    deletevehicle: async (id) => {


        const token = storage.get("token");
    
        const response = await fetch(ApiBase + '/deletecar', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id })
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    
        return await response.json();
    },

    savehistory: async (history) => {


        const token = storage.get("token");
    
        const response = await fetch(ApiBase + '/savehistory', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ history })
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    
        return await response.json();
    },

    renderhistory:async (page) => {

        const token = storage.get("token");
        const url = `${ApiBase}/renderhistory?page=${page}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        const json = await response.json();
        return json;
    },

    renderLikes:async (page) => {

        const token = storage.get("token");
        const url = `${ApiBase}/renderlikes?page=${page}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        const json = await response.json();
        return json;
    },

    addfavorites: async (id) => {


        const token = storage.get("token");
    
        const response = await fetch(ApiBase + '/addfavorites', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id })
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    
        return await response.json();
    },




};



export { API, ApiBase, ApiImages };