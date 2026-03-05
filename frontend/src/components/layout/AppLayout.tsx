import Container from "react-bootstrap/Container";
import TopNav from "./TopNav";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ minHeight: "100vh", background: "#f3f6fb" }}>
      <TopNav />
      <Container className="px-0">{children}</Container>
    </div>
  );
};

export default AppLayout;
