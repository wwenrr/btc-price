import "@/assets/style.scss"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{position: "relative"}}>
        {children}
      </body>
    </html>
  );
}
