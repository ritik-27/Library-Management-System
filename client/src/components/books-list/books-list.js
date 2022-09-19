import { useState, useEffect } from "react"
import { Link as RouterLink } from "react-router-dom"
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Modal,
    Card,
    CardContent,
    CardActions,
    Typography,
    TablePagination,
    IconButton,
} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { BackendApi } from "../../client/backend-api"
import { useUser } from "../../context/user-context"
import classes from "./styles.module.css"

export const BooksList = () => {
    const [books, setBooks] = useState([])
    const [borrowedBook, setBorrowedBook] = useState([])
    const [activeBookIsbn, setActiveBookIsbn] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const { isAdmin, user } = useUser()

    const fetchBooks = async () => {
        const { books } = await BackendApi.book.getAllBooks()
        setBooks(books)
    }

    const deleteBook = () => {
        if (activeBookIsbn && books.length) {
            BackendApi.book.deleteBook(activeBookIsbn).then(({ success }) => {
                fetchBooks().catch(console.error)
                setOpenModal(false)
                setActiveBookIsbn("")
            })
        }
    }

    const fetchUserBook = async () => {
        const { books } = await BackendApi.user.getBorrowBook()
        setBorrowedBook(books)
    }

    useEffect(() => {
        fetchBooks().catch(console.error)
        fetchUserBook().catch(console.error)
    }, [user])


    //For Table Styling(striped table)
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#6d7688',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 15,
        },
    }));
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    const SecStyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#1c2333',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 15,
        },
    }));

    const SecStyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));


    return (
        <>
            <div className={`${classes.pageHeader} ${classes.mb2}`}>
                <Typography variant="h5">Books List</Typography>
                {isAdmin && (
                    <Button variant="contained" style={{ 'backgroundColor': '#586277' }} component={RouterLink} to="/admin/books/add">
                        Add Book
                    </Button>
                )}
            </div>
            {books.length > 0 ? (
                <>
                    <div className={classes.tableContainer}>
                        <TableContainer component={Paper}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell align="right">ISBN</StyledTableCell>
                                        <StyledTableCell>Category</StyledTableCell>
                                        <StyledTableCell align="right">Quantity</StyledTableCell>
                                        <StyledTableCell align="right">Available</StyledTableCell>
                                        <StyledTableCell align="right">Price</StyledTableCell>
                                        <StyledTableCell></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : books
                                    ).map((book) => (
                                        <StyledTableRow key={book.isbn}>
                                            <StyledTableCell component="th" scope="row">
                                                {book.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{book.isbn}</StyledTableCell>
                                            <StyledTableCell>{book.category}</StyledTableCell>
                                            <StyledTableCell align="right">{book.quantity}</StyledTableCell>
                                            <StyledTableCell align="right">{book.availableQuantity}</StyledTableCell>
                                            <StyledTableCell align="right">{`₹${book.price}`}</StyledTableCell>
                                            <StyledTableCell>
                                                <div className={classes.actionsContainer}>
                                                    <Button
                                                        variant="contained"
                                                        component={RouterLink}
                                                        size="small"
                                                        to={`/books/${book.isbn}`}
                                                    >
                                                        View
                                                    </Button>
                                                    {isAdmin && (
                                                        <>
                                                            <Button
                                                                variant="outlined"
                                                                color="primary"
                                                                component={RouterLink}
                                                                size="small"
                                                                to={`/admin/books/${book.isbn}/edit`}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <IconButton>
                                                                <DeleteIcon color="error"
                                                                    size="small"
                                                                    onClick={(e) => {
                                                                        setActiveBookIsbn(book.isbn)
                                                                        setOpenModal(true)
                                                                    }} />
                                                            </IconButton>
                                                        </>
                                                    )}
                                                </div>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            onRowsPerPageChange={(e) => {
                                setRowsPerPage(parseInt(e.target.value, 10))
                                setPage(0)
                            }}
                            component="div"
                            count={books.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                        />
                    </div>
                    <Modal open={openModal} onClose={(e) => setOpenModal(false)}>
                        <Card className={classes.conf_modal}>
                            <CardContent>
                                <h2>Are you sure?</h2>
                            </CardContent>
                            <CardActions className={classes.conf_modal_actions}>
                                <Button variant="contained" onClick={() => setOpenModal(false)}>
                                    Cancel
                                </Button>
                                <Button variant="contained" color="error" onClick={deleteBook}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Modal>
                </>
            ) : (
                <Typography variant="h5">No books found!</Typography>
            )}
            {
                user && !isAdmin && (
                    <>
                        <div className={`${classes.pageHeader} ${classes.mb2}`}>
                            <Typography variant="h5">Borrowed Books</Typography>
                        </div>
                        {borrowedBook.length > 0 ? (
                            <>
                                <div className={classes.tableContainer}>
                                    <TableContainer component={Paper}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <SecStyledTableCell>Name</SecStyledTableCell>
                                                    <SecStyledTableCell align="right">ISBN</SecStyledTableCell>
                                                    <SecStyledTableCell>Category</SecStyledTableCell>
                                                    <SecStyledTableCell align="right">Price</SecStyledTableCell>
                                                    <SecStyledTableCell></SecStyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {borrowedBook.map((book) => (
                                                    <SecStyledTableRow key={book.isbn}>
                                                        <SecStyledTableCell component="th" scope="row">
                                                            {book.name}
                                                        </SecStyledTableCell>
                                                        <SecStyledTableCell align="right">{book.isbn}</SecStyledTableCell>
                                                        <SecStyledTableCell>{book.category}</SecStyledTableCell>
                                                        <SecStyledTableCell align="right">{`₹${book.price}`}</SecStyledTableCell>
                                                        <SecStyledTableCell>
                                                            <div className={classes.actionsContainer}>
                                                                <Button
                                                                    variant="contained"
                                                                    component={RouterLink}
                                                                    size="small"
                                                                    to={`/books/${book.isbn}`}
                                                                >
                                                                    View
                                                                </Button>
                                                            </div>
                                                        </SecStyledTableCell>
                                                    </SecStyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </>
                        ) : (
                            <Typography variant="h5">No books issued!</Typography>
                        )}
                    </>
                )
            }
        </>
    )
}