// Resume Service
import { prisma } from '../../shared/prisma';

interface ITrackDownload {
    ipAddress: string;
    userAgent?: string;
}

// Download track korbo
const trackDownload = async (data: ITrackDownload) => {
    await prisma.resumeDownload.create({
        data: {
            ipAddress: data.ipAddress,
            userAgent: data.userAgent,
        },
    });
};

// Download statistics
const getDownloadStats = async () => {
    const totalDownloads = await prisma.resumeDownload.count();

    const recentDownloads = await prisma.resumeDownload.findMany({
        take: 10,
        orderBy: {
            downloadedAt: 'desc',
        },
        select: {
            ipAddress: true,
            downloadedAt: true,
        },
    });

    return {
        totalDownloads,
        recentDownloads,
    };
};

export const ResumeService = {
    trackDownload,
    getDownloadStats,
};
