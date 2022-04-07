import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Card, Stack, Container, Typography, Box, Button } from '@mui/material';
// components
import Page from '../components/Page';
import { TableView } from '../sections/@dashboard/view';
import Iconify from '../components/Iconify';

const TABLE_HEAD = [
  { id: 'name', label: 'Member Email', alignRight: false },
  { id: 'role', label: 'role', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'memberid', label: 'Member Id', alignRight: false }
];
export default function AddTeam() {
  const teamName = 'spartans';
  const description = '300 alone fought big army in movie';
  const members = [
    {
      name: 'memberone@email.com',
      description: 'Owner',
      approval: 'approved',
      id: '98fhg49r2g9g498'
    },
    {
      name: 'membertwo@email.com',
      description: 'AppAdmin',
      approval: 'approved',
      id: '98fhg49r2g9g498'
    },
    {
      name: 'memberthree@email.com',
      description: 'Viewer',
      approval: 'approved',
      id: '98fhg49r2g9g498'
    }
  ];

  const onEdit = () => {
    console.log('Edited, navigate to edit page');
  };

  const onDelete = () => {
    console.log('deleted');
  };

  return (
    <Page title="View Team | Portal">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          padding={2}
        >
          <Stack>
            <Typography variant="h4" gutterBottom>
              View Team
            </Typography>
          </Stack>
          <Stack direction="row" spacing={5}>
            <Button
              sx={{ maxWidth: 250 }}
              variant="contained"
              component={RouterLink}
              to="#"
              startIcon={<Iconify icon="eva:edit-2-fill" />}
              onClick={() => {
                onEdit();
              }}
            >
              Edit
            </Button>
            <Button
              sx={{ maxWidth: 250 }}
              variant="contained"
              component={RouterLink}
              to="#"
              startIcon={<Iconify icon="eva:trash-fill" />}
              onClick={() => {
                onDelete();
              }}
            >
              Delete
            </Button>
          </Stack>
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
                    Team Name
                  </Typography>
                  <Typography>{teamName}</Typography>

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
                <Typography sx={{ color: 'text.secondary' }}>Members</Typography>
                <TableView headLabel={TABLE_HEAD} rows={members} />
              </Stack>
            </Box>
          </Container>
        </Card>
      </Container>
    </Page>
  );
}
