/*
 * This is a wrapper for generate-docs.ts which is used
 * as a source of generateDocs() function used in doc-extract plugin.
 *
 * This file exists o avoid generateDocs() being run when imported by the plugin (causing unnecessary calls),
 * and keep the possibility of executing this script manually.
 */

import { generateDocs } from './generate-docs';
generateDocs();
