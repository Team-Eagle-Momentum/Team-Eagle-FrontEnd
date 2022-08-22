import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import resultCalculation from "./Home";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  const [calcData, setCalcData] = React.useState({});
  const { id } = useParams();

  React.useEffect(() => {
    axios.get(`${BASE_URL}/details/${id}`).then((res) => {
      setCalcData(res.data);
    });
  }, []);

  return (
    <div>
      {calcData.weekly}
      {calcData.monthly}
      {calcData.daily}
      {calcData.annual}
      Details
    </div>
  );
}
