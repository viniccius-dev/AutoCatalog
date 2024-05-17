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
    
        console.log(json);
        
        return json;
    },

    createaccount:async (name, email, password) => {

        await fetch(ApiBase+'/createaccount', {
            method:'POST',
            body: formData
        });


    }


};



export default API;