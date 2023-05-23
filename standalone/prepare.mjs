import fs from 'fs-extra';

// await fs.copy('standalone/server.js', '.next/standalone/server.js');
// const nextConfig = await fs
//   .readJson('.next/required-server-files.json')
//   .then((data) => data.config);

// await fs.writeJSON('.next/standalone/next-config.json', nextConfig, {
//   spaces: 2,
// });

// this is not "required", but we copy the public and static too
await fs.copy('public', '.next/standalone/public');
await fs.copy('.next/static', '.next/standalone/.next/static');
