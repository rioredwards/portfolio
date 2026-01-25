export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <>
      <main className="bg-background min-h-screen">
        <div className="mt-panel-tall-extended-padding-height"></div>
        {children}
        <div className="mt-panel-tall-extended-padding-height"></div>
      </main>
      <div className="mt-panel-tall-extended-padding-height"></div>
    </>
  )
}
