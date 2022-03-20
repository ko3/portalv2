import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Box,
  styled,
  InputLabel,
  Select,
  MenuItem,
  FormControl
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

  const formik = useFormik({
    initialValues: {
      teamName: '',
      description: '',
      memberEmail: '',
      role: 'Owner',
      members: [
        {
          memberEmail: '',
          role: 'Owner'
        }
      ]
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Page title="Teams | Portal">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Team
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Team
          </Button>
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
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ maxWidth: 980 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    {...getFieldProps('memberEmail')}
                    error={Boolean(touched.memberEmail && errors.memberEmail)}
                    helperText={touched.memberEmail && errors.memberEmail}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select
                      labelId="role-select-label"
                      id="role-select"
                      fullWidth
                      label="Role"
                      {...getFieldProps('role')}
                      error={Boolean(touched.role && errors.role)}
                      helperText={touched.role && errors.role}
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
                </Stack>
                <Button
                  sx={{ maxWidth: 150 }}
                  variant="contained"
                  component={RouterLink}
                  to="#"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                >
                  Add Member
                </Button>
              </Stack>
            </Box>
          </Container>
        </Card>
      </Container>
    </Page>
  );
}
