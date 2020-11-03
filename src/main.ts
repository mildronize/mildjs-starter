import { app } from './app/app.module';

async function main() {
    await app.init();
}

main();
