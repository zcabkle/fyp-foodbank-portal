import React, { useState, useEffect } from "react"
import FoodbankItemsListTable from "../../components/Foodbank Items/foodbank-item-list-table";
import { ListFilters } from "../../components/Foodbank Items/foodbank-item-list-filters";
import {
  Box, Container, Grid, Typography, Card, CircularProgress,
} from '@mui/material';


const FoodbankItemsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [foodbanks, setFoodbanks] = useState([]);
  const [filters, setFilters] = useState({
    name: undefined,
    inStock: undefined
  });

  const guid = window.location.href.split("/").pop()

  useEffect(() => {
    try {
      fetch("http://localhost:8080/items/".concat(guid))
        .then(res => res.json())
        .then(res => {
          setItems(res.items.value);
          setFoodbanks(res.foodbank_names.value);
        })
        .then(() => setLoading(false))
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  }, [guid]);

  const applyFilters = (products, filters) => products.filter((product) => {
    if (filters.name) {
      const nameMatched = product.cr967_name.toLowerCase().includes(filters.name.toLowerCase());

      if (!nameMatched) {
        return false;
      }
    }

    if (typeof filters.inStock !== 'undefined') {

      var stockMatched = false;

      if (filters.inStock === 'understocked' && product.cr967_stocklevel === 0 && product.cr967_sharestocklevelwith === 2) {
        stockMatched = true
      } else if (filters.inStock === 'normal' && product.cr967_stocklevel === 1 && product.cr967_sharestocklevelwith === 2) {
        stockMatched = true
      } else if (filters.inStock === 'overstocked' && product.cr967_stocklevel === 2 && product.cr967_sharestocklevelwith === 2) {
        stockMatched = true
      }

      if (!stockMatched) {
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

  const filteredItems = applyFilters(items, filters);
  const paginatedItems = applyPagination(filteredItems, page, rowsPerPage);

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
                {foodbankName && 'Items at ' + foodbankName}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {(loading || error) ? (
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
            </Box>
          </Card>
        ) : (
          <Card>
            <ListFilters onChange={handleFiltersChange} />
            <FoodbankItemsListTable
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              items={paginatedItems}
              itemsCount={filteredItems.length}
              page={page}
              rowsPerPage={rowsPerPage} />
          </Card>)}
      </Container>
    </Box>
  );
};

export default FoodbankItemsPage;