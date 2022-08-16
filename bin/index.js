#! /usr/bin/env node

const fs = require('fs');

// process arguments
const args = process.argv.slice(2)

if (args.length != 2) {
    console.error('Two arguments are required.')
    process.exit(1)
}

const src = args[0];
const dest = args[1];

console.debug(`Fetching files from ${src} and compiling them to ${dest}.`)

// verify file/folder exists
if (!fs.existsSync(src)) {
    console.error('Input path must be a valid file/directory.')
    process.exit(1)
}

console.debug('File/directory exists.')

// get list of filenames
var srcFiles = []
var destFiles = []

if (fs.lstatSync(src).isDirectory()) {
    // if the input is a directory, add all the filenames in it to src_files
    fileNames = fs.readdirSync(src);
    for (fileName of fileNames) {
        srcFiles.push(`${src}/${fileName}`)
        destFiles.push(`${dest}/${fileName}`)
    }
} else {
    // if the input is a file, add it to src_files
    srcFiles.push(src);
    destFiles.push(dest);
}
console.log(srcFiles);
console.log(destFiles);