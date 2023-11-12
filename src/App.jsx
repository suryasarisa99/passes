import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Lock from "./pages/Lock";
import Passes from "./pages/Passes";
export default function App() {
  const [ePasses, setEPasses] = useState([]);
  const [gPasses, setGPasses] = useState([]);
  let [showError, setShowError] = useState();
  let [login, setLogin] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    let url = "https://pass-backend.vercel.app/passes";
    // let url = "http://192.168.0.169:3000/passes";
    axios
      .post(url, {
        pass: e.target.pass.value,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.error) {
          setShowError(true);
          setLogin(false);
        } else {
          setLogin(true);
          navigate("/passes");
          setEPasses(res.data.ePasses);
          setGPasses(res.data.gPasses);
        }
      });
  }

  useEffect((e) => {}, []);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Lock
              handleSubmit={handleSubmit}
              showError={showError}
              login={login}
            />
          }
        />
        <Route
          path="/passes"
          element={<Passes ePasses={ePasses} gPasses={gPasses} login={login} />}
        />
      </Routes>
    </div>
  );
}
