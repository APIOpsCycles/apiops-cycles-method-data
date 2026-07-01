---
"create-apiops": patch
---

Improve initializer CLI handling for help output, positional project names, and non-interactive npm-create usage. Non-interactive runs now fail clearly when prompt answers are missing instead of waiting on stdin.

The create-apiops test script now keeps fast scaffold checks separate from the install-heavy generated-project integration run so regular CLI regression tests do not silently spend minutes in npm install.
