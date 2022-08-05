import { Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {logout , emailVerificaiton} from "../firebase";
import {logout as logoutHandle } from "../store/auth";
import UpdateProfile from "../components/UpdateProfile"

export default function Home() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    const handleLogout = async () => {
        await logout()
        dispatch(logoutHandle())
        navigate('/login', {
            replace: true
        })
    }

    const handleVerification = async () => {
     await emailVerificaiton()
    }


    if (user) {
        return (
            <div className="max-w-2xl mx-auto grid gap-y-4 py-4">
                <h1 className="flex gap-x-4 items-center">
                    {user.photoURL && <img src={user.photoURL} className="w-7 h-7 rounded-full" />}
                    Oturum Açık ({user.email})
                    <button onClick={handleLogout} className="h-8 rounded px-4 text-sm text-white bg-indigo-700">Log out</button>
                    {!user.emailVerified && <button onClick={handleVerification} className="h-8 rounded px-4 text-sm text-white bg-indigo-700">Email Verified</button>}
                </h1>
                <UpdateProfile />
            </div>
        )
    }

    return(
        <div>
            <Link to="/register">Sign in</Link>
            <Link to="/login">Log in</Link>
        </div>
    )
}