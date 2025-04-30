import { rm, readdir, mkdir, readFile, copyFile } from 'node:fs/promises';
import { join, basename } from 'node:path';
import matter from 'gray-matter';
import { cwd } from 'node:process';
import { createScript } from '../utils/create-script';

const UI_DIR_PATH = join(cwd(), '..', 'ui');
const OUTPUT_DIR = join(
  process.cwd(),
  'docs',
  'generated-docs',
  'decision-logs',
);
const TARGET_SUFFIX = 'decision-log.md';

export const generateDecisionLogList = createScript(
  'Decision Log Entries',
  async function () {
    await setupOutputDir();
    await mkdir(OUTPUT_DIR, { recursive: true });

    const logs = await findDecisionLogs(UI_DIR_PATH);
    const listing: string[] = [];

    for (const [index, { originalPath, title }] of logs.entries()) {
      const fileName = `${basename(originalPath)}.md`;

      const destPath = join(OUTPUT_DIR, fileName);
      await copyFile(originalPath, destPath);

      const displayTitle = title || `Decision Log #${index + 1}`;
      listing.push(`- [${displayTitle}](./${fileName})`);
    }
  },
);

async function setupOutputDir() {
  await rm(OUTPUT_DIR, { recursive: true, force: true });
  await mkdir(OUTPUT_DIR, { recursive: true });
}

async function findDecisionLogs(
  dir: string,
  logs: DecisionLogEntry[] = [],
): Promise<DecisionLogEntry[]> {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      await findDecisionLogs(fullPath, logs);
    } else if (entry.isFile() && entry.name.endsWith(TARGET_SUFFIX)) {
      const content = await readFile(fullPath, 'utf-8');
      const { data } = matter(content);

      logs.push({
        originalPath: fullPath,
        filename: entry.name,
        title: data.title,
        date: data.date,
      });
    }
  }

  return logs;
}

type DecisionLogEntry = {
  originalPath: string;
  filename: string;
  title?: string;
  date?: string;
};
