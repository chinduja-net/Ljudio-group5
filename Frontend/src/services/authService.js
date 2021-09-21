export async function createAccountFetch(body) {
    const response = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
       
    }
    )
    const data = await response.json();

    return  data;
}

export async function loginFetch(body){

    const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        body: JSON.stringify(body),
        headers : {
            'Content-Type': 'application/json',
        }
        
    })
    const data = await response.json();

    return data


}