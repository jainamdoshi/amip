'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { Cell, ColumnDef, flexRender, getCoreRowModel, Table as TableType, useReactTable } from '@tanstack/react-table';
import { Loader2, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { fetchProducts, fetchProductTypes } from '../api/products/products';
import { Product, ProductSpecification } from '../api/products/types';

export default function Catalog() {
    const searchParams = useSearchParams();
    const [selectedProduct, setSelectedProduct] = useState<string>(searchParams.get('product_name') || '');
    const [productNumber, setProductNumber] = useState<string>(searchParams.get('product_number') || '');
    const [debouncedProductNumber] = useDebounce(productNumber, 300);

    const router = useRouter();

    const columns: ColumnDef<Product>[] = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Product Name',
            },
            {
                accessorKey: 'number',
                header: 'Product Number',
            },
            {
                accessorKey: 'product_description',
                header: 'Product Description',
            },
            {
                accessorKey: 'owner',
                header: 'Owner',
            },
            {
                accessorKey: 'specifications',
                header: 'Specifications',
                cell: ({ row }) => {
                    const specs = row.getValue('specifications') as ProductSpecification;
                    return (
                        <div className='flex flex-wrap gap-1'>
                            {specs.location && (
                                <span className='bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full'>{specs.location}</span>
                            )}
                            {specs.position && (
                                <span className='bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full'>{specs.position}</span>
                            )}
                        </div>
                    );
                },
            },
        ],
        []
    );

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 20,
    });

    const { data: allProductTypes, isLoading: productNameLoading } = useQuery({
        queryKey: ['allProductTypes'],
        queryFn: fetchProductTypes,
    });

    // const queryKey = ;

    const { data, isLoading, error } = useQuery({
        queryKey: ['products', selectedProduct, debouncedProductNumber || '-', pagination],
        queryFn: () => fetchProducts(selectedProduct || '', debouncedProductNumber, pagination),
        enabled: !!debouncedProductNumber || !!selectedProduct,
    });

    const products = data?.results.products || [];
    const productNames = allProductTypes || [];
    const totalPages = data?.results.total_pages || 0;

    const table = useReactTable({
        data: products,
        manualPagination: true,
        state: {
            pagination,
            sorting: [],
        },
        columns,
        rowCount: totalPages * pagination.pageSize,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleSelect = (value: string) => {
        setSelectedProduct(value);
        router.push(
            `?product_name=${encodeURIComponent(value)}${productNumber ? `&product_number=${encodeURIComponent(productNumber)}` : ''}`
        );
    };

    const onSearchChange = (value: string) => {
        setProductNumber(value);
        router.push(
            `?product_number=${encodeURIComponent(value)}${selectedProduct ? `&product_name=${encodeURIComponent(selectedProduct)}` : ''}`
        );
    };

    return (
        <main className='min-h-screen bg-gray-500'>
            <div className='mx-auto px-4 py-24'>
                <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
                    <h1 className='text-3xl font-bold mb-8'>Auto Parts Catalog</h1>
                    <div className='relative mb-6 flex w-full gap-3'>
                        <div className='relative w-3/5'>
                            <Input
                                type='text'
                                placeholder='Search Product Number'
                                value={productNumber}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className='flex-1'
                            />
                            {productNumber && (
                                <Button
                                    type='button'
                                    variant='ghost'
                                    size='icon'
                                    className='absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                                    onClick={() => onSearchChange('')}
                                >
                                    <X className='h-4 w-4' />
                                    <span className='sr-only'>Clear</span>
                                </Button>
                            )}
                        </div>
                        <div className='w-2/5'>
                            <Select value={selectedProduct} onValueChange={handleSelect}>
                                <SelectTrigger>
                                    <SelectValue placeholder='Select product...' />
                                </SelectTrigger>
                                <SelectContent>
                                    {productNameLoading ? (
                                        <span className='flex items-center justify-center p-4'>
                                            <Loader2 className='animate-spin' />
                                        </span>
                                    ) : (
                                        productNames.map((product) => (
                                            <SelectItem key={product} value={product}>
                                                {product}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
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
                            <MainTableBody isLoading={isLoading} error={error} table={table} columnsLength={columns.length} />
                        </Table>
                    </div>
                    <div className='flex items-center justify-end space-x-2 py-4'>
                        {!isLoading && totalPages != 0 ? (
                            <>
                                <div className='flex-1 text-sm text-muted-foreground'>
                                    Page {pagination.pageIndex + 1} of {totalPages}.
                                </div>
                                <div className='space-x-2'>
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        onClick={() => table.previousPage()}
                                        disabled={!table.getCanPreviousPage()}
                                    >
                                        Previous
                                    </Button>
                                    <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                                        Next
                                    </Button>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </main>
    );
}

function MainTableBody({
    isLoading,
    error,
    table,
    columnsLength,
}: {
    isLoading: boolean;
    error: Error | null;
    table: TableType<Product>;
    columnsLength: number;
}) {
    const router = useRouter();

    if (isLoading) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell colSpan={columnsLength} className='h-24 text-center'>
                        <span className='flex flex-col items-center justify-center'>
                            <Loader2 className='animate-spin' />
                        </span>
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }

    if (error) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell colSpan={columnsLength} className='h-24 text-center text-red-500'>
                        Error loading products: {error.message}
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }

    if (table.getRowModel().rows.length === 0) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell colSpan={columnsLength} className='h-24 text-center'>
                        No products found.
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }

    const handleRowSelected = (productId: string) => {
        router.push(`/catalog/${productId}`);
    };

    return (
        <TableBody>
            {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} onClick={() => handleRowSelected(row.original.id)}>
                    {row.getVisibleCells().map((cell: Cell<Product, unknown>) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );
}
