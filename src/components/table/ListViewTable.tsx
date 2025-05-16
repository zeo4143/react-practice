import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import React from 'react';
import Actions, { ActionCellProps } from '../common/Actions';
import { Columns } from '../../models/interfaces';
import Loader from '../common/Loader';

interface PaginationProps {
    rowsPerPageOptions?: number[];
    count: number;
    rowsPerPage: number;
    page: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

type RequiredPaginationProps = { showPagination: true } & PaginationProps;
type OptionalPaginationProps = { showPagination?: false }

interface ListViewTableProps {
    title: string;
    columns: Columns[];
    rows: any[];
    children?: React.ReactNode;
    renderActions?: (row: any) => ActionCellProps;
    paginationProps?: RequiredPaginationProps | OptionalPaginationProps;
}

const ListViewTable: React.FC<ListViewTableProps> = (
    { title, columns, rows, children, renderActions, paginationProps }) => {

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h5" gutterBottom align="left">
                    {title}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                    {children}
                </Box>
            </Box>

            <TableContainer sx={{ maxHeight: '85%' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell key={col.key}>
                                    <strong>{col.label}</strong>
                                </TableCell>
                            ))}
                            {renderActions && (
                                <TableCell key="actions-cell">
                                    <strong>Actions</strong>
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, idx) => (
                            <TableRow key={idx} hover>
                                {columns.map((col) => (
                                    <TableCell key={col.key}>
                                        {col.customColumn ? col.customColumn(row[col.key], rows, row) : row[col.key]}
                                    </TableCell>
                                ))}
                                {renderActions && (
                                    <TableCell key="actions-cell">
                                        <Actions {...renderActions(row)} />
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {paginationProps && paginationProps.showPagination && (
                <TablePagination
                    rowsPerPageOptions={paginationProps.rowsPerPageOptions}
                    component="div"
                    count={paginationProps.count}
                    rowsPerPage={paginationProps.rowsPerPage}
                    page={paginationProps.page}
                    onPageChange={paginationProps.onPageChange}
                    onRowsPerPageChange={paginationProps.onRowsPerPageChange}
                />
            )}
        </>
    );
};

export default ListViewTable;
