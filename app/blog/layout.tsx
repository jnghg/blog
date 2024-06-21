import { Footer } from "@/components/Footer";
import Nav from "@/components/Nav";
import { ReactNode } from "react";

export default async function BlogLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Nav />

      <div className="w-full animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-6xl px-3">
        {/* header position */}
        <div className="flex space-x-10 items-center">
          <div className="flex-1 flex flex-col gap-6 items-center">
            {children}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
