import React from "react";
import { FaX } from "react-icons/fa6";
import Popup from "reactjs-popup";

interface PopupSkeletonProps {
    title: React.ReactNode;
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
}

export const PopupSkeleton: React.FC<PopupSkeletonProps> = ({ title, children, open, onClose }) => {
    
    return (
        <>
            <Popup
                open={open}
                overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.28)'}}
                onClose={onClose}
            >
                <div className="min-w-2xl max-w-2xl">
                    <div className="rounded-t-xl bg-gray-800 px-5 py-2 flex items-center justify-between">
                        <div className="flex flex-row items-center gap-3">
                            {title}  
                        </div>
                        <div>
                            <FaX className="cursor-pointer" onClick={onClose}/>
                        </div> 
                    </div>
                </div>
                <div className="min-w-2xl max-w-2xl rounded-b-xl bg-gray-900 px-5 py-4 flex flex-col">
                    {children}
                </div>
            </Popup>
        </>
    );
}