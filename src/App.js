import { Routes, Route } from "react-router-dom";
// Bootstrap
import Container from "react-bootstrap/Container";
// Components
import ToTopButton from "./components/ToTopButton";
import Header from "./components/Header";
// Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
// Pages
import Today from "./pages/Today";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import Footer from "./components/Footer";
import Calendar from "./pages/Calendar";
import Training from "./pages/Training";
import ToDo from "./pages/ToDo";
import Handovers from "./pages/Handovers";
import Team from "./pages/Team";
import NewStore from "./pages/NewStore";

function App() {
  const [user, loading] = useAuthState(auth);

  if (!user && !loading) {
    return <Login />;
  }

  if (user && !loading) {
    return (
      <>
        <Header />
        <div className="background">
          <Container>
            <Routes>
              <Route exact path="/" element={<Today />} />
              <Route exact path="/calendar" element={<Calendar />} />
              <Route exact path="/dailytasks" element={<Tasks />} />
              <Route exact path="/todo" element={<ToDo />} />
              <Route exact path="/training" element={<Training />} />
              <Route exact path="/handovers" element={<Handovers />} />
              <Route exact path="/team" element={<Team />} />
              <Route exact path="/newstore" element={<NewStore />} />
            </Routes>
          </Container>
        </div>
        <Footer />
        <ToTopButton />
      </>
    );
  }
}

export default App;
