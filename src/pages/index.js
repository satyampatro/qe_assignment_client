import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { BookListResults } from '../components/book/book-list-results';
import { BookListToolbar } from '../components/book/book-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';

const Page = () => (
  <>
    <Head>
      <title>
        Books
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <BookListToolbar />
        <Box sx={{ mt: 3 }}>
          <BookListResults books={[]} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
