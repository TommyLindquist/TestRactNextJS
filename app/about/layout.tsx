export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        Halloj AboutLayout
        {children}
    </div>
  );
}