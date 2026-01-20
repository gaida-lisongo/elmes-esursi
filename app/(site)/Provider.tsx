"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import ToasterContext from "../context/ToastContext";

import { Menu } from "@/types/menu";

export default function ClientLayout({
    children,
    menuData,
    cycles,
}: {
    children: React.ReactNode;
    menuData?: Menu[];
    cycles?: any[];
}) {
    return (
        <ThemeProvider
            enableSystem={false}
            attribute="class"
            defaultTheme="light"
        >
            <Lines />
            <Header customMenuData={menuData} />
            <ToasterContext />
            {children}
            <Footer cycles={cycles || []} />
            <ScrollToTop />
        </ThemeProvider>
    );
}
