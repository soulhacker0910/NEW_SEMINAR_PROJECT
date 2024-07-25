'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@mantine/core";
import { ActionToggle } from "./components/toggle/ActionToggle";
import { TableSelection } from "./components/table/TableSelection";
import { useEffect, useState } from "react";


export default function Home() {
  const [employees,setEmployees]= useState<any | null>(null);

  const fetchEmployees = async (): Promise <any> => {
    try{
      const response = await fetch("http://192.168.20.16:5000/api/employees");
      if (!response.ok){
        throw new Error('HTTP error! status: ${response.status}');
      }
      const res = await response.json();
      return res.data;
    } catch(e){
      //todo error
    }
  };

  useEffect (()=>{
    (async ()=> {
      const data = await fetchEmployees();
      setEmployees(data);
    })();
  },[]);
  return (
 <>
   <ActionToggle/>
   {employees && <TableSelection data={employees}/>}
  
  <Button variant="outline" color="lime">Button</Button>
 </>
  );
}
