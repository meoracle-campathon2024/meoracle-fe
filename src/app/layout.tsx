import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppLayout } from "@/components/AppLayout";

import "./globals.css";
import { ToastContainer } from "react-toastify";
import { AllProviders } from "@/providers";
import { createSigner } from "fast-jwt";
import { headers } from "next/headers";
import { AuthProvider } from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meoracle",
  description: "Your Health Assistant",
};

function createCsrfToken(ip: string): string {
  const signSync = createSigner({
    key: process.env.FRONTEND_SECRET,
    algorithm: 'HS256',
    mutatePayload: true,
    expiresIn: "20s",
    nonce: crypto.randomUUID(),
  });

  const csrfToken: string = signSync({ ip });
  return csrfToken;
}

export default function RootLayout({ children }: {
  children: React.ReactNode,
}) {
  const ipAddress = headers().get("" + process.env.CLIENT_IP_HEADER_NAME) || "127.0.0.1";
  const csrfToken: string = createCsrfToken(ipAddress);

  return <html lang="en">

    <AuthProvider csrfToken={csrfToken}>

      <body className={inter.className}>
        <AllProviders>
          <AppLayout>
            {children}
            <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </AppLayout>
        </AllProviders>
      </body>
    </AuthProvider>
  </html>;
}
