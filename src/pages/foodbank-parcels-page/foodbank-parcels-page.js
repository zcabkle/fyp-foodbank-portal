import FoodbankParcelsListTable from "../../components/Foodbank Parcels/foodbank-parcel-list-table";
import { ListFilters } from "../../components/Foodbank Parcels/foodbank-parcel-list-filters";
import {
  Box, Container, Grid, Typography, Card, CircularProgress,
} from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';

const FoodbankParcelsPage = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [foodbanks, setFoodbanks] = useState([]);
  const [filters, setFilters] = useState({
    name: undefined,
  });

  const guid = window.location.href.split("/").pop()

  useEffect(() => {
    try {
      fetch("http://localhost:8080/parcels/".concat(guid))
        .then(res => res.json())
        .then(res => {
          setParcels(res.parcels.value)
          setFoodbanks(res.foodbank_names.value)
        })
        .then(() => setLoading(false));
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  }, [guid]);

  var temp_foodbank_tags = foodbanks.map(foodbank => {
    const container = {};

    container['label'] = foodbank.cr967_name;
    container['value'] = foodbank.cr967_foodbankid;

    return container;
  })

  const foodbank_tags = [{label:'All', value:'all'}].concat(temp_foodbank_tags);

  const applyFilters = (products, filters) => products.filter((product) => {
    if (filters.name) {
      const nameMatched = product.cr967_name.toLowerCase().includes(filters.name.toLowerCase()) || product.cr967_description.toLowerCase().includes(filters.name.toLowerCase());

      if (!nameMatched) {
        return false;
      }
    }    

    return true;
  });

  const handleFiltersChange = (filters) => {
    setFilters(filters);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const applyPagination = (products, page, rowsPerPage) => products.slice(page * rowsPerPage,
    page * rowsPerPage + rowsPerPage);

  const filteredParcels = applyFilters(parcels, filters);
  const paginatedParcels = applyPagination(filteredParcels, page, rowsPerPage);

  const foodbankName = foodbanks?.filter((foodbank) => foodbank.cr967_foodbankid === guid)[0]?.cr967_name

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Grid
            container
            justifyContent="space-between"
            spacing={3}
          >
            <Grid item>
              <Typography variant="h4">
                Parcels at {foodbankName}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {(loading || error) ? (
          <Card><Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: "center",
              minHeight: "10vh",
              mt: 3
            }}>
            {error || <CircularProgress />}
          </Box></Card>
        ) : (
          <Card><ListFilters onChange={handleFiltersChange}/>
            <FoodbankParcelsListTable
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              parcels={paginatedParcels}
              parcelsCount={filteredParcels.length}
              page={page}
              rowsPerPage={rowsPerPage}
              tags={foodbank_tags} /></Card>)}
      </Container>
    </Box>
  );
};

export default FoodbankParcelsPage;