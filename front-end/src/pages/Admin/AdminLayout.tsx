import type React from "react";
import { Outlet } from "react-router-dom";
import { AdminMenu } from "@/components/menu/AdminMenu";

export const AdminLayout: React.FC = () => {
    
    return (
        <main className="flex flex-row bg-neutral-900 h-screen">
            <AdminMenu />
            <div className="px-5 py-5 flex-1 w-1 overflow-y-scroll">
                <Outlet />
            </div>
        </main>
    );
}