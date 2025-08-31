import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import type React from "react";
import { Outlet } from "react-router-dom";

export const MainLayout : React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-col flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}