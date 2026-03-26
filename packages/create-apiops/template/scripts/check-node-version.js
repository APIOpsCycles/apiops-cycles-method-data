const major = Number(process.versions.node.split(".")[0]);

if (major < 22) {
  console.error(`This project requires Node.js >=22. Current version: ${process.versions.node}`);
  process.exit(1);
}
