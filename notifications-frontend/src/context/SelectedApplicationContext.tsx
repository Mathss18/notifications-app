import { useState, createContext, useContext, useEffect } from "react";

const SelectedApplicationContext = createContext<any>(null);

function SelectedApplicationContextProvider({ children }: any) {
  const [application, setApplication] = useState(null);

  return (
    <SelectedApplicationContext.Provider value={[application, setApplication]}>
      {children}
    </SelectedApplicationContext.Provider>
  );
}

export function useSelectedApplication() {
  return useContext(SelectedApplicationContext);
}

export default SelectedApplicationContextProvider;

