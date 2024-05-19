const ApiBase = 'http://localhost/projeto/backend/public' ;

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
    }



};



export default API;