type RawProductSpecification = {
    Location: string;
    Position: string;
};

export type ProductSpecification = {
    location: string;
    position: string;
};

export type RawProductResult = {
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
    products: RawProduct[];
};

export type RawProduct = {
    _id: string;
    jinku_url: string;
    product_name: string;
    product_image: string[];
    jinku_product_id: string;
    specifications: RawProductSpecification;
    Owner: string;
    Number: string;
};

export type RawAllProductNamesResult = {
    products: string[];
};

export type Product = {
    id: string;
    name: string;
    image: string[];
    specifications: ProductSpecification;
    number: string;
    owner: string;
};

export type ApiResponse<T> = {
    success: boolean;
    results: T;
};
