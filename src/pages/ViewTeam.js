import React from 'react';
// material
import { Card, Stack, Container, Typography, Box } from '@mui/material';
// components
import Page from '../components/Page';

export default function AddTeam() {
  const teamName = 'spartans';
  const description = '300 alone fought big army in movie';
  const members = [
    {
      email: 'memberone@email.com',
      role: 'Owner'
    },
    {
      email: 'membertwo@email.com',
      role: 'AppAdmin'
    },
    {
      email: 'memberthree@email.com',
      role: 'Viewer'
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
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={30} sx={{ maxWidth: 980 }}>
                  <Typography
                    sx={{ mt: 0.5 }}
                    color="text.secondary"
                    display="block"
                    variant="caption"
                  >
                    Member Email
                  </Typography>
                  <Typography
                    sx={{ mt: 0.5 }}
                    color="text.secondary"
                    display="block"
                    variant="caption"
                  >
                    Role
                  </Typography>
                </Stack>
                {members.map((member, index) => (
                  <Stack
                    key={index}
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={30}
                    sx={{ maxWidth: 980 }}
                  >
                    <Typography>{member.email}</Typography>
                    <Typography>{member.role}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Container>
        </Card>
      </Container>
    </Page>
  );
}
