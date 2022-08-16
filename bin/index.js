#! /usr/bin/env node

const fs = require('fs');
var path = require('path');
const compile = require('./compile')

function getAllFilesInDir(dir, results, baseDir) {
    fileNames = fs.readdirSync(dir);
    for (fileName of fileNames) {
        if (fs.lstatSync(`${dir}/${fileName}`).isDirectory()) {
            getAllFilesInDir(`${dir}/${fileName}`, results, `${baseDir}/${fileName}`);
        } else {
            if (path.extname(`${dir}/${fileName}`) == '.js') {
                results.push(`${baseDir}/${fileName}`)
            }
        }
    }
}

// process arguments
const args = process.argv.slice(2)

if (args.length != 2) {
    console.error('Two arguments are required.')
    process.exit(1)
}

const src = args[0];
const dest = args[1];

// verify file/folder exists
if (!fs.existsSync(src)) {
    console.error('Input path must be a valid file/directory.')
    process.exit(1)
}

// get list of filenames
var srcFiles = []
var destFiles = []
var srcIsDir = false;

if (fs.lstatSync(src).isDirectory()) {
    // if the input is a directory, add all the filenames in it to src_files
    getAllFilesInDir(src, srcFiles, src);
    getAllFilesInDir(src, destFiles, dest);
    srcIsDir = true;
} else {
    // if the input is a file, add it to src_files
    srcFiles.push(src);
    destFiles.push(dest);
}

// if src is a directory, create the dest folder if it doesn't already exist
if (srcIsDir) {
    for (destFile of destFiles) {
        var dirName = path.dirname(destFile);
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName, {recursive: true})
        }
    }
}

// process source files and write to destination files
for (let i = 0; i < srcFiles.length; i++) {
    let srcContents = fs.readFileSync(srcFiles[i], 'utf-8');
    let compiledContents = compile(srcContents);
    fs.writeFileSync(destFiles[i], compiledContents);
}

console.log('Done');