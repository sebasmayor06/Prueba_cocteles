/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import 'styled-components'
import './Cocteles.css'
import axios from 'axios';


export default function Cocteles() {
  const columns = [
    {
      name: "ID",
      selector: (row) => row.idDrink,
      sortable: true
    },
    {
      name: "NOMBRE",
      selector: (row) => row.strDrink,
      sortable: true
    },
    {
      name: "CATEGORIA",
      selector: (row) => row.strCategory,
    },
    {
      name: "IMAGEN",
      // eslint-disable-next-line jsx-a11y/alt-text
      selector: (row) => <img height={70} width={80} src={row.strDrinkThumb}/>,
    },
  ];
  const [coctel, setCoctel] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);

const getData = async () => {
    try {
      const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
      const res = response.data;
      console.log(res.drinks);
      setCoctel(res.drinks);
      setFilter(res.drinks);
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    getData();
  }, []);

  useEffect(()=>{
    const resul = coctel.filter((i)=>{
      return i.strDrink.toLowerCase().match(search.toLocaleLowerCase());
    })
    setFilter(resul)
  },[search])

 
  return (
    <div className="container">
      <h1 className="title"> Lista de Cocteles</h1>
      <DataTable
      columns={columns}
      data={filter}
      pagination
      fixedHeader
      highlightOnHover
      subHeader
        subHeaderComponent={
          <input type="text"
          placeholder="Buscar..."
          className="search"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          />
        }
        subHeaderAlign="center"
      />
    </div>
  );
}
