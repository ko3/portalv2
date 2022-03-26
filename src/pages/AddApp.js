import React, { useState } from 'react';
import { filter } from 'lodash';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { sentenceCase } from 'change-case';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  TextField,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Table,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Tooltip,
  IconButton
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import {
  ProductSort,
  ProductList,
  ProductFilterSidebar,
  ProductsListHead,
  ProductsListToolbar
} from '../sections/@dashboard/products';
//
import TEAMS from '../_mocks_/teams';
import PRODUCTS from '../_mocks_/products';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false }
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

export default function AddApp() {
  const [openFilter, setOpenFilter] = useState(false);
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    teamName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Team name required'),
    description: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Description required'),
    members: Yup.array()
      .min(1)
      .of(
        Yup.object().shape({
          memberEmail: Yup.string()
            .email('Email must be a valid email address')
            .required('member email is required'),
          role: Yup.string()
            .matches(/(Owner|App Admin|Viewer)/)
            .required('One of the role should be selected')
        })
      )
      .required('members are required')
  });

  const initialState = {
    appName: '',
    description: '',
    owner: '',
    gender: '',
    category: '',
    colors: '',
    priceRange: '',
    rating: ''
  };
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: RegisterSchema,
    onSubmit: () => {
      setOpenFilter(false);
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, handleSubmit, getFieldProps, resetForm, setValues } = formik;

  const onReset = () => {
    setValues(initialState, true);
  };

  const onSave = () => {
    console.log('saved');
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  const [products, setProducts] = useState(PRODUCTS);
  const [selectProducts, setSelectProducts] = useState([]);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = selectProducts.map((n) => n.name);
      console.log(newSelecteds);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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

  const onDelete = (event, rmproduct, index) => {
    setSelectProducts(selectProducts.filter((product) => product.id !== rmproduct.id));
    products
      .filter((product) => product.id === rmproduct.id)
      .forEach((product) => (product.checked = false));
  };

  const toggleSelect = (event, product, index) => {
    if (event.target.checked) {
      products[index].checked = true;
      setSelectProducts((selectProducts) => [...selectProducts, product]);
    } else {
      products[index].checked = false;
      setSelectProducts(
        selectProducts.filter((selectedProduct) => selectedProduct.id !== product.id)
      );
    }
  };

  const removeChecked = () => {
    setSelectProducts(selectProducts.filter((prdct) => selected.indexOf(prdct.id) < 0));
    setSelected([]);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - selectProducts.length) : 0;

  const filteredProducts = applySortFilter(
    selectProducts,
    getComparator(order, orderBy),
    filterName
  );

  const isProductNotFound = selectProducts.length > 0 && filteredProducts.length === 0;

  return (
    <Page title="Add App | Portal">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New App
          </Typography>
        </Stack>
        <Card>
          <Container>
            <Box sx={{ m: 5 }}>
              <Stack spacing={2}>
                <Typography sx={{ color: 'text.secondary' }}>Overview</Typography>
                <Stack spacing={2} sx={{ maxWidth: 480 }}>
                  <TextField
                    fullWidth
                    label="App Name"
                    {...getFieldProps('appName')}
                    error={Boolean(touched.appName && errors.appName)}
                    helperText={touched.appName && errors.appName}
                  />

                  <TextField
                    fullWidth
                    label="Description"
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Stack>
                <Typography sx={{ color: 'text.secondary' }}>Members</Typography>
                <Stack spacing={2} sx={{ maxWidth: 480 }}>
                  <FormControl fullWidth>
                    <InputLabel id="owner-select-label">Owner</InputLabel>
                    <Select
                      labelId="owner-select-label"
                      id="owner-select"
                      fullWidth
                      label="Owner"
                      {...getFieldProps('owner')}
                      error={Boolean(touched.owner && errors.owner)}
                    >
                      {TEAMS.map((row, index) => {
                        const { id, teamname, company, domain } = row;
                        return (
                          <MenuItem key={index} value={id}>
                            {teamname}, {company} - {domain}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Stack>
                <Stack>
                  <Card>
                    <ProductsListToolbar
                      numSelected={selected.length}
                      filterName={filterName}
                      onFilterName={handleFilterByName}
                      removeChecked={removeChecked}
                    />

                    <Scrollbar>
                      <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                          <ProductsListHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            rowCount={selectProducts.length}
                            numSelected={selected.length}
                            onRequestSort={handleRequestSort}
                            onSelectAllClick={handleSelectAllClick}
                          />
                          <TableBody>
                            {selectProducts
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, index) => {
                                const { id, name, cover, description, approval } = row;
                                const isItemSelected = selected.indexOf(id) !== -1;
                                return (
                                  <TableRow
                                    hover
                                    key={id}
                                    tabIndex={-1}
                                    role="checkbox"
                                    selected={isItemSelected}
                                    aria-checked={isItemSelected}
                                  >
                                    <TableCell padding="checkbox">
                                      <Checkbox
                                        checked={isItemSelected}
                                        onChange={(event) => handleClick(event, id)}
                                      />
                                    </TableCell>
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
                                    <TableCell align="left">
                                      <Tooltip title="Delete">
                                        <IconButton
                                          onClick={(event) => onDelete(event, row, index)}
                                        >
                                          <Iconify icon="eva:trash-2-fill" />
                                        </IconButton>
                                      </Tooltip>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            {emptyRows > 0 && (
                              <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
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
                      count={selectProducts.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Card>
                </Stack>
              </Stack>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ mt: 5, maxWidth: 980 }}
              >
                <Button
                  sx={{ maxWidth: 250 }}
                  variant="contained"
                  component={RouterLink}
                  to="#"
                  startIcon={<Iconify icon="eva:trash-fill" />}
                  onClick={() => {
                    onReset();
                  }}
                >
                  Reset
                </Button>
                <Button
                  sx={{ maxWidth: 250 }}
                  variant="contained"
                  component={RouterLink}
                  to="#"
                  startIcon={<Iconify icon="eva:save-fill" />}
                  onClick={() => {
                    onSave();
                  }}
                >
                  Save
                </Button>
              </Stack>
            </Box>
          </Container>
        </Card>
      </Container>
      <Container sx={{ m: 5 }}>
        <Typography variant="h4">Products</Typography>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
        <ProductList products={products} toggleSelect={toggleSelect} />
      </Container>
    </Page>
  );
}
