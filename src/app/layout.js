// src/app/layout.js
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

export const metadata = {
    title: "Miento",
    description: "Miento portfolio",
    keywords: ["portfolio", "Miento", "김진우"],
};

export default function RootLayout({ children }) {
    return (
        <html lang="ko">
            <body>
                <ConditionalLayout>{children}</ConditionalLayout>
            </body>
        </html>
    );
}
