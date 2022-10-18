import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AuthGuard } from './auth-guard';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
}));

export const DashboardLayout = (props) => {
  const { children } = props;

  return (
    <AuthGuard>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
    </AuthGuard>
  );
};
