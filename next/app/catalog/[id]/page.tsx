'use client';

import { fetchProductDetails } from '@/app/api/products/products';
import { CrossSearch } from '@/app/api/products/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useUserId } from '@/providers/userProvider';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowLeft, ArrowUpDown, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export default function ProductPage({
    params,
}: Readonly<{
    params: { id: string };
}>) {
    const router = useRouter();
    const userId = useUserId();

    const {
        data: productData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['productData', params.id],
        queryFn: async () => fetchProductDetails(params.id, userId),
        enabled: !!userId,
    });
    const columns: ColumnDef<CrossSearch>[] = useMemo(
        () => [
            {
                accessorKey: 'Owner',
                header: ({ column }) => {
                    return (
                        <Button
                            variant='ghost'
                            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                            className='h-auto p-0 font-semibold'
                        >
                            Manufacturer/Brand
                            <ArrowUpDown className='ml-1 h-4 w-4' />
                        </Button>
                    );
                },
                cell: ({ row }) => <div className='font-medium'>{row.getValue('Owner')}</div>,
            },
            {
                accessorKey: 'Number',
                header: ({ column }) => {
                    return (
                        <Button
                            variant='ghost'
                            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                            className='h-auto p-0 font-semibold'
                        >
                            Part Number
                            <ArrowUpDown className='ml-1 h-4 w-4' />
                        </Button>
                    );
                },
                cell: ({ row }) => (
                    <div className='font-mono text-sm bg-gray-100 px-2 py-1 rounded inline-block'>{row.getValue('Number')}</div>
                ),
            },
            // {
            //     id: 'actions',
            //     header: 'Actions',
            //     cell: ({ row }) => (
            //         <div className='flex gap-2'>
            //             <Button size='sm' variant='outline'>
            //                 <ShoppingCart className='h-4 w-4 mr-1' />
            //                 Quote
            //             </Button>
            //         </div>
            //     ),
            // },
        ],
        []
    );

    const table = useReactTable({
        data: productData?.crosses || [],
        columns,
        state: {
            // sorting,
            // globalFilter,
        },
        // onSortingChange: setSorting,
        // onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    if (isLoading) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <Loader2 className='animate-spin' />
            </div>
        );
    }

    if (isError) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <div className='text-red-500'>Error loading product details. Please try again later.</div>
            </div>
        );
    }

    const specifications = productData?.product.specifications || {};

    return (
        <main className='min-h-screen bg-gray-50'>
            <div className='container mx-auto px-4 py-24'>
                {/* Breadcrumb */}
                <div className='flex items-center gap-2 mb-6'>
                    <Button
                        variant='link'
                        className='flex items-center text-gray-600 hover:text-red-500 transition-colors'
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className='h-4 w-4 mr-1' />
                        Back to Catalog
                    </Button>
                </div>

                {/* Product Header */}
                <div className='bg-white rounded-lg shadow-md p-8 mb-8'>
                    <div className='flex flex-row w-full justify-between'>
                        <h1 className='text-3xl font-bold text-gray-900 mb-2'>{productData?.product.product_name}</h1>
                        <div className='text-gray-600 text-2xl'>{productData?.product.price || null}</div>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        {/* Product Images */}
                        {/* <div className='space-y-4'>
                            <div className='relative h-96 bg-gray-100 rounded-lg overflow-hidden'>
                                <Image src={productData.product_image[0]} alt={productData.product_name} fill className='object-cover' />
                            </div>
                            {productData.product_image.length > 1 && (
                                <div className='flex gap-2'>
                                    {productData.product_image.slice(1).map((image, index) => (
                                        <div key={index} className='relative h-20 w-20 bg-gray-100 rounded-md overflow-hidden'>
                                            <Image
                                                src={image}
                                                alt={`${productData.product_name} ${index + 2}`}
                                                fill
                                                className='object-cover'
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div> */}

                        {/* Product Info */}
                        <div className='space-y-6'>
                            {/* Specifications */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className='text-lg'>Specifications</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className='space-y-3'>
                                        {Object.entries(specifications).map(([key, value]) => (
                                            <div key={key} className='flex justify-between border-b border-gray-100 pb-2'>
                                                <span className='font-medium text-gray-600'>{key}</span>
                                                <span className='text-gray-900'>{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Action Buttons */}
                            {/* <div className='flex gap-3'>
                                <Button className='bg-red-500 hover:bg-red-600 flex-1'>
                                    <ShoppingCart className='h-4 w-4 mr-2' />
                                    Request Quote
                                </Button>
                                <Button variant='outline'>
                                    <Download className='h-4 w-4 mr-2' />
                                    Download Info
                                </Button>
                                <Button variant='outline' size='icon'>
                                    <Share2 className='h-4 w-4' />
                                </Button>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* Cross Search Results */}
                <div className='bg-white rounded-lg shadow-md p-6'>
                    <div className='mb-6'>
                        <h2 className='text-2xl font-bold mb-2'>Available from Multiple Manufacturers</h2>
                        <p className='text-gray-600'>
                            This part is available from different manufacturers with varying part numbers. All parts are compatible and meet
                            the same specifications.
                        </p>
                    </div>

                    {/* <div className='mb-6'>
                        <div className='relative'>
                            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                            <Input
                                type='text'
                                placeholder='Search by manufacturer or part number...'
                                value={globalFilter ?? ''}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                className='pl-10'
                            />
                        </div>
                    </div> */}

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

                    <div className='mt-6 p-4 bg-blue-50 rounded-lg'>
                        <h3 className='font-medium text-blue-900 mb-2'>Need Help Choosing?</h3>
                        <p className='text-blue-800 text-sm'>
                            All listed parts are compatible with your vehicle. Contact our technical support team if you need assistance
                            choosing the right manufacturer or have questions about compatibility.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
