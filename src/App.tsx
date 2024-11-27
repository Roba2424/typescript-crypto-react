import { BrowserRouter, Route, Routes } from "react-router";
import CryptoList from "./pages/cryptoList";
import CryptoDetail from "./pages/cryptoDetail";
import { ROUTE_PATH_NAMES } from "./utils/constants/routes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTE_PATH_NAMES.HOME} element={<CryptoList />} />
          <Route
            path={`${ROUTE_PATH_NAMES.CRYPTODETAIL}/:id`}
            element={<CryptoDetail />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
