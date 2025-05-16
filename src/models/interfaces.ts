import { ReactNode } from 'react';

export interface Columns {
    key: string;
    label: string;
    customColumn?: (value: any, rows: any, row: any) => ReactNode;
}