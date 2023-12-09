import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home";
import ListPage from "./pages/listPage";
import DetailsPage from "./pages/detailsPage";
import Layout from "./components/layout";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<Home />} path="/" exact />
          <Route element={<ListPage />} path="/questions" />
          <Route element={<DetailsPage />} path="/questions/:id" />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
