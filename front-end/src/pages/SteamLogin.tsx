import { useAuth } from "@/contexts/AuthContext";
import AuthenticationService from "@/services/AuthenticationService";
import { useEffect } from "react"


export const SteamLogin = () => {
    const { setUser } = useAuth()
    
    useEffect(() => {
        const queryParams = window.location.search;

        AuthenticationService.steamLoginCallback({params: queryParams})
            .then(res => {
                localStorage.setItem("token", res.jwt);
                window.location.href = "/";
                setUser(res.user);
            })        
    },[])

    return <>
        Carregando...
    </>
}