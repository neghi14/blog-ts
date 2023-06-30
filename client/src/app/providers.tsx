"use client";
import { Provider } from "react-redux";

import { store } from "@lib/store/store";
import NavBar from "@components/common/navBar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <main className="relative z-10">
        <NavBar />
        {children}
      </main>
    </Provider>
  );
}
