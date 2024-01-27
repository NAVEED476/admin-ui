import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import Table from "../components/Table";
import "./main.css";

const Main = () => {
  const [userData, setUserData] = useState([]);
  const handleSearch = (filterdData) => {
    setUserData(filterdData);
  };
  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((d) => d.json())
      .then((data) => setUserData(data));
  }, []);
  return (
    <>
      <div className="main-cont">
        <Search data={userData} onSearch={handleSearch}/>
        <Table data={userData} setUserData={setUserData} />
      </div>
    </>
  );
};

export default Main;
