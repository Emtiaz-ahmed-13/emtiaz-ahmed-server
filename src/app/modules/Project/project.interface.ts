// Project Interface
export interface IProjectInput {
    title: string;
    slug?: string;
    description: string;
    longDesc: string;
    thumbnail: string;
    images?: string[];
    techStack: string[];
    tags?: string[];
    liveUrl?: string;
    githubUrl?: string;
    featured?: boolean;
    order?: number;
    status?: 'COMPLETED' | 'IN_PROGRESS' | 'ARCHIVED';
}

export interface IProjectQuery {
    featured?: string;
    tag?: string;
    status?: string;
}
