// Prisma Client Instance with PostgreSQL Adapter
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import config from '../../config';

const pool = new Pool({ connectionString: config.database_url });
const adapter = new PrismaPg(pool);

const prismaClientSingleton = () => {
    return new PrismaClient({ adapter });
};

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = prisma;
}
