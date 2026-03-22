// Blog Interface
export interface IBlogInput {
    title: string;
    slug?: string;
    excerpt: string;
    content: string;
    tags?: string[];
    published?: boolean;
}
