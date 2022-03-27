import React from 'react';
// material
import { Card, Stack, Container, Typography, Box } from '@mui/material';
// components
import Page from '../components/Page';
import { TableView } from '../sections/@dashboard/view';

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
  return (
    <Page title="View Team | Portal">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            View Team
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
