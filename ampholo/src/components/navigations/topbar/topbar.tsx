import { FaMessage } from "react-icons/fa6";
import Logo from "../../../assets/Logo.png"

const getFirstLetter = (fullName: string) => {
    const [firsName, lastName] = fullName.split(" ");
    const firsNameInitial = firsName?.charAt(0).toUpperCase();
    const lastNameInitial = lastName?.charAt(0).toUpperCase()
    return `${firsNameInitial}${lastNameInitial}`
}

const fullName = "Ganesh Thapa";
const initials = getFirstLetter(fullName)

const AdminTopbar = () => {

    const logoExist = Boolean(Logo)

    return (
        <div className="container mx-auto h-auto flex items-center justify-between right-0 gap-4">
            <div>

            </div>
            <div className="flex items-center justify-center gap-10">
                <FaMessage className="text-2xl" />
                <div className="bg-gray-300 h-10 w-10 rounded-full flex justify-center ">
                    {logoExist ? (
                        <img src={Logo} alt={initials} className="h-full w-full object-cover" />
                    ) : (
                        <p className="text-xl text-black m-1">{initials}</p>

                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminTopbar
