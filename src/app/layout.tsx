import type { Metadata } from "next";
import "./globals.css";
import 'material-icons/iconfont/material-icons.css';
import { ReduxProvider } from "@/redux/reduxProviders";
import { ToasterProvider } from "@/common";


export const metadata: Metadata = {
  title: "Petrol Pump Management",
  description: "An awesome web app to manage your petrol pump",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToasterProvider>
        <ReduxProvider>
           {children}
        </ReduxProvider>
        </ToasterProvider>
          </body>
    </html>
  );
}
