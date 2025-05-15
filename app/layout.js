import "./globals.css";
import { ThemeProvider, SessionProvider } from '../providers'
import { Footer, Navbar } from '../components/common'
import { Toaster } from "sonner";

export const metadata = {
  icons: {
    icon: '/logo.svg'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <title> Magic Touch </title>
      </head>
      <body className='antialiased transition-colors duraiton-300'>
        <SessionProvider>
          <ThemeProvider attribute="class">
            <Navbar />
            {children}
            <Footer />
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
