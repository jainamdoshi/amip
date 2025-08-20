export type ProductSpecification = Record<string, string>;

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
    specifications: ProductSpecification;
    Owner: string;
    Number: string;
    price?: string;
};

export type RawCrossSearchResult = {
    results: {
        product: {
            product_name: string;
            price?: string;
            specifications: ProductSpecification;
        };
        crosses: [
            {
                Owner: string;
                Number: string;
            }
        ];
    };
};

export type CrossSearch = {
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
    brand: string;
    price: string | '-';
};
