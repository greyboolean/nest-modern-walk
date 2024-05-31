import { execSync } from 'child_process';
import * as dotenv from 'dotenv';

dotenv.config();

function migrate(migrationName?: string) {
  const name = migrationName ? `--name ${migrationName}` : '';
  execSync(
    `npx prisma migrate dev --schema=./prisma/main-schema.prisma ${name}`,
    {
      env: process.env,
      stdio: 'inherit',
    },
  );
}

function push() {
  execSync(`npx prisma db push --schema=./prisma/main-schema.prisma`, {
    env: process.env,
    stdio: 'inherit',
  });
}

function generate() {
  execSync(`npx prisma generate --schema=./prisma/main-schema.prisma`, {
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
