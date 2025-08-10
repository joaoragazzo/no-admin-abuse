import { useState } from "react";

export const usePopup = (initialOpen = false) => {
    const [open, setOpen] = useState(initialOpen);

    const openPopup = () => setOpen(true);
    const closePopup = () => setOpen(false);
    const togglePopup = () => setOpen(prev => !prev);

    return {
        open,
        openPopup,
        closePopup,
        togglePopup
    };
}