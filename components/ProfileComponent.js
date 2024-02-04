

export default function ProfileComponent(){
        const apireq=()=>{
        fetch('https://sstapi.pythonanywhere.com/api/',{
            method:'GET',
            headers:{
            'Content-Type':'application/json',
            'Authorization': 'Token d6a8d991036f1e8d0ee85e694523384c7c971f85'
            
            },
        })
        .then(response=>response.json())
        .then(data=>{
            
            setData(data.data);
            setLoading(false);
            
            
        })
        .catch(e=>{console.log(e)})
        }
        useEffect(()=>{
        toast("Heads up!", {
            description: "If you're here for registering for the events do login",
            action: {
            label: "Login using Etlab",
            onClick: () => console.log("Login"),
            },
        })
        apireq();
        },[])
}