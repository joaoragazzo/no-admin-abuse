import type React from "react";
import { useState } from "react";
import { FaCopy } from "react-icons/fa";

interface CopyButtonWithPopupProps {
    textToCopy: string
}

export const CopyButtonWithPopup: React.FC<CopyButtonWithPopupProps> = ({ textToCopy }) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(textToCopy);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 1500);
    }

    return (
        <div className="relative inline-block">
            {showPopup && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs px-2 py-1 bg-black/90 text-white rounded-md animate-fadeUp">
                    <span className="text-nowrap">Copiado com sucesso!</span>
                </div>
            )}
            <FaCopy onClick={handleCopy} size={11} className="text-gray-200 cursor-pointer" />
        </div>
    );

}