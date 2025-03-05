import { useEffect, useState } from "react";
import { FaMessage } from "react-icons/fa6";
import Logo from "../../../assets/Logo.png"
import { jwtDecode } from "jwt-decode"
import Header from "../../../ui/typographs/header/header";

const AdminTopbar = () => {
    const [adminName, setAdminName] = useState<string | null>(null);
    const [initials, setInitials] = useState<string>("");

    const getFirstLetter = (fullName: string): string => {
        const [firstName, lastName] = fullName.split(" ");
        const firstNameInitial = firstName?.charAt(0).toUpperCase();
        const lastNameInitial = lastName?.charAt(0).toUpperCase();
        return `${firstNameInitial}${lastNameInitial}`;
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                const fullName = decodedToken?.name || "Admin";
                setAdminName(fullName);
                const initials = getFirstLetter(fullName);
                setInitials(initials);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    const logoExist = Boolean(null);

    return (
        <div className="container mx-auto h-auto flex items-center justify-between right-10 gap-4">
            <div>
                <Header className="text-center text-white ml-3">{adminName}</Header>
            </div>
            <div className="flex items-center justify-center mr-5 gap-10">
                <FaMessage className="text-2xl" />
                <div className="bg-gray-300 h-10 w-10 rounded-full flex justify-center">
                    {logoExist ? (
                        <img src={Logo} alt={initials} className="h-full w-full object-cover" />
                    ) : (
                        <p className="text-xl text-black m-1">{initials}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminTopbar;
