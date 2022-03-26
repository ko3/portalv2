import React, { useState } from 'react';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
// material
import {
  Card,
  Stack,
  Container,
  Typography,
  Box,
  Table,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { ProductsListHeadView, ProductsListToolbar } from '../sections/@dashboard/products';
//
import PRODUCTS from '../_mocks_/products';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'productid', label: 'Product Id', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ViewApp() {
  const [products, setProducts] = useState(PRODUCTS);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const filteredProducts = applySortFilter(products, getComparator(order, orderBy), filterName);

  const isProductNotFound = products.length > 0 && filteredProducts.length === 0;
  const appName = 'dummy App name';
  const description = 'hello this is description here';
  const owner = 'Yes this is owner of the app';

  return (
    <Page title="App View | Portal">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            App View
          </Typography>
        </Stack>
        <Card>
          <Container>
            <Box sx={{ m: 5 }}>
              <Stack spacing={2}>
                <Typography sx={{ color: 'text.secondary' }}>Overview</Typography>
                <Stack spacing={2} sx={{ maxWidth: 480 }}>
                  <Typography
                    sx={{ mt: 0.5 }}
                    color="text.secondary"
                    display="block"
                    variant="caption"
                  >
                    AppName
                  </Typography>
                  <Typography>{appName}</Typography>
                  <Typography
                    sx={{ mt: 0.5 }}
                    color="text.secondary"
                    display="block"
                    variant="caption"
                  >
                    Description
                  </Typography>
                  <Typography>{description}</Typography>
                </Stack>
                <Stack spacing={2} sx={{ maxWidth: 480 }}>
                  <Typography
                    sx={{ mt: 0.5 }}
                    color="text.secondary"
                    display="block"
                    variant="caption"
                  >
                    Owner
                  </Typography>
                  <Typography>{owner}</Typography>
                </Stack>
                <Stack>
                  <Typography sx={{ color: 'text.secondary', mb: 2 }}>Products</Typography>
                  <Card>
                    <ProductsListToolbar
                      numSelected={0}
                      filterName={filterName}
                      onFilterName={handleFilterByName}
                    />

                    <Scrollbar>
                      <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                          <ProductsListHeadView
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            rowCount={products.length}
                            numSelected={products.length}
                            onRequestSort={handleRequestSort}
                          />
                          <TableBody>
                            {products
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row) => {
                                const { id, name, cover, description, approval } = row;
                                return (
                                  <TableRow hover key={id} tabIndex={-1} role="checkbox">
                                    <TableCell component="th" scope="row" padding="none">
                                      <Stack direction="row" alignItems="center" spacing={2}>
                                        <Avatar alt={name} src={cover} />
                                        <Typography variant="subtitle2" noWrap>
                                          {name}
                                        </Typography>
                                      </Stack>
                                    </TableCell>
                                    <TableCell align="left">{description}</TableCell>
                                    <TableCell align="left">
                                      <Label
                                        variant="ghost"
                                        color={
                                          (approval === 'revoked' && 'error') ||
                                          (approval === 'pending' && 'warning') ||
                                          'success'
                                        }
                                      >
                                        {sentenceCase(approval)}
                                      </Label>
                                    </TableCell>
                                    <TableCell align="left">{id}</TableCell>
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                          {isProductNotFound && (
                            <TableBody>
                              <TableRow>
                                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                  <SearchNotFound searchQuery={filterName} />
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          )}
                        </Table>
                      </TableContainer>
                    </Scrollbar>

                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={products.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Card>
                </Stack>
              </Stack>
            </Box>
          </Container>
        </Card>
      </Container>
    </Page>
  );
}
