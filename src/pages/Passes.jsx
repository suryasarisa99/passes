import { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
function Passes({ gPasses, ePasses, login }) {
  const navigate = useNavigate();
  useEffect(() => {
    // if (!login) navigate("/unlock");
  }, []);
  return (
    <>
      <div className="pass-boxes ecap">
        {ePasses.map((epass, index) => {
          return <Pass pass={epass} key={index} />;
        })}
      </div>
      {/* <p>Google Passwords</p> */}
      <div className="pass-boxes google">
        {gPasses.map((gpass, index) => {
          return <Pass pass={gpass} key={index} />;
        })}
      </div>
    </>
  );
}

function Pass({ pass }) {
  const [showOldPasses, setShowOldPasses] = useState(false);
  return (
    <div className={"pass-box " + pass.type}>
      <div className="field">
        <span className="txt user">User:</span>
        <span
          className="value user"
          onClick={() => navigator.clipboard.writeText(pass._id)}
        >
          {pass._id}
        </span>
      </div>
      {pass.temp && (
        <div className="field">
          <span className="txt password">Pass:</span>
          <span
            className="value password"
            onClick={() => navigator.clipboard.writeText(pass.password)}
          >
            {pass.temp}
          </span>
          {pass.twoStepAuth != undefined && (
            <span className={"n2fs " + pass?.twoStepAuth}>2fa</span>
          )}
        </div>
      )}

      {pass.password && (
        <div className="field">
          <span className="txt password">Pass:</span>
          <span
            className="value password"
            onClick={() => navigator.clipboard.writeText(pass.password)}
          >
            {pass.password}
          </span>
          {!pass.temp && pass.twoStepAuth != undefined && (
            <span className={"n2fs " + pass?.twoStepAuth}>2fa</span>
          )}
        </div>
      )}
      {pass.oldPasswords.length > 0 && (
        <>
          <div
            className="toggle-old-passes"
            onClick={() => setShowOldPasses((prv) => !prv)}
          >
            <p>Old Passwords</p>
            {!showOldPasses ? <FaChevronDown /> : <FaChevronUp />}
          </div>
          <AnimatePresence>
            {showOldPasses && (
              <motion.div
                className="old-passes"
                initial={{ height: 0, overflow: "hidden" }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.25 }}
              >
                {pass.oldPasswords.map((oldp, ind) => (
                  <motion.div
                    className="oldpass"
                    key={ind}
                    onClick={() => navigator.clipboard.writeText(oldp)}
                  >
                    {oldp}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default Passes;
