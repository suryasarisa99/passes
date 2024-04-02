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
  let [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const url = "https://99-passes-b.vercel.app/auth";
  // const url = "http://192.168.0.169:3000/auth";
  // const url = "http://localhost:3000/auth";
  useEffect(() => {
    console.log(url);
    let permanent = JSON.parse(localStorage.getItem("permanent"));
    setIsLoading(permanent);

    console.log("perm", permanent);
    if (permanent) {
      axios
        .post(url, { pass: "", password: "" }, { withCredentials: true })
        .then((res) => {
          console.log(res.data);
          if (res.data?.permanent != undefined) {
            localStorage.setItem("permanent", res.data.permanent);
          }
          if (res.data.error) {
            setShowError(true);
            setLogin(false);
            localStorage.removeItem("permanent");
          } else {
            setLogin(true);
            setEPasses(res.data.ePasses);
            setGPasses(res.data.gPasses);
          }
          setIsLoading(false);
        });
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(
        url,
        {
          pass: e.target.pass.value,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data?.permanent != undefined) {
          localStorage.setItem("permanent", res.data.permanent);
        }
        if (res.data.error) {
          setShowError(true);
          setLogin(false);
          localStorage.removeItem("permanent");
        } else {
          setLogin(true);
          setEPasses(res.data.ePasses);
          setGPasses(res.data.gPasses);
        }
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return (
      <div className="loader-screen">
        <span className="loader"></span>
      </div>
    );
  }

  if (!login) {
    return (
      <Lock handleSubmit={handleSubmit} showError={showError} login={login} />
    );
  }

  return (
    <div>
      <Passes ePasses={ePasses} gPasses={gPasses} login={login} />
    </div>
  );
}
