export function PageLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col max-w-4xl mx-auto p-4">{children}</div>;
}
