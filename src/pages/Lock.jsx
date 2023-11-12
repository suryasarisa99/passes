import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Lock({ showError, handleSubmit, login }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (login) navigate("/passes");
  }, []);
  return (
    <div className="unlock-page">
      <form action="" onSubmit={handleSubmit}>
        <input type="password" name="pass" placeholder="Enter Password" />
      </form>
      {showError && <p className="error">Incorrect Password</p>}
    </div>
  );
}
