import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ListPage from "./pages/listPage";
import DetailsPage from "./pages/detailsPage";
import Layout from "./components/layout";
import PageNotFound from "./pages/pageNotFound";
import { QuestionsProvider } from "./contexts/QuestionsContext";
import HealthCheckPage from "./pages/healthCheckPage";

const AppRoutes = () => {
  return (
    <Router>
      <QuestionsProvider>
        <Routes>
          <Route element={<HealthCheckPage />} path="/" />
          <Route element={<Layout />} path="/">
            <Route element={<ListPage />} path="/questions" />
            <Route element={<DetailsPage />} path="/questions/:id" />
          </Route>
          <Route element={<PageNotFound />} path="*" />
        </Routes>
      </QuestionsProvider>
    </Router>
  );
};

export default AppRoutes;
