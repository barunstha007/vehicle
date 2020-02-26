import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
// Custom
import Moment from 'react-moment'
import DateTimePicker from 'react-datetime-picker'
//Redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { getQueue, acceptQueue } from '../../redux/actions/booking'
import store from '../../redux/store'
import Alert from '../../layout/Alert'
import moment from 'moment';

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
    { id: 'Avatar', disablePadding: false, label: 'Avatar' },
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
                </TableCell>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
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
    const { numSelected, selected, acceptQueue, setSelected } = props;

    const onAccept = selectArr => {
        acceptQueue(selected)

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
                    {numSelected} selected
        </Typography>
            ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle">
                        Vehicles In Queue
        </Typography>
                )}

            {numSelected > 0 ? (
                <React.Fragment>
                    <button
                        className="btn btn-success btn-lg mr-2"
                        onClick={() => onAccept(selected)}>
                        Add
                    </button>
                    {/* <Tooltip title="Servicing">
                        <button className="btn btn-danger btn-lg">
                            Remove
                    </button>
                    </Tooltip> */}
                </React.Fragment>
            ) : null}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    selected: PropTypes.array.isRequired,
    setSelected: PropTypes.func.isRequired,
    acceptQueue: PropTypes.func.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
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

// Main function
function EnhancedTable(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = props.queueDetails.map(n => n.name);
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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.queueDetails.length - page * rowsPerPage);



    //---------------- Custom ----------------

    useEffect(() => {
        props.getQueue()
    }, [])


    // change date of queued users
    const dateChange = index => e => {
        store.dispatch({
            type: 'CHANGESERVICINGDATE',
            index: index,
            date: e
        })
    }

    // checkbox
    const isSelected = bikeID => selected.indexOf(bikeID) !== -1;

    return (
        <div className={classes.root}>
            <Alert />
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} selected={selected} setSelected={setSelected} acceptQueue={props.acceptQueue} />
                <TableContainer>
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
                            rowCount={props.queueDetails.length}
                        />
                        <TableBody>
                            {stableSort(props.queueDetails, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.bike._id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row._id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox" onClick={event => handleClick(event, row.bike._id)}>
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none"
                                                onClick={event => handleClick(event, row.bike._id)}>
                                                <b>{row.bike.bikeNumber}</b>
                                            </TableCell>
                                            <TableCell onClick={event => handleClick(event, row.bike._id)}>
                                                <Moment format="MM/D/YYYY, hh:mm" >
                                                    {row.bookingDate}
                                                </Moment>
                                            </TableCell>
                                            <TableCell >
                                                <DateTimePicker
                                                    minDate={moment().toDate()}
                                                    onChange={dateChange(index)}
                                                    value={row.servicingDate}
                                                /></TableCell>
                                            <TableCell onClick={event => handleClick(event, row.bike._id)}><img src={row.bike.user.avatar} style={{ height: '40px' }} /></TableCell>
                                            <TableCell onClick={event => handleClick(event, row.bike._id)}>{row.bike.user.name}</TableCell>
                                            <TableCell onClick={event => handleClick(event, row.bike._id)}>{row.bike.user.phone}</TableCell>
                                            <TableCell onClick={event => handleClick(event, row.bike._id)}>{row.bike.user.location}</TableCell>
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
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.queueDetails.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
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
    queueDetails: state.booking.queueDetails,
    loading: state.booking.loading,

})

export default connect(mapStateToProps,
    {
        getQueue, acceptQueue
    })(EnhancedTable)