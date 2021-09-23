export async function createAccountFetch(body) {
    const response = await fetch('/api/signup', {
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

    const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(body),
        headers : {
            'Content-Type': 'application/json',
        }
        
    })
    const data = await response.json();
    console.log("login data",data)
    return data


}