'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
    SortingState,
} from '@tanstack/react-table';
import Footer from '../footer';
import Header from '../header';

interface Part {
    id: string;
    name: string;
    category: string;
    brand: string;
    model: string;
    year: string;
    price: number;
    stock: number;
    sku: string;
}

const parts: Part[] = [
    {
        id: '1',
        name: 'Brake Pad Set',
        category: 'Brakes',
        brand: 'Toyota',
        model: 'Camry',
        year: '2018-2023',
        price: 89.99,
        stock: 45,
        sku: 'BP-TOY-CAM-18',
    },
    {
        id: '2',
        name: 'Oil Filter',
        category: 'Filters',
        brand: 'Honda',
        model: 'Civic',
        year: '2016-2023',
        price: 12.99,
        stock: 120,
        sku: 'OF-HON-CIV-16',
    },
    {
        id: '3',
        name: 'Spark Plug Set',
        category: 'Engine',
        brand: 'Ford',
        model: 'F-150',
        year: '2015-2023',
        price: 45.99,
        stock: 80,
        sku: 'SP-FOR-F15-15',
    },
    {
        id: '4',
        name: 'Air Filter',
        category: 'Filters',
        brand: 'BMW',
        model: '3 Series',
        year: '2019-2023',
        price: 29.99,
        stock: 65,
        sku: 'AF-BMW-3SR-19',
    },
    {
        id: '5',
        name: 'Alternator',
        category: 'Electrical',
        brand: 'Mercedes',
        model: 'C-Class',
        year: '2017-2023',
        price: 299.99,
        stock: 15,
        sku: 'AL-MER-CCL-17',
    },
];

export default function Catalog() {
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<SortingState>([]);

    const columns: ColumnDef<Part>[] = useMemo(
        () => [
            {
                accessorKey: 'sku',
                header: ({ column }) => {
                    return (
                        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            SKU
                            <ArrowUpDown className='ml-2 h-4 w-4' />
                        </Button>
                    );
                },
                cell: ({ row }) => <span className='font-mono'>{row.getValue('sku')}</span>,
            },
            {
                accessorKey: 'name',
                header: ({ column }) => {
                    return (
                        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            Name
                            <ArrowUpDown className='ml-2 h-4 w-4' />
                        </Button>
                    );
                },
            },
            {
                accessorKey: 'category',
                header: ({ column }) => {
                    return (
                        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            Category
                            <ArrowUpDown className='ml-2 h-4 w-4' />
                        </Button>
                    );
                },
            },
            {
                accessorKey: 'brand',
                header: ({ column }) => {
                    return (
                        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            Brand
                            <ArrowUpDown className='ml-2 h-4 w-4' />
                        </Button>
                    );
                },
            },
            {
                accessorKey: 'model',
                header: ({ column }) => {
                    return (
                        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            Model
                            <ArrowUpDown className='ml-2 h-4 w-4' />
                        </Button>
                    );
                },
            },
            {
                accessorKey: 'year',
                header: ({ column }) => {
                    return (
                        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            Year Range
                            <ArrowUpDown className='ml-2 h-4 w-4' />
                        </Button>
                    );
                },
            },
            {
                accessorKey: 'price',
                header: ({ column }) => {
                    return (
                        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            Price
                            <ArrowUpDown className='ml-2 h-4 w-4' />
                        </Button>
                    );
                },
                cell: ({ row }) => {
                    const price = parseFloat(row.getValue('price'));
                    return <span>${price.toFixed(2)}</span>;
                },
            },
            {
                accessorKey: 'stock',
                header: ({ column }) => {
                    return (
                        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            Stock
                            <ArrowUpDown className='ml-2 h-4 w-4' />
                        </Button>
                    );
                },
                cell: ({ row }) => {
                    const stock = parseInt(row.getValue('stock'));
                    return (
                        <span
                            className={`px-2 py-1 rounded text-sm ${
                                stock > 50
                                    ? 'bg-green-100 text-green-800'
                                    : stock > 20
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                            }`}
                        >
                            {stock}
                        </span>
                    );
                },
            },
        ],
        []
    );

    const table = useReactTable({
        data: parts,
        columns,
        state: {
            sorting,
            globalFilter,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <main className='min-h-screen bg-gray-50'>
            <Header />
            <div className='container mx-auto px-4 py-24'>
                <h1 className='text-3xl font-bold mb-8'>Auto Parts Catalog</h1>

                <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
                    <div className='relative mb-6'>
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        <Input
                            type='text'
                            placeholder='Search by part name, category, brand, model, year, or SKU...'
                            value={globalFilter ?? ''}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className='pl-10'
                        />
                    </div>

                    <div className='overflow-x-auto'>
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className='h-24 text-center'>
                                            No results found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
