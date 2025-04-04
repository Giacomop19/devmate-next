"use client"
import React, { useEffect, useState } from "react";
import { useStorageState } from "./useStorageState";
import { useRouter } from "next/navigation";


const cli = process.env.CLIENT
const AuthContext = React.createContext<{
  signIn: (data:any) => void;
  signOut: () => void;
  isLoading: boolean;
  session?: string | null;
  token? : string | null;
}>({
  signIn: () => null,
  signOut: () => null,
  isLoading: false,
  session: null,
  token: null
});


// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: Readonly<React.PropsWithChildren>) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [[t, token], setToken] = useStorageState("token")

  return (
    <AuthContext.Provider
      value={{
        signIn: async (data) => {
          try {
            setToken(data);
          }
          catch (err){
            console.error(err)
          }
        },
        signOut: () => {
          setToken(null)
        },
        isLoading: isLoading,
        token: token
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
