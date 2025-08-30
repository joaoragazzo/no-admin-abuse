import type React from "react";
import { Outlet } from "react-router-dom";

export const AdminLayout: React.FC = ({  }) => {
    return (
        <main className="px-25 py-10">
            
            <Outlet />
        </main>
    );
}