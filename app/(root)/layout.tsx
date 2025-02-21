// import { Toaster } from "sonner";

export default function DeveloperApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >

        {children}
        {/* <Toaster /> */}
      </body>
    </html>
  );
}
