import type React from "react";
import { Outlet } from "react-router-dom";
import { AdminMenu } from "@/components/menu/AdminMenu";

export const AdminLayout: React.FC = () => {
    
    return (
        <main className="flex flex-row gap-10 h-full">
            <AdminMenu />
            <Outlet />
        </main>
    );
}