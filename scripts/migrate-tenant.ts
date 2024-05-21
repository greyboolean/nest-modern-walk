import { execSync } from 'child_process';
import { PrismaClient } from '../prisma/generated/main-client';
import * as dotenv from 'dotenv';

dotenv.config();

const mainPrisma = new PrismaClient();

async function migrate(migrationName?: string) {
  const name = migrationName ? `--name ${migrationName}` : '';
  const dataSources = await mainPrisma.dataSource.findMany();

  for (const dataSource of dataSources) {
    const databaseUrl = dataSource.url;
    execSync(
      `npx prisma migrate dev --schema=./prisma/tenant-schema.prisma ${name}`,
      {
        env: { ...process.env, DATABASE_URL: databaseUrl },
        stdio: 'inherit',
      },
    );
  }

  await mainPrisma.$disconnect();
}

async function push() {
  const dataSources = await mainPrisma.dataSource.findMany();

  for (const dataSource of dataSources) {
    const databaseUrl = dataSource.url;
    execSync(`npx prisma db push --schema=./prisma/tenant-schema.prisma`, {
      env: { ...process.env, DATABASE_URL: databaseUrl },
      stdio: 'inherit',
    });
  }

  await mainPrisma.$disconnect();
}

function generate() {
  execSync(`npx prisma generate --schema=./prisma/tenant-schema.prisma`, {
    env: process.env,
    stdio: 'inherit',
  });
}

// get the command line argument
const command = process.argv[2];
const migrationName = process.argv[3];

// call the appropriate function based on the command line argument
if (command === 'migrate') {
  migrate(migrationName);
} else if (command === 'push') {
  push();
} else if (command === 'generate') {
  generate();
} else {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}
