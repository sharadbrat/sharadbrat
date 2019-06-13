const showdown = require('showdown');
const args = require('yargs').argv;
const fs = require('fs');

const input = args.input;
if (!input) {
  throw new Error('Input file is not specified');
}

const output = args.output;
if (!output) {
  throw new Error('Output file is not specified');
}

const inputFile = `${__dirname}/${args.input}`;
const outputFile = `${__dirname}/${args.output}`;

fs.readFile(inputFile, (err, buf) => {
  if (err) {
    throw err;
  }

  const converting = buf.toString();

  const converter = new showdown.Converter({noHeaderId: true});
  const res = converter.makeHtml(converting);

  fs.writeFile(outputFile, res, (err) => {
    if (err) {
      throw err;
    }

    console.log(`Successfully converted. Results: file://${outputFile}`)
  });
});
