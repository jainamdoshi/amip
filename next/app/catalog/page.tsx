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
import Image from 'next/image';

interface Product {
    product_name: string;
    product_number: string;
    product_description: string;
    jinku_product_id: string;
    owner: string;
    specifications: string[];
    product_image: string;
}

const products: Product[] = [
    {
        product_name: 'High Performance Brake Pad',
        product_number: 'BP-2023-001',
        product_description: 'Premium ceramic brake pads for superior stopping power',
        jinku_product_id: 'JK-001',
        owner: 'ATCO Parts',
        specifications: ['Ceramic compound', 'Dust-free', 'Temperature resistant'],
        product_image: '#',
    },
    {
        product_name: 'Engine Oil Filter',
        product_number: 'OF-2023-002',
        product_description: 'Advanced filtration oil filter for maximum engine protection',
        jinku_product_id: 'JK-002',
        owner: 'ATCO Parts',
        specifications: ['99% filtration efficiency', 'Extended life', 'Universal fit'],
        product_image: '#',
    },
    {
        product_name: 'Spark Plug Set',
        product_number: 'SP-2023-003',
        product_description: 'High-performance iridium spark plugs',
        jinku_product_id: 'JK-003',
        owner: 'ATCO Parts',
        specifications: ['Iridium tip', 'Pre-gapped', 'Extended lifespan'],
        product_image: '#',
    },
    {
        product_name: 'Spark Plug Set',
        product_number: 'SP-2023-003',
        product_description: 'High-performance iridium spark plugs',
        jinku_product_id: 'JK-003',
        owner: 'ATCO Parts',
        specifications: ['Iridium tip', 'Pre-gapped', 'Extended lifespan'],
        product_image: '#',
    },
    {
        product_name: 'Spark Plug Set',
        product_number: 'SP-2023-003',
        product_description: 'High-performance iridium spark plugs',
        jinku_product_id: 'JK-003',
        owner: 'ATCO Parts',
        specifications: ['Iridium tip', 'Pre-gapped', 'Extended lifespan'],
        product_image: '#',
    },
    {
        product_name: 'Spark Plug Set',
        product_number: 'SP-2023-003',
        product_description: 'High-performance iridium spark plugs',
        jinku_product_id: 'JK-003',
        owner: 'ATCO Parts',
        specifications: ['Iridium tip', 'Pre-gapped', 'Extended lifespan'],
        product_image: '#',
    },
    {
        product_name: 'Spark Plug Set',
        product_number: 'SP-2023-003',
        product_description: 'High-performance iridium spark plugs',
        jinku_product_id: 'JK-003',
        owner: 'ATCO Parts',
        specifications: ['Iridium tip', 'Pre-gapped', 'Extended lifespan'],
        product_image: '#',
    },
];

export default function Catalog() {
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<SortingState>([]);

    const columns: ColumnDef<Product>[] = useMemo(
        () => [
            {
                accessorKey: 'product_image',
                header: 'Image',
                cell: ({ row }) => (
                    <div className='relative h-16 w-16'>
                        {/* <Image
                            src={row.getValue('product_image')}
                            alt={row.getValue('product_name')}
                            fill
                            className='object-cover rounded-md'
                        /> */}
                    </div>
                ),
            },
            {
                accessorKey: 'product_name',
                header: ({ column }) => {
                    return (
                        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            Product Name
                            <ArrowUpDown className='ml-2 h-4 w-4' />
                        </Button>
                    );
                },
            },
            {
                accessorKey: 'product_number',
                header: ({ column }) => {
                    return (
                        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            Product Number
                            <ArrowUpDown className='ml-2 h-4 w-4' />
                        </Button>
                    );
                },
            },
            {
                accessorKey: 'product_description',
                header: 'Description',
            },
            {
                accessorKey: 'jinku_product_id',
                header: ({ column }) => {
                    return (
                        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            Jinku ID
                            <ArrowUpDown className='ml-2 h-4 w-4' />
                        </Button>
                    );
                },
            },
            {
                accessorKey: 'owner',
                header: ({ column }) => {
                    return (
                        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            Owner
                            <ArrowUpDown className='ml-2 h-4 w-4' />
                        </Button>
                    );
                },
            },
            {
                accessorKey: 'specifications',
                header: 'Specifications',
                cell: ({ row }) => {
                    const specs: string[] = row.getValue('specifications');
                    return (
                        <div className='flex flex-wrap gap-1'>
                            {specs.map((spec, index) => (
                                <span key={index} className='bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full'>
                                    {spec}
                                </span>
                            ))}
                        </div>
                    );
                },
            },
        ],
        []
    );

    const table = useReactTable({
        data: products,
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
        <main className='min-h-screen bg-gray-500'>
            <div className='mx-auto px-4 py-24'>
                <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
                    <h1 className='text-3xl font-bold mb-8'>Auto Parts Catalog</h1>
                    <div className='relative mb-6'>
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        <Input
                            type='text'
                            placeholder='Search by product name, number, description...'
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
        </main>
    );
}
