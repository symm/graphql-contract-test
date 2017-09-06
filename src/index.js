#!/usr/bin/env node

import { introspectionQuery } from 'graphql/utilities/introspectionQuery';
import { buildClientSchema } from 'graphql/utilities/buildClientSchema';
import { findBreakingChanges } from 'graphql/utilities/findBreakingChanges';
import { buildSchema } from 'graphql';

import fetch from 'node-fetch';
import Table from 'cli-table';
import minimist from 'minimist';
import chalk from 'chalk';
import fs from 'fs';

import transformChangeType from './transformChangeType';
import transformChangeDescription from './transformChangeDescription';

const usage = '  Usage: graphql-contract-test ENDPOINT_URL <client_schema_file>';
const error = chalk.bold.red;
const success = chalk.bold.green;

async function main() {
  const argv = minimist(process.argv.slice(2));

  if (argv._.length < 2) {
    console.log(usage);
    return;
  }

  const endpoint = argv._[0];
  const expectedSchemaFile = argv._[1];


  console.log(`[*] Checking ${endpoint} against ${expectedSchemaFile}...\n`);

  let expectedSchema;

  fs.readFile(expectedSchemaFile, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    expectedSchema = buildSchema(data);
  });

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: introspectionQuery }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(JSON.stringify(errors, null, 2));
  }

  const actualSchema = buildClientSchema(data);
  const breakingChanges = findBreakingChanges(expectedSchema, actualSchema);

  if (breakingChanges.length === 0) {
    console.log(success('✨  The server appears to implement the schema you provided'));
    process.exit(0);
  }

  console.log(`💩  ${error('Breaking changes were detected\n')}`);

  const table = new Table({
    head: ['Issue', 'Description'],
  });

  breakingChanges.forEach((change) => {
    table.push([transformChangeType(change.type), transformChangeDescription(change.description)]);
  });

  console.log(table.toString());

  process.exit(1);
}

main().catch(e => console.error(e));
