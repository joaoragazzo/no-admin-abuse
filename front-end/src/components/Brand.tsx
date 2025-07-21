import type React from "react";
import { FaShield } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const Brand: React.FC = () => {
    return (
        <Link to="/" className="text-2xl font-extrabold flex flex-row items-center">
            <FaShield className="mr-4"/> No Admin Abuse
        </Link>
    )
}