import { Outlet } from "react-router-dom";
// import Header from "../../../ui/typographs/header/header";
// import Paragraph from "../../../ui/typographs/paragraph";

const About = () => {
  // const location = useLocation();

  return (
    <div>
      {/* {location.pathname === "/about" ? <><Header className="text-center">About Us</Header><Paragraph>Make About Page as your preference, Click dropdown text to navigate About Pages </Paragraph></> : <Outlet />} */}
      <Outlet />
    </div>
  );
};

export default About;
