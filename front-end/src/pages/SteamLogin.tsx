import { useAuth } from "@/contexts/AuthContext";
import AuthenticationService from "@/services/AuthenticationService";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";


export const SteamLogin = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    
    useEffect(() => {
        const queryParams = window.location.search;

        AuthenticationService.steamLoginCallback({params: queryParams})
            .then(res => {
                localStorage.setItem("token", res.jwt);
                navigate("/");
                setUser(res.user);
            })        
    },[])

    return <>
        Carregando...
    </>
}