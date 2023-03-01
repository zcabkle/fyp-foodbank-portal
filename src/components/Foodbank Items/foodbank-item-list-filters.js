import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, Divider, Input, Typography, Grid } from '@mui/material';
import { useUpdateEffect } from '../../hooks/use-update-effect';
import { Search as SearchIcon } from '../../icons/search';
import { MultiSelect } from '../multi-select';

const stockOptions = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Understocked',
    value: 'understocked'
  },
  {
    label: 'Normal',
    value: 'normal'
  },
  {
    label: 'Overstocked',
    value: 'overstocked'
  },
];

export const ListFilters = (props) => {
  const { onChange, ...other } = props;
  const [queryValue, setQueryValue] = useState('');
  const [filterItems, setFilterItems] = useState([]);

  useUpdateEffect(() => {
    const filters = {
      name: undefined,
      inStock: undefined
    };

    // Transform the filter items in an object that can be used by the parent component to call the
    // serve with the updated filters
    filterItems.forEach((filterItem) => {
      switch (filterItem.field) {
        case 'name':
          // There will (or should) be only one filter item with field "name"
          // so we can set up it directly
          filters.name = filterItem.value;
          break;
        case 'inStock':
          filters.inStock = filterItem.value;
          break;
        default:
          break;
      }
    });

    onChange?.(filters);
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterItems]);

  const handleDelete = (filterItem) => {
    setFilterItems((prevState) => prevState.filter((_filterItem) => {
      return !(filterItem.field === _filterItem.field && filterItem.value === _filterItem.value);
    }));
  };

  const handleQueryChange = (event) => {
    setQueryValue(event.target.value);
  };

  const handleQueryKeyup = (event) => {
    if (event.code === 'Enter' && queryValue) {
      // We only allow one chip for the name field

      const filterItem = filterItems.find((filterItem) => filterItem.field === 'name');

      if (filterItem) {
        setFilterItems((prevState => prevState.map((filterItem) => {
          if (filterItem.field === 'name') {
            return {
              ...filterItem,
              value: queryValue
            };
          }

          return filterItem;
        })));
      } else {
        setFilterItems((prevState) => [
          ...prevState,
          {
            label: 'Name',
            field: 'name',
            value: queryValue
          }
        ]);
      }

      setQueryValue('');
    }
  };

  const handleStockChange = (values) => {
    // Stock can only have one value, even if displayed as multi-select, so we select the first one.
    // This example allows you to select one value or "All", which is not included in the
    // rest of multi-selects.

    setFilterItems((prevState) => {
      // First cleanup the previous filter items
      const newFilterItems = prevState.filter((filterItem) => filterItem.field !== 'inStock');
      const latestValue = values[values.length - 1];

      switch (latestValue) {
        case 'understocked':
          newFilterItems.push({
            label: 'Stock',
            field: 'inStock',
            value: 'understocked',
            displayValue: 'Understocked'
          });
          break;
        case 'overstocked':
          newFilterItems.push({
            label: 'Stock',
            field: 'inStock',
            value: 'overstocked',
            displayValue: 'Overstocked'
          });
          break;
        case 'normal':
          newFilterItems.push({
            label: 'Stock',
            field: 'inStock',
            value: 'normal',
            displayValue: 'Normal'
          });
          break;
        default:
          // Should be "all", so we do not add this filter
          break;
      }

      return newFilterItems;
    });
  };

  const stockValues = useMemo(() => {
    const values = filterItems
      .filter((filterItems) => filterItems.field === 'inStock')
      .map((filterItems) => filterItems.value);

    // Since we do not display the "all" as chip, we add it to the multi-select as a selected value
    if (values.length === 0) {
      values.unshift('all');
    }

    return values;
  }, [filterItems]);

  return (
    <div {...other}>
      <Grid container
        spacing={0} >
        
        <Grid item md={10} xs={12}>
        <Divider  display={{ xs: 'block', sm: 'none' }} />
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              p: 2
            }}
          >

            <SearchIcon fontSize="small" />
            <Box
              sx={{
                flexGrow: 1,
                ml: 3
              }}
            >
              <Input
                disableUnderline
                fullWidth
                onChange={handleQueryChange}
                onKeyUp={handleQueryKeyup}
                placeholder="Filter by product name"
                value={queryValue}
              />
            </Box>
          </Box>

        </Grid>
        <Divider />

        <Grid item md={2} xs={12}>
        <Divider  display={{ xs: 'block', sm: 'none' }} />
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              p: 2
            }}
          >
            <MultiSelect
          label="Stock"
          onChange={handleStockChange}
          options={stockOptions}
          value={stockValues}
        />
          </Box>
        </Grid>

      </Grid>
      <Divider />
      {filterItems.length > 0
        ? (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              p: 2
            }}
          >
            {filterItems.map((filterItem, i) => (
              <Chip
                key={i}
                label={(
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      '& span': {
                        fontWeight: 600
                      }
                    }}
                  >
                    <>
                      <span>
                        {filterItem.label}
                      </span>
                      :
                      {' '}
                      {filterItem.displayValue || filterItem.value}
                    </>
                  </Box>
                )}
                onDelete={() => handleDelete(filterItem)}
                sx={{ m: 1 }}
                variant="outlined"
              />
            ))}
          </Box>
        )
        : (
          <Box sx={{ p: 3 }}>
            <Typography
              color="textSecondary"
              variant="subtitle2"
            >
              No filters applied
            </Typography>
          </Box>
        )}
      <Divider />
    </div>
  );
};

ListFilters.propTypes = {
  onChange: PropTypes.func
};
