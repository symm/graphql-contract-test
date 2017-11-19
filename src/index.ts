#!/usr/bin/env node

import fetch from 'node-fetch'
import {introspectionQuery} from 'graphql/utilities/introspectionQuery'
import {buildClientSchema} from 'graphql/utilities/buildClientSchema'
import * as minimist from 'minimist'
import * as chalk from 'chalk'
import * as fs from "fs";
import {buildSchema, GraphQLSchema} from "graphql";
import {findBreakingChanges} from "graphql/utilities";
import {transformChangeType} from "./utils/transformChangeType";
import {transformChangeDescription} from "./utils/transformChangeDescription";
import Table = require('cli-table2')

const {version, name} = require('../package.json');

const usage = `
  ${chalk.bold(
    'Check if the remote server fulfills the supplied GraphQL contract file',
)}

  Usage: graphql-contract-test ENDPOINT_URL client_schema_file

  Options:
    --header, -h    Add a custom header (ex. 'Authorization=Bearer ...'), can be used multiple times
`;

const intro = `  GraphQL Contract Test v${version}
`;

async function main() {
    console.log(intro);

    const argv = minimist(process.argv.slice(2));

    if (argv._.length < 2) {
        console.log(usage);
        process.exit(1);
    }

    const endpoint = argv._[0];
    const contractFile = argv._[1];
    const headers = parseHeaderOptions(argv);

    const implementation = await getImplementedSchema(endpoint, headers);
    const contract = getContractSchema(contractFile);

    const breakingChanges = findBreakingChanges(contract, implementation);

    if (breakingChanges.length === 0) {
        console.log(chalk.bold.green('  ✨  The server appears to implement the schema you provided'));
        process.exit(0);
    }

    console.log(`  💩  ${chalk.bold.red('Breaking changes were detected\n')}`);

    const table = buildResultsTable(breakingChanges);
    console.log(table.toString());

    process.exit(1)
}

function buildResultsTable(breakingChanges): Table {
    const table = new Table({
        head: ['Issue', 'Description'],
    });

    breakingChanges.forEach((change) => {
        table.push([transformChangeType(change.type), transformChangeDescription(change.description)]);
    });

    return table
}

function getContractSchema(expectedSchemaFile): GraphQLSchema
{
    const data = fs.readFileSync(expectedSchemaFile, 'utf8');

    return buildSchema(data)
}

async function getImplementedSchema(endpoint, headers): Promise<GraphQLSchema>
{
    const response = await fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({query: introspectionQuery}),
    });

    const {data, errors} = await response.json();

    if (errors) {
        throw new Error(JSON.stringify(errors, null, 2))
    }

    return buildClientSchema(data);
}

function parseHeaderOptions(argv) {
    const defaultHeaders = {
        'Content-Type': 'application/json',
        'User-Agent': `${name} v${version}`
    };

    return toArray(argv['header'])
        .concat(toArray(argv['h']))
        .reduce((obj, header: string) => {
            const [key, value] = header.split('=');
            obj[key] = value;
            return obj
        }, defaultHeaders);
}

function toArray(value = []) {
    return Array.isArray(value) ? value : [value]
}

main().catch(e => {
    console.log(`${chalk.bold.red(e.message)}`);
    process.exit(1);
});
