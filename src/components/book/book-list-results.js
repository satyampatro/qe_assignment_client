import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';

export const BookListResults = ({ books, ...rest }) => {
  const [selectedbookIds, setSelectedbookIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedbookIds;

    if (event.target.checked) {
      newSelectedbookIds = books.map((book) => book.id);
    } else {
      newSelectedbookIds = [];
    }

    setSelectedbookIds(newSelectedbookIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedbookIds.indexOf(id);
    let newSelectedbookIds = [];

    if (selectedIndex === -1) {
      newSelectedbookIds = newSelectedbookIds.concat(selectedbookIds, id);
    } else if (selectedIndex === 0) {
      newSelectedbookIds = newSelectedbookIds.concat(selectedbookIds.slice(1));
    } else if (selectedIndex === selectedbookIds.length - 1) {
      newSelectedbookIds = newSelectedbookIds.concat(selectedbookIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedbookIds = newSelectedbookIds.concat(
        selectedbookIds.slice(0, selectedIndex),
        selectedbookIds.slice(selectedIndex + 1)
      );
    }

    setSelectedbookIds(newSelectedbookIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedbookIds.length === books.length}
                    color="primary"
                    indeterminate={
                      selectedbookIds.length > 0
                      && selectedbookIds.length < books.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Registration date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.slice(0, limit).map((book) => (
                <TableRow
                  hover
                  key={book.id}
                  selected={selectedbookIds.indexOf(book.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedbookIds.indexOf(book.id) !== -1}
                      onChange={(event) => handleSelectOne(event, book.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={book.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(book.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {book.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {book.email}
                  </TableCell>
                  <TableCell>
                    {`${book.address.city}, ${book.address.state}, ${book.address.country}`}
                  </TableCell>
                  <TableCell>
                    {book.phone}
                  </TableCell>
                  <TableCell>
                    {format(book.createdAt, 'dd/MM/yyyy')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={books.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

BookListResults.propTypes = {
  books: PropTypes.array.isRequired
};
