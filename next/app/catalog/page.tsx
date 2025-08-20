'use client';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Cell, ColumnDef, flexRender, getCoreRowModel, Table as TableType, useReactTable } from '@tanstack/react-table';
import { Check, ChevronsUpDown, Loader2, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { fetchProducts, fetchProductTypes } from '../api/products/products';
import { Product, ProductSpecification } from '../api/products/types';
import { useUserId } from '@/providers/userProvider';

export default function Catalog() {
    const searchParams = useSearchParams();
    const [selectedProduct, setSelectedProduct] = useState<string>(searchParams.get('product_name') || '');
    const [productNumber, setProductNumber] = useState<string>(searchParams.get('product_number') || '');
    const [productBrand, setProductBrand] = useState<string>(searchParams.get('product_brand') || '');
    const [debouncedSearchFilterValue] = useDebounce({ productNumber, productBrand }, 300);
    const [open, setOpen] = useState(false);

    const router = useRouter();

    const columns: ColumnDef<Product>[] = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Product Type',
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
                accessorKey: 'brand',
                header: 'Brand Name',
            },
            {
                accessorKey: 'price',
                header: 'Price',
                cell: ({ row }) => {
                    const price = row.getValue('price') as string | undefined;
                    return <span>{price ? `${price}` : '-'}</span>;
                },
            },
            {
                accessorKey: 'view_product',
                header: 'Actions',
                cell: ({ row }) => {
                    const productId = row.original.id;
                    return (
                        <Button
                            variant='link'
                            onClick={() => router.push(`/catalog/${productId}`)}
                            className='text-blue-600 hover:underline pl-0'
                        >
                            View
                        </Button>
                    );
                },
            },
            // {
            //     accessorKey: 'specifications',
            //     header: 'Specifications',
            //     cell: ({ row }) => {
            //         const specs = row.getValue('specifications') as ProductSpecification;
            //         const filteredSpecs = Object.entries(specs).filter(([, value]) => value && value.trim() !== '');
            //         return (
            //             <div className='flex flex-wrap gap-1'>
            //                 {filteredSpecs.map(([key, value]) => (
            //                     <div key={key} className='flex justify-between border-b border-gray-100 pb-2'>
            //                         <span className='bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full'>{value}</span>
            //                     </div>
            //                 ))}
            //             </div>
            //         );
            //     },
            // },
        ],
        [router]
    );

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 50,
    });
    const userId = useUserId();

    const { data: allProductTypes, isLoading: productNameLoading } = useQuery({
        queryKey: ['allProductTypes'],
        queryFn: () => fetchProductTypes(userId),
        enabled: !!userId,
    });

    const { data, isLoading, error } = useQuery({
        queryKey: ['products', selectedProduct, debouncedSearchFilterValue, pagination],
        queryFn: () => fetchProducts(selectedProduct || '', debouncedSearchFilterValue, pagination, userId),
        enabled: !!debouncedSearchFilterValue || !!selectedProduct || !!userId,
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

    const onBranchSearchChange = (value: string) => {
        setProductBrand(value);
        router.push(
            `?product_brand=${encodeURIComponent(value)}${selectedProduct ? `&product_brand=${encodeURIComponent(selectedProduct)}` : ''}`
        );
    };

    return (
        <main className='min-h-screen bg-gray-500'>
            <div className='mx-auto px-4 py-24'>
                <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
                    <h1 className='text-3xl font-bold mb-8'>Auto Parts Catalog</h1>
                    <div className='relative mb-6 flex w-full gap-3 flex-col'>
                        <div className='relative w-full'>
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
                        <div className='w-full flex gap-2 max-md:flex-col'>
                            <div className='relative md:w-2/3'>
                                <Input
                                    type='text'
                                    placeholder='Search Brand Name'
                                    value={productBrand}
                                    onChange={(e) => onBranchSearchChange(e.target.value)}
                                    className=''
                                />
                                {productBrand && (
                                    <Button
                                        type='button'
                                        variant='ghost'
                                        size='icon'
                                        className='absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                                        onClick={() => onBranchSearchChange('')}
                                    >
                                        <X className='h-4 w-4' />
                                        <span className='sr-only'>Clear</span>
                                    </Button>
                                )}
                            </div>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant='outline' className='w-full justify-between font-normal text-gray-500'>
                                        {selectedProduct ? selectedProduct : 'Select Product Type'}
                                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-full p-0' align='start'>
                                    <Command>
                                        <CommandInput placeholder='Search product type...' />
                                        <CommandList>
                                            <CommandEmpty>No product type found.</CommandEmpty>
                                            <CommandGroup>
                                                {!productNameLoading ? (
                                                    productNames.map((product) => (
                                                        <CommandItem
                                                            key={product}
                                                            value={product}
                                                            onSelect={(currentValue) => {
                                                                handleSelect(currentValue);
                                                                setOpen(false);
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    'mr-2 h-4 w-4',
                                                                    product === selectedProduct ? 'opacity-100' : 'opacity-0'
                                                                )}
                                                            />
                                                            {product}
                                                        </CommandItem>
                                                    ))
                                                ) : (
                                                    <span className='flex items-center justify-center p-4'>
                                                        <Loader2 className='animate-spin' />
                                                    </span>
                                                )}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            {selectedProduct && (
                                <Button variant='outline' size='sm' onClick={() => setSelectedProduct('')}>
                                    <X className='h-4 w-4' />
                                </Button>
                            )}
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
                <TableRow key={row.id} onClick={() => handleRowSelected(row.original.id)} className='cursor-pointer hover:bg-gray-100'>
                    {row.getVisibleCells().map((cell: Cell<Product, unknown>) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );
}
