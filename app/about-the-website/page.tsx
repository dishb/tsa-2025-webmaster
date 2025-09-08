import Link from "next/link";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";

export default function AboutTheWebsite() {
  return (
    <>
      <Navbar invertTextColor={true} />
      <ScrollToTop />
      <main className="h-screen pt-20 px-8 pb-8 bg-bianca-100">
        <div className="prose">
          <h1>About the Website</h1>
          <h2 className="mt-2">Team</h2>
          <p>
            This website was designed by Kethan Vegunta, Aarush Tahiliani, and
            Varun Gundamaraju.
          </p>
          <p>Team ID: 1222-1</p>
          <h2>Technical Design Details</h2>
          <p>
            This website was created using{" "}
            <Link className="link" href="https://nextjs.org">
              Next.js
            </Link>
            ,{" "}
            <Link className="link" href="https://react.dev">
              React
            </Link>
            ,{" "}
            <Link className="link" href="https://tailwindcss.com">
              TailwindCSS
            </Link>
            ,{" "}
            <Link className="link" href="https://ui.shadcn.com">
              Shadcn/ui
            </Link>
            , and{" "}
            <Link className="link" href="https://motion.dev">
              Framer Motion
            </Link>
            .
          </p>
          <p>
            No template engine websites, tools, and sites that generate HTML
            from text, markdown, or script files were used during the creation
            of this website.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
