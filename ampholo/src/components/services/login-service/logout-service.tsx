import { toast } from "react-toastify"
import { useAuth } from "../../../context/auth-context"
import { useNavigate } from "react-router-dom"



export const logoutService = () => {
    const { accessToken, setAccessToken } = useAuth()
    const navigate = useNavigate()

    const handleLogout =() => {
        if(!accessToken){
            toast.error("Token not Found")
        }else{
            window.alert("Are you sure want to logout?")
            localStorage.removeItem('token')
            setAccessToken(null)
            navigate('/login')
            toast.success("Logout successful")
        }
    }

    return { handleLogout }
}