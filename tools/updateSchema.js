#!/usr/bin/env babel-node

import fs from 'fs';
import path from 'path';
import { printSchema } from 'graphql';

import schema from '../src/data/schema';

const schemaPath = path.resolve(__dirname, './schema.graphql');

// Save user readable type system shorthand of schema
fs.writeFileSync(schemaPath, printSchema(schema));
