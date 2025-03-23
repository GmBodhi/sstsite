// 'use server'

export async function login(username,password) {
    const res = await fetch('https://prod-61d68001a8390c.vercel.app/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username:username,
            password:password
        })
    });
    const data = await res.json();
    return data;
}
