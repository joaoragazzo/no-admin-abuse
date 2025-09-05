import type React from "react";
import { Outlet } from "react-router-dom";
import { AdminMenu } from "@/components/menu/AdminMenu";

export const AdminLayout: React.FC = () => {
    
    return (
        <main className="flex flex-row h-full">
            <AdminMenu />
            <div className="px-5 py-5 flex-1 w-1">
                <Outlet />
            </div>
        </main>
    );
}