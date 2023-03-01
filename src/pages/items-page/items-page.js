import {
  Box, Container, Grid, Typography, Card, CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import ItemListTable from '../../components/Items/item-list-table';
import { ListFilters } from '../../components/Items/item-list-filters';
import { useEffect } from 'react';

const ItemsPage = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [items, setItems] = useState([]);
  const [foodbanks, setFoodbanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    name: undefined,
    category: [],
    status: [],
    inStock: undefined,
    foodbank: undefined,
  });

  useEffect(() => {
    try {
      fetch("http://localhost:8080/items")
        .then(res => res.json())
        .then(
          res => {
            setItems(res.items.value);
            setFoodbanks(res.foodbank_names.value)
          }
        )
        .then(() => setLoading(false))
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  }, []);

  var temp_foodbank_tags = foodbanks.map(foodbank => {
    const container = {};

    container['label'] = foodbank.cr967_name;
    container['value'] = foodbank.cr967_foodbankid;

    return container;
  })

  const foodbank_tags = [{label:'All', value:'all'}].concat(temp_foodbank_tags);

  const applyFilters = (products, filters) => products.filter((product) => {
    if (filters.name) {
      const nameMatched = product.cr967_name.toLowerCase().includes(filters.name.toLowerCase());

      if (!nameMatched) {
        return false;
      }
    }

    // Present only if filter required
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

    if (typeof filters.foodbank !== 'undefined') {

      var foodbankMatched = false;

      if (filters.foodbank === product._cr967_foodbankkey_value) {
        foodbankMatched = true
      }

      if (!foodbankMatched) {
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
                Items
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
            <ListFilters onChange={handleFiltersChange} foodbankOptions={foodbank_tags}/>
            <ItemListTable
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              items={paginatedItems}
              itemsCount={filteredItems.length}
              tags={foodbank_tags}
              page={page}
              rowsPerPage={rowsPerPage} />
            </Card>)}
      </Container>
    </Box>
  );
};

export default ItemsPage;