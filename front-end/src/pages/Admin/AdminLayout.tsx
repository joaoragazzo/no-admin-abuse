import { useAuth } from "@/contexts/AuthContext";
import type React from "react";
import { Outlet } from "react-router-dom";
import { AdminMenu } from "@/components/menu/AdminMenu";

export const AdminLayout: React.FC = () => {
    const { user } = useAuth();
    
    return (
        <main className="flex flex-row gap-10 h-full">
            <AdminMenu />
            <Outlet />
        </main>
    );
}