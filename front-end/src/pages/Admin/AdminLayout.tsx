import type React from "react";
import { Outlet } from "react-router-dom";
import { AdminMenu } from "@/components/menu/AdminMenu";

export const AdminLayout: React.FC = () => {
    
    return (
        <main className="flex flex-row h-full">
            <AdminMenu />
            <div className="px-5 py-5 w-full">
                <Outlet />
            </div>
        </main>
    );
}