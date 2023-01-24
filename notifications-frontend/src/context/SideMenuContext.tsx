import { useState, createContext, useContext } from "react";

const SideMenuContext = createContext<any>(null);

function SideMenuContextProvider({ children }: any) {
    const [openMenu, setOpenMenu] = useState(true);
    return (
        <SideMenuContext.Provider value={[openMenu, setOpenMenu]}>
            {children}
        </SideMenuContext.Provider>
    );
}

export function useMenu() {
    return useContext(SideMenuContext);
}

export default SideMenuContextProvider;

