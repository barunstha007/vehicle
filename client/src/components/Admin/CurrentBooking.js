import React, { useState, useEffect } from 'react';
import axios from 'axios'
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// Redux
import PropTypes from 'prop-types';
import { getAcceptedBooking, reQueue } from '../../redux/actions/booking';
import Alert from '../../layout/Alert'
import { connect } from 'react-redux';
import Moment from 'react-moment';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

// const rows = [
//     createData('BA 60 PA 3080', '11-21-2019', 'Pranav', 9818505260, 'Rs.15000'),
//     createData('BA 61 PA 1234', '11-22-2019', 'Bishnu', 9818260505, 'Rs.15000'),
//     createData('BA 62 PA 1234', '11-23-2019', 'Ravi', 9841787169, 'Rs.15000'),
//     createData('BA 63 PA 1243', '11-23-2019', 'Raju', 9800330021, 'Rs.15000'),
//     createData('BA 64 PA 1243', '11-23-2019', 'Romeo', 9849026656, 'Rs.15000'),
//     createData('BA 65 PA 1243', '11-23-2019', 'Pawan', 9849059770, 'Rs.15000'),
//     createData('BA 66 PA 1243', '11-23-2019', 'Shilu', 9818505260, 'Rs.15000'),
//     createData('BA 67 PA 1243', '11-23-2019', 'Jeet', 9818505260, 'Rs.15000'),
//     createData('BA 68 PA 1243', '11-23-2019', 'Barun', 9818505260, 'Rs.15000'),
//     createData('BA 69 PA 1243', '11-23-2019', 'Arun', 9818505260, 'Rs.15000'),
//     createData('BA 60 PA 1243', '11-23-2019', 'James', 9818505260, 'Rs.15000'),
//     createData('BA 71 PA 1243', '11-23-2019', 'Hari', 9818505260, 'Rs.15000'),
//     createData('BA 72 PA 1243', '11-23-2019', 'Girija', 9818505260, 'Rs.15000'),
// ];


function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

// table Headings
const headCells = [
    { id: 'vehicleNumber', disablePadding: true, label: 'Vehicle Numbers' },
    { id: 'bookingDate', disablePadding: false, label: 'Booking Date' },
    { id: 'checkinDate', disablePadding: false, label: 'Servicing Date' },
    { id: 'name', disablePadding: false, label: 'Name' },
    { id: 'phone', disablePadding: false, label: 'Phone' },
    { id: 'location', disablePadding: false, label: 'Location' },
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    {/* <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    /> */}
                </TableCell>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        // align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={order}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const { numSelected, selected, setSelected, reQueue } = props;

    const onRequeue = selectArr => {
        reQueue(selected)
        // console.log(selected)

        // empty checkbox
        setSelected([]);


    }

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1">
                    {numSelected} completed
        </Typography>
            ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle">
                        Current Servicing
        </Typography>
                )}

            {/* ``Completed`` Button */}
            {numSelected > 0 ? (
                <React.Fragment>
                    <button className="btn btn-success btn-lg">Completed</button>
                    <button className="btn btn-primary btn-lg ml-1" onClick={() => onRequeue(selected)}>Queue</button>
                </React.Fragment>
            ) : null}

        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    selected: PropTypes.array.isRequired,
    setSelected: PropTypes.func.isRequired,
    reQueue: PropTypes.func.isRequired,

};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        // marginTop: theme.spacing(3),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

// Main Function
function EnhancedTable(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = props.acceptedBooking.map(n => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = event => {
        setDense(event.target.checked);
    };

    // checkbox
    const isSelected = bikeID => selected.indexOf(bikeID) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.acceptedBooking.length - page * rowsPerPage);


    // ------Custom Code -----------

    useEffect(() => {
        props.getAcceptedBooking()
    }, [])

    return (
        <div className={classes.root}>
            <Alert />
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} selected={selected} setSelected={setSelected} reQueue={props.reQueue} />
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={props.acceptedBooking.length}
                        />
                        <TableBody>
                            {stableSort(props.acceptedBooking, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.bike._id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => handleClick(event, row.bike._id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row._id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                <b>{row.bike.bikeNumber}</b>
                                            </TableCell>
                                            <TableCell >
                                                <Moment format="MM/D/YYYY, hh:mm">
                                                    {row.bookingDate}
                                                </Moment>
                                            </TableCell>
                                            <TableCell >
                                                <Moment format="MM/D/YYYY, hh:mm">
                                                    {row.servicingDate}
                                                </Moment>
                                            </TableCell>
                                            <TableCell >{row.bike.user.name}</TableCell>
                                            <TableCell >{row.bike.user.phone}</TableCell>
                                            <TableCell >{row.bike.user.location}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.acceptedBooking.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </div>
    );
}

const mapStateToProps = state => ({
    acceptedBooking: state.booking.acceptedBooking
})

export default connect(mapStateToProps, {
    getAcceptedBooking, reQueue
})(EnhancedTable)