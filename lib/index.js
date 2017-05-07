'use strict';

const pkg = require('../package.json');
const got = require('got');
const colors = require('colors');
let cheerio = require('cheerio');

// arguments
let argv = process.argv.slice(2);

// version
if(argv.indexOf('--version') !== -1 || argv.indexOf('-v') !== -1) {
  console.log(pkg.version);
  process.exit(1);
}

// help
if(argv.indexOf('--help') !== -1 || argv.indexOf('-h') !== -1) {
  console.log('' +
    'Usage' +
    '$ random-quote' +
    '');
  process.exit(1);
}

function random() {
  return Math.floor(Math.random() * 999) + 1
}

const URL = 'http://www.quotationspage.com/quote/';
const randomQuote = URL+ random()+'.html';

function printQuote(html) {
  const $ = cheerio.load(html);
  let quote = $('dt').text();
  let author = $('dd a').text();
  console.log(colors.yellow(quote));
  console.log(colors.blue(' -- ' + author));
}

// default
got(randomQuote).then(response => {
  //console.log(response.body);
  printQuote(response.body);
}).catch(error => {
  console.log(error.response.body);
});
