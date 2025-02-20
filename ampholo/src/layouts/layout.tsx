import { useState, useEffect } from "react";
import SideNavBar from "../components/navigations/side-navbar/side-navbar";
import AdminTopbar from "../components/navigations/topbar/topbar";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const sidebar = document.getElementById("sidebar");
            if (
                isSidebarOpen &&
                sidebar &&
                !sidebar.contains(event.target as Node)
            ) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [isSidebarOpen]);

    return (
        <div className="flex relative h-screen overflow-hidden">
            {/* Sidebar */}
            <aside
                id="sidebar"
                className={`fixed top-0 left-0 bg-primary text-white z-50  transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 lg:static lg:w-64 h-full`}
            >
                <SideNavBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </aside>

            {/* Overlay for small screens when sidebar is open */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className="flex-1 flex flex-col  h-full">
                {/* Topbar */}
                <header className="bg-primary text-white p-4 shadow-lg flex items-center gap-4">
                    {/* Hamburger Button */}
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden text-xl p-2"
                    >
                        <FaBars />
                    </button>
                    <AdminTopbar />
                </header>

                {/* Main Content */}
                <main className="flex-1 bg-gray-100 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
