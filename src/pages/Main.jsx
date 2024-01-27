import React,{useEffect,useState} from 'react'
import Search from '../components/Search'
import Table from "../components/Table"
import "./main.css"

const Main = () => {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        )
          .then((d) => d.json())
          .then((data) => setUserData(data));
      }, []);
  return (<>
    <div className='main-cont'>
        <Search/>
        <Table data={userData}/>
    </div>
    </>)
}

export default Main