import { useState } from "react";

export const NavbarHooks = () => {
    //Ham drawer states
    const [openHamDrawer, setOpenHamDrawer]= useState<boolean>(false)

    const handleToggleHamDrawer=()=>{
        setOpenHamDrawer(prev=>!prev)
    }
    return {
        openHamDrawer,
        handleToggleHamDrawer,
        
    }
}