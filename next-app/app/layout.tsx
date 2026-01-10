/* 
  It is important to not use 'use client' here, as this file should remain a server component.

  1. Keeping this as a server component allows Next.js to optimize performance and SEO.
      By wrapping the entire application in AuthProvider here, we ensure that all components 
      in the app has access to the authentication context.

  2. Next.js uses an architecture called "React Server Components" (RSC).
      Ideally, you want as much of your app as possible to be rendered on the Server for speed
      and only specific interactive parts to be Client Components.
        - Good Practice: The Root Layout (this file) is a Server Component. It renders the HTML shell
          instantly on the server.
        - By marking the entire root layout as 'use client', we are forcing the entry point of the entire app
          to be a Client Component, losing the efficiency of server-side rendering.
          
  3. If layout.tsx is a Server Component (pages inside {children}), it can pass other Server Components 
      into a Client Component (AuthProvider) through the children prop.
        - If layout.tsx were a Server Component, the pages (inside {children}) stay as Server Components. Which is
          fast and SEO-friendly.
        - If layout.tsx were a Client Component, even if Next.js allowed it, and is still smart enough to still render
          children on the server in many cases, data flow and boundary logic at the very root of the tree will be more
          unnecessarily complicated.
*/

import "./globals.css";

import { AuthProvider } from "@/components/context/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

// Metadata API can be used when layout.tsx is a Server Component.
// Metadata for the application with Metadata API
// title and description defined here can be used by Next.js for SEO and browser tab titles.
export const metadata = {
  title: "Internship Application Tracker",
  description: "Track and manage your internship applications efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/*
            Next.js treats AuthProvider as a "Client Island" 
            inside a "Server Shell".
        */}
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}