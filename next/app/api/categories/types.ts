export type RawAllCategoriesResult = {
    total: number;
    categories: {
        total_products: number;
        products: string[];
        category: string;
    }[];
};
