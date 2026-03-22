// Project Service
import { prisma } from '../../shared/prisma';
import slugify from 'slugify';
import { IProjectInput, IProjectQuery } from './project.interface';
import { ProjectStatus } from '@prisma/client';

// Sob projects (filter + sort)
const getAllProjects = async (query: IProjectQuery) => {
    const where: any = {};

    // Featured filter
    if (query.featured === 'true') {
        where.featured = true;
    }

    // Tag filter
    if (query.tag) {
        where.tags = {
            has: query.tag,
        };
    }

    // Status filter
    if (query.status) {
        where.status = query.status.toUpperCase() as ProjectStatus;
    }

    const projects = await prisma.project.findMany({
        where,
        orderBy: [
            { order: 'asc' },
            { createdAt: 'desc' },
        ],
    });

    return projects;
};

// Single project by ID
const getProjectById = async (id: number) => {
    const project = await prisma.project.findUnique({
        where: { id },
    });

    if (!project) {
        throw new Error('Project not found');
    }

    return project;
};

// Notun project create (Admin only)
const createProject = async (data: IProjectInput) => {
    // Auto-generate slug from title
    const slug = data.slug || slugify(data.title, { lower: true, strict: true });

    const project = await prisma.project.create({
        data: {
            title: data.title,
            slug,
            description: data.description,
            longDesc: data.longDesc,
            thumbnail: data.thumbnail,
            images: data.images || [],
            techStack: data.techStack,
            tags: data.tags || [],
            liveUrl: data.liveUrl,
            githubUrl: data.githubUrl,
            featured: data.featured ?? false,
            order: data.order ?? 0,
            status: data.status || 'COMPLETED',
        },
    });

    return project;
};

// Project update (Admin only)
const updateProject = async (id: number, data: Partial<IProjectInput>) => {
    // Jodi title change hoy tahole slug o update korbo
    if (data.title && !data.slug) {
        data.slug = slugify(data.title, { lower: true, strict: true });
    }

    const project = await prisma.project.update({
        where: { id },
        data: {
            ...(data.title && { title: data.title }),
            ...(data.slug && { slug: data.slug }),
            ...(data.description && { description: data.description }),
            ...(data.longDesc && { longDesc: data.longDesc }),
            ...(data.thumbnail && { thumbnail: data.thumbnail }),
            ...(data.images && { images: data.images }),
            ...(data.techStack && { techStack: data.techStack }),
            ...(data.tags && { tags: data.tags }),
            ...(data.liveUrl !== undefined && { liveUrl: data.liveUrl }),
            ...(data.githubUrl !== undefined && { githubUrl: data.githubUrl }),
            ...(data.featured !== undefined && { featured: data.featured }),
            ...(data.order !== undefined && { order: data.order }),
            ...(data.status && { status: data.status }),
        },
    });

    return project;
};

// Project delete (Admin only)
const deleteProject = async (id: number) => {
    await prisma.project.delete({
        where: { id },
    });
};

// Project like (Public)
const likeProject = async (id: number) => {
    const project = await prisma.project.update({
        where: { id },
        data: {
            likes: {
                increment: 1,
            },
        },
        select: {
            likes: true,
        },
    });

    return project;
};

export const ProjectService = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    likeProject,
};
