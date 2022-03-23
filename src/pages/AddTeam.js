import React from 'react';
import * as Yup from 'yup';
import { useFormik, getIn } from 'formik';
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
  IconButton
} from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';

const ROLES = [
  {
    value: 'Owner',
    label: 'Owner'
  },
  {
    value: 'App_Admin',
    label: 'App Admin'
  },
  {
    value: 'Viewer',
    label: 'Viewer'
  }
];
export default function AddTeam() {
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
    teamName: '',
    description: '',
    memberEmail: '',
    role: '',
    members: [
      {
        memberEmail: '',
        role: ''
      },
      {
        memberEmail: 'tewoxsf',
        role: ''
      },
      {
        memberEmail: 'thecdreews',
        role: ''
      }
    ]
  };
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setFieldValue,
    resetForm,
    setValues
  } = formik;

  const onRemoveMember = (index) => {
    const members = getFieldProps('members').value.filter((el, i) => i !== index);
    if (members.length > 0) setFieldValue('members', members, true);
  };
  const onAddMember = () => {
    const members = getFieldProps('members').value;
    members.push({
      memberEmail: '',
      role: ''
    });
    setFieldValue('members', members, true);
  };

  const onReset = () => {
    setValues(initialState, true);
  };

  const onSave = () => {
    console.log('saved');
  };

  return (
    <Page title="Add Team | Portal">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Team
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
                    label="Team Name"
                    {...getFieldProps('teamName')}
                    error={Boolean(touched.teamName && errors.teamName)}
                    helperText={touched.teamName && errors.teamName}
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
                {getFieldProps('members').value.map((element, index) => (
                  <Stack
                    key={index}
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    sx={{ maxWidth: 980 }}
                  >
                    <TextField
                      fullWidth
                      label="Email Address"
                      {...getFieldProps(`members[${index}].memberEmail`)}
                      error={Boolean(
                        getIn(touched, `members[${index}].memberEmail`) &&
                          getIn(errors, `members[${index}].memberEmail`)
                      )}
                      helperText={
                        getIn(touched, `members[${index}].memberEmail`) &&
                        getIn(errors, `members[${index}].memberEmail`)
                      }
                    />
                    <FormControl fullWidth>
                      <InputLabel id="role-select-label">Role</InputLabel>
                      <Select
                        labelId="role-select-label"
                        id="role-select"
                        fullWidth
                        label="Role"
                        {...getFieldProps(`members[${index}].role`)}
                        error={Boolean(
                          getIn(touched, `members[${index}].role`) &&
                            getIn(errors, `members[${index}].role`)
                        )}
                      >
                        {ROLES.map((row) => {
                          const { label, value } = row;
                          return (
                            <MenuItem key={value} value={value}>
                              {label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      sx={{ alignItems: 'center' }}
                      onClick={() => {
                        onRemoveMember(index);
                      }}
                    >
                      <Iconify icon="eva:trash-2-outline" />
                    </IconButton>
                  </Stack>
                ))}
                <Button
                  sx={{ maxWidth: 150 }}
                  variant="contained"
                  component={RouterLink}
                  to="#"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={() => {
                    onAddMember();
                  }}
                >
                  Add Member
                </Button>
              </Stack>
            </Box>
            <Box sx={{ m: 5 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ maxWidth: 980 }}>
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
    </Page>
  );
}
