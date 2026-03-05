import Container from "react-bootstrap/Container";
import { Link, NavLink } from "react-router-dom";
import PawIcon from "../PawIcon";

const TopNav = () => {
  return (
    <div
      style={{
        background: "#f8f9fb",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Container
        className="d-flex align-items-center gap-4"
        style={{ height: 56 }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            color: "#212529",
            fontWeight: 600,
          }}
        >
          <PawIcon size={20} />
          Dog Selector
        </Link>

        <NavLink
          to="/contact"
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? "#212529" : "#6c757d",
            fontWeight: 500,
          })}
        >
          Contact Us
        </NavLink>
      </Container>
    </div>
  );
};

export default TopNav;
