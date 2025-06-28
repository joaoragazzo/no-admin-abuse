import type React from "react";
import { FaShield } from "react-icons/fa6";

export const Brand: React.FC = () => {
    return (
        <div className="text-2xl font-extrabold flex flex-row items-center">
            <FaShield className="mr-4"/> No Admin Abuse
        </div>
    )
}