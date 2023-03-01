import {
  Box, Container, Grid, Typography, Card, CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import FoodbankListTable from '../../components/Foodbanks/foodbank-list-table';
import { ListFilters } from '../../components/Foodbanks/foodbank-list-filters';
import { useEffect } from 'react';

const getPostcodes = (foodbanks) => {
  const allPostcodes = foodbanks.map(foodbank => ({
    value: (foodbank.cr967_postcode.split(" "))[0],
    label: (foodbank.cr967_postcode.split(" "))[0]
  }))

  let uniquePostcodes = [...new Map(allPostcodes.map((item) => [item["value"], item])).values()];

  return uniquePostcodes
}

const FoodbanksPage = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [foodbanks, setFoodbanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    name: undefined,
    postcode: undefined,
  });

  useEffect(() => {
    try {
      fetch("http://localhost:8080/foodbanks")
        .then(res => res.json())
        .then(res => {
          setFoodbanks(res.foodbanks.value);
        })
        .then(() => setLoading(false))
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  }, []);

  var postcodes = getPostcodes(foodbanks);
  postcodes = [{ label: 'All', value: 'all' }].concat(postcodes);

  const applyFilters = (products, filters) => products.filter((product) => {
    if (filters.name) {
      const nameMatched = product.cr967_name.toLowerCase().includes(filters.name.toLowerCase());

      if (!nameMatched) {
        return false;
      }
    }

    if (typeof filters.postcode !== 'undefined') {
      const postcodeMatched = product.cr967_postcode.toLowerCase().includes(filters.postcode.toLowerCase());

      if (!postcodeMatched) {
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

  const filteredFoodbanks = applyFilters(foodbanks, filters);
  const paginatedFoodbanks = applyPagination(filteredFoodbanks, page, rowsPerPage);

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
                Foodbanks
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {
          (loading || error) ? (
            <Card>
              <Box
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
            <Card>
              <ListFilters onChange={handleFiltersChange} postcodeOptions={postcodes} />
              <FoodbankListTable
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                foodbanks={paginatedFoodbanks}
                foodbanksCount={filteredFoodbanks.length}
                page={page}
                rowsPerPage={rowsPerPage} />
            </Card>)
          }
      </Container>
    </Box>
  );
};

export default FoodbanksPage;