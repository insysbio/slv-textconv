#!/usr/bin/env node
const commander = require('commander');
const fs = require('fs');
// const path = require('path');
const rctParse = require('../src').rctParse;

commander
  .description('parse rct file')
  .usage('[inputPath]')
  .option('-o, --output <path>', 'output file after parse')
  .action((input, cmd) => {
    fs.readFile(input, 'utf8', (err, contents) => {
      if (err) throw err;
      let result = rctParse.parse(contents);

      if (cmd.output) {
        fs.writeFile(cmd.output, JSON.stringify(result, null, 2), (err) => {
          if (err) throw err;
          console.log('Result successfully written to file');
        });
      } else {
        process.stdout.write(JSON.stringify(result, null, 2));
      }
    });
  })
  .parse(process.argv);
