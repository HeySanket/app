import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Pagination } from "@mui/material";
import CreateShortUrl from "./CreateShortUrl";
import { UrlValue } from "../context/UrlContext";
import { getTime } from "../reuseComp/getTime";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const UrlTable = () => {
  const {
    data,
    setData,
    pageLength,
    setPageLength,
    pageNumber,
    setPageageNumber,
    editData,
    setEditData,
    setUrlForm,
    UrlForm,
    setUrlData,
  } = useContext(UrlValue);

  const deleteUrl = (id) => {
    console.log(id);
    axios
      .delete(`${process.env.REACT_APP_SHORTURL_API_KEY}/${id}`)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editUrl = (id) => {
    setUrlForm(true);
    setEditData(true);
    setUrlData(id);
  };

  return (
    <>
      {UrlForm && (
        <CreateShortUrl setUrlForm={setUrlForm} editData={editData} />
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">No</TableCell>
              <TableCell align="center">CreatedAt</TableCell>
              <TableCell align="center">Original Url</TableCell>
              <TableCell align="right">Url ID </TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="right">{getTime(row.createdAt)}</TableCell>
                <TableCell align="center">
                  <a target="blank" href={row.originalUrl}>
                    {row.originalUrl}
                  </a>
                </TableCell>
                <TableCell align="right">
                  <a
                    target="blank"
                    href={`https://appbe.up.railway.app/shortUrl/${row.shortUrlId}`}
                  >
                    hhttps://appbe.up.railway.app/shortUrl/{row.shortUrlId}
                  </a>
                </TableCell>
                <TableCell align="right">
                  <span
                    style={{ color: "red" }}
                    onClick={() => deleteUrl(row._id)}
                  >
                    Delete
                  </span>
                  &nbsp;
                  <span style={{ color: "green" }} onClick={() => editUrl(row)}>
                    Edit
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        style={{ marginTop: 10 }}
        count={pageLength}
        onChange={(e, pageNum) => {
          setPageageNumber(pageNum);
        }}
        color="primary"
      />
      <img
        className="showCreateUrl"
        src="images/create.png"
        onClick={() => setUrlForm(!UrlForm)}
        height={60}
        width={60}
      />
    </>
  );
};
export default UrlTable;
