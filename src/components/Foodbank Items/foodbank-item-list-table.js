import { Fragment, useState } from 'react';
import {
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Grid,
  Divider,
  TextField,
  CardContent
} from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '../../icons/chevron-right';
import { ChevronDown as ChevronDownIcon } from '../../icons/chevron-down';
import { Image as ImageIcon } from '../../icons/image';
import { Scrollbar } from '../scrollbar';
import { SeverityPill } from '../severity-pill';

const getCategory = (n) => {
  switch (n) {
    case 0:
      return "Fresh/Fruit/Veg";
    case 1:
      return "Dairy";
    case 2:
      return "Toiletries";
    case 3:
      return "Cereal";
    case 4:
      return "Canned";
    case 5:
      return "Meat";
    case 6:
      return "Bread";
    case 7:
      return "Miscellaneous";
    case 8:
      return "Dry Food/Long Life";
    default:
      return "HERE";
  }
}

const FoodbankItemsListTable = (props) => {

  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    items,
    itemsCount,
    rowsPerPage,
  } = props;
  const [openProduct, setOpenProduct] = useState(null);

  const handleOpenProduct = (productId) => {
    setOpenProduct((prevValue) => (prevValue === productId ? null : productId));
  };


  return (
    <Card>
      <div>
        <Scrollbar>
          <Table sx={{ minWidth: 1200 }}>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell width="25%">
                  Name
                </TableCell>
                <TableCell width="25%">
                  Item Category
                </TableCell>
                <TableCell>
                  Quantity
                </TableCell>
                <TableCell>
                  Stock Level
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {items.map((item) => {
                const open = item.cr967_itemid === openProduct;

                return (
                  <Fragment key={item.cr967_itemid}>
                    <TableRow
                      hover
                      key={item.cr967_itemid}
                    >
                      <TableCell
                        padding="checkbox"
                        sx={{
                          ...(open && {
                            position: 'relative',
                            '&:after': {
                              position: 'absolute',
                              content: '" "',
                              top: 0,
                              left: 0,
                              backgroundColor: 'primary.main',
                              width: 3,
                              height: 'calc(100% + 1px)'
                            }
                          })
                        }}
                        width="25%"
                      >
                        <IconButton onClick={() => handleOpenProduct(item.cr967_itemid)}>
                          {open
                            ? <ChevronDownIcon fontSize="small" />
                            : <ChevronRightIcon fontSize="small" />}
                        </IconButton>
                      </TableCell>
                      <TableCell width="25%">
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex'
                          }}
                        >
                          {item.cr967_image
                            ? (
                              <Box
                                component="img"
                                sx={{
                                  alignItems: 'center',
                                  backgroundColor: 'background.default',
                                  backgroundImage: 'background.default',
                                  backgroundPosition: 'center',
                                  backgroundSize: 'cover',
                                  borderRadius: 1,
                                  display: 'flex',
                                  height: 80,
                                  justifyContent: 'center',
                                  overflow: 'hidden',
                                  width: 80
                                }}
                                src={'data:image/png;base64,'.concat(' ').concat(item.cr967_image)}
                              />
                            )
                            : (
                              <Box
                                sx={{
                                  alignItems: 'center',
                                  backgroundColor: 'background.default',
                                  borderRadius: 1,
                                  display: 'flex',
                                  height: 80,
                                  justifyContent: 'center',
                                  width: 80
                                }}
                              >
                                <ImageIcon fontSize="small" />
                              </Box>
                            )}
                          <Box
                            sx={{
                              cursor: 'pointer',
                              ml: 2
                            }}
                          >
                            <Typography variant="subtitle2">
                              {item.cr967_name}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell width="25%">
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          {getCategory(item.cr967_itemcategory)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          {item.cr967_sharequantitywith === 2 ?
                            item.cr967_quantity : "Quantity not being shared."}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {item.cr967_sharestocklevelwith === 2 &&
                          <Box>
                            <SeverityPill color={
                              (() => {
                                if (item.cr967_stocklevel === 0) {
                                  return (
                                    'error'
                                  )
                                } else if (item.cr967_stocklevel === 1) {
                                  return (
                                    'info'
                                  )
                                } else {
                                  return (
                                    'success'
                                  )
                                }
                              })()
                            }>
                              {
                                (() => {
                                  if (item.cr967_stocklevel === 0) {
                                    return (
                                      "UNDERSTOCKED"
                                    )
                                  } else if (item.cr967_stocklevel === 1) {
                                    return (
                                      "NORMAL"
                                    )
                                  } else {
                                    return (
                                      "OVERSTOCKED"
                                    )
                                  }
                                })()
                              }
                            </SeverityPill>
                            <Typography
                              color="textSecondary"
                              variant="body2"
                            >
                              {item.cr967_stocklevel === 0 && sessionStorage.getItem("userType") == 'donator' && "Donations requested!"}
                            </Typography></Box>}
                        {
                          item.cr967_sharestocklevelwith !== 2 && <Typography
                            color="textSecondary"
                            variant="body2"
                          > Stock level not being shared.</Typography>
                        }
                      </TableCell>

                    </TableRow>
                    {open && (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          sx={{
                            p: 0,
                            position: 'relative',
                            '&:after': {
                              position: 'absolute',
                              content: '" "',
                              top: 0,
                              left: 0,
                              backgroundColor: 'primary.main',
                              width: 3,
                              height: 'calc(100% + 1px)'
                            }
                          }}
                        >
                          <CardContent>
                            <Grid
                              container
                              spacing={3}
                            >
                              <Grid
                                item
                                md={12}
                                xs={12}
                              >
                                <Typography variant="h6">
                                  Details
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Grid
                                  container
                                  spacing={3}
                                >
                                  <Grid
                                    item
                                    md={12}
                                    xs={12}
                                  >
                                    <TextField
                                      defaultValue={item.cr967_description ? item.cr967_description : "No description given."}
                                      fullWidth
                                      label="Description"
                                      name="description"
                                      InputProps={{
                                        readOnly: true,
                                      }}
                                      multiline
                                      minRows={4}
                                    />
                                    
                                  </Grid>
                                </Grid>
                              </Grid>
                            
                            </Grid>
                          </CardContent>
                          <Divider />
                          <Box
                            sx={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              px: 2,
                              py: 1
                            }}
                          >
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        </Scrollbar>
        <TablePagination
          component="div"
          count={itemsCount}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </div>
    </Card>
  );
};

export default FoodbankItemsListTable;