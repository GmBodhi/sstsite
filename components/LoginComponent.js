import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer";
  import { Button } from "./ui/button";
  import { useState, useEffect, useRef } from "react";
  import { Input } from "./ui/input";
import { toast } from "sonner";
  
  export default function LoginComponent() {
    const [isLogged, setIsLogged] = useState("");
    const [close, setClose] = useState(false);
    const intervalRef = useRef(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isValidate, setIsValidate] = useState(false);
  
    const validateLogin = () => {
      setLoading(true);
      fetch("https://sstapi.pythonanywhere.com/accounts/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.token){
            localStorage.setItem("token", data.token);
            setLoading(false);
            setIsValidate(true);
          }else if(data.non_field_errors){
            setLoading(false);
            setIsValidate(false);
            toast('Wrong login', {
                description: "re-check your username and password !",
                action: {
                  label: "Close",
                  onClick:()=>{console.log('close')}
                },
              })
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
  
    useEffect(() => {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setIsLogged(localToken);
        setClose(true);
      } else {
        const fetchData = async () => {
          try {
            const response = await fetch(`/api/token`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            });
  
            const data = await response.json();
  
            setIsLogged(data.token);
            console.log(data);
            if (data.token !== "") {
              setClose(true);
              clearInterval(intervalRef.current);
            }
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
        intervalRef.current = setInterval(fetchData, 1000);
      }
      return () => {
        clearInterval(intervalRef.current);
      };
    }, []);
  
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="bg-red-600 text-white">
            Login with Etlab
          </Button>
        </DrawerTrigger>
        <DrawerContent className="dark">
          <div className="h-[600px] w-full ">
            <DrawerHeader>
              <DrawerTitle>Login</DrawerTitle>
            </DrawerHeader>
            {close ? (
              <div className="flex flex-col items-center m-10 text-white">
                {isValidate? (
                  <>
                    <h1 className="text-2xl mb-5 text-white">
                      Successfully registered & verified 🎉
                    </h1>
                    <p className="text-1xl mb-5 text-white">
                        reload the page for viewing updated data.
                    </p>
                    <DrawerClose asChild>
                      <Button className="w-[300px]">Close</Button>
                    </DrawerClose>
                  </>
                ) : (
                  <>
                    <h1 className="text-2xl mb-5 text-white">
                      Re-login for verification
                    </h1>
                    <p className="text-1xl mb-5 text-white">
                      please dont change your password on etlab
                    </p>
                    <Input
                      className="dark mb-5"
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Etlab username"
                    />
                    <Input
                      className="dark mb-5"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Etlab password"
                    />
                    <Button
                      className="w-full"
                      onClick={() => {
                        if (username !== "" && password !== "") validateLogin();
                      }}
                    >
                      {loading ? "Loading" : "Login"}
                    </Button>
                    <Button 
                    className="w-full"
                    onClick={()=>{
                            window.open(`whatsapp://send?phone=9633986935&text=Hi, i cant verify my account : ${username} name : ${password}`);
                    }}>Report Login Issue</Button>
                  </>
                )}
              </div>
            ) : (
              <iframe
                src="https://clientuserlogin.onrender.com/?embedded=true"
                width={"100%"}
                height={"100%"}
              />
            )}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
  