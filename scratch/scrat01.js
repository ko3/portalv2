import { Box, Stack, Typography } from '@mui/material';

export default function ViewApp() {
  const ex = 'hello';
  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={30} sx={{ maxWidth: 980 }}>
        <Typography sx={{ mt: 0.5 }} color="text.secondary" display="block" variant="caption">
            Member Email {ex}
        </Typography>
        <Typography sx={{ mt: 0.5 }} color="text.secondary" display="block" variant="caption">
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
    </Box>
  );
}
