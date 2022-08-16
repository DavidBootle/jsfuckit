# jsfuckit
An npx tool to compile Javascript to JSFuck with no regard for optimization. Simply run and watch your code turn into an insane unreadable mess!

## How to Use
```bash
npx jsfuckit src dest
```
`src` can be a directory or a file. If it is a directory, all the files in that directory will be compiled recursively. `dest` should be either a file name or a directory.

The program ignores all files that do not end in `.js`.

## Why
Why not?

## Effects on your Code
- Impossible to read!
- Incredibly inefficient!
- Massive file sizes!

Files should be about 3000x larger than the original!

## How it Works
This project was inspired by Low Level Javascript's video [JavaScript Is Weird (EXTREME EDITION)](https://www.youtube.com/watch?v=sRWE5tnaxlI). I highly recommend watching it. I've also "borrowed" some of the code from his video as the foundation for this package.