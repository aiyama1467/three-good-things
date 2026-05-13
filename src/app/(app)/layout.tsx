import Navigation from "@/components/Navigation";
import { STREAK } from "@/lib/mock-data";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Navigation streak={STREAK} />
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: 72, // room for mobile tab bar
        }}
      >
        {children}
      </main>
    </div>
  );
}
