import React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Divider,
    Box,
} from '@mui/material';

type RowData = Record<string, any>;

interface DataTableProps {
    data: RowData[];
    columns: { key: string; label: string }[];
    groupBy?: string;
    title?: string;
}

const GroupAndListViewTable: React.FC<DataTableProps> = ({ data, columns, groupBy, title }) => {
    // Group data if groupBy is defined
    const groupedData = groupBy
        ? data.reduce((acc: Record<string, RowData[]>, item) => {
            const groupKey = item[groupBy];
            if (!acc[groupKey]) acc[groupKey] = [];
            acc[groupKey].push(item);
            return acc;
        }, {})
        : { all: data };

    return (
        <Box>
            {title && (
                <Typography variant="h5" align="center" gutterBottom>
                    {title}
                </Typography>
            )}

            {Object.entries(groupedData).map(([groupKey, groupRows]) => (
                <Paper key={groupKey} elevation={3} sx={{ marginBottom: 4, padding: 2 }}>
                    {groupBy && (
                        <>
              <Typography variant="h6" color="primary" gutterBottom>
                {groupBy}: {groupKey}
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </>
                    )}

                    <TableContainer>
                        <Table size="small">
                            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableRow>
                                    {columns.map((col) => (
                                        <TableCell key={col.key}>
                                            <strong>{col.label}</strong>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {groupRows.map((row, idx) => (
                                    <TableRow key={idx} hover>
                                        {columns.map((col) => (
                                            <TableCell key={col.key}>{row[col.key]}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            ))}
        </Box>
    );
};

export default GroupAndListViewTable;
