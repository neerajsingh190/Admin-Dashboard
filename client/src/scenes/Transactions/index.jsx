import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useEffect } from "react";

const Transactions = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});

  // hum chahte h k value dalte hue chnge na hoke proper value dal jane p search btn k click p ho so 2 states
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");


  // so whenever above states will be changed , below API request will hit
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  useEffect(() => {
    if (data && data.total) {
      setPage(Math.ceil(data.total / pageSize)); // Calculate numberOfPages
    }
  }, [data, pageSize]);


  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];


  return (
    <Box m="1.5rem 2.5rem">
    <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
    <Box
      height="80vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: theme.palette.primary.light,
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderTop: "none",
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${theme.palette.secondary[200]} !important`,
        },
      }}
    >
      <DataGrid
        loading={isLoading || !data}
        getRowId={(row) => row._id}
        rows={(data && data.transactions) || []}
        columns={columns}
        rowCount={(data && data.total) || 0}
       rowsPerPageOptions={[20, 50, 100]}
       
       paginationMode="server"
       paginationModel={{
        pageSize: {pageSize},
        page: {page},
      }}
     
        
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onSortModelChange={(newSortModel) => setSort(...newSortModel)}
      pagination={true}
        // page={page}
        // pageSize={pageSize}
        sortingMode="server"
        // below is description of how values are changed
        // these are changed then re-render and api call happens
        // hum component bhej rhe h jo pure datagrid p lg k colum etc bna dega known as toolbar 
        components={{ Toolbar: DataGridCustomToolbar }}
        // toolbar component k andr props bhej rhe h
        componentsProps={{
          toolbar: { searchInput, setSearchInput, setSearch },
        }}
      />
    </Box>
  </Box>
  )
}

export default Transactions
