import React from "react";
import { FaX } from "react-icons/fa6";
import Popup from "reactjs-popup";

interface PopupSkeletonProps {
  title: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
  closeDocumentOnClick?: boolean;
}

export const PopupSkeleton: React.FC<PopupSkeletonProps> = ({
  title,
  children,
  open,
  onClose,
  closeDocumentOnClick = true,
}) => {
  return (
    <Popup
      open={open}
      overlayStyle={{
        backgroundColor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
      }}
      onClose={onClose}
      closeOnDocumentClick={closeDocumentOnClick}
    >
      <div
        className="
          max-w-3xl 
          w-[95vw] 
          max-h-[90vh] 
          flex flex-col 
          rounded-xl 
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="bg-neutral-800 px-5 py-2 flex items-center justify-between">
          <div className="flex flex-row items-center gap-3">{title}</div>
          {onClose && <FaX className="cursor-pointer" onClick={onClose} />}
        </div>

        {/* Content (scrollable se precisar) */}
        <div
          className="
            bg-neutral-900 
            px-5 py-4 
            flex-1 
            overflow-y-auto
          "
        >
          {children}
        </div>
      </div>
    </Popup>
  );
};
