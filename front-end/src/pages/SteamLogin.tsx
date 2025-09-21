import { useAuth } from "@/contexts/AuthContext";
import AuthenticationService from "@/services/AuthenticationService";
import { useEffect } from "react"
import { BiLoaderCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";


export const SteamLogin = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    
    useEffect(() => {
        const queryParams = window.location.search;

        if (import.meta.env.PROD)
            AuthenticationService.steamLoginCallback({params: queryParams})
                .then(res => {
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("user", JSON.stringify(res.user))
                    setUser(res.user);
                    navigate("/");
                })

        if (import.meta.env.DEV)
            AuthenticationService.steamLoginDebugCallback()
                .then(res => {
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("user", JSON.stringify(res.user))
                    setUser(res.user);
                    navigate("/");
                })
    },[])

    return (
        <div className="w-full h-100 flex flex-grow flex-col items-center justify-center">
            <div className="flex flex-col gap-3 items-center">
                <BiLoaderCircle size={40} className="spinner" />
                <div>
                    Aguarde enquanto confirmamos o seu login com a Steam...
                </div>
            </div>
        </div>
    )
}