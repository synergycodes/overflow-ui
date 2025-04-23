import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const UI_DIR_PATH = path.join(process.cwd(), '..', 'ui');
const OUTPUT_DIR = path.join(
  process.cwd(),
  'docs',
  'generated-docs',
  'decision-logs',
);
const TARGET_SUFFIX = 'decision-log.md';

type DecisionLogEntry = {
  originalPath: string;
  filename: string;
  title?: string;
  date?: string;
};

async function setupOutputDir() {
  await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
  await fs.mkdir(OUTPUT_DIR);
}

async function findDecisionLogs(
  dir: string,
  logs: DecisionLogEntry[] = [],
): Promise<DecisionLogEntry[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await findDecisionLogs(fullPath, logs);
    } else if (entry.isFile() && entry.name.endsWith(TARGET_SUFFIX)) {
      const content = await fs.readFile(fullPath, 'utf-8');
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

export async function generateDecisionLogList() {
  await setupOutputDir();

  const logs = await findDecisionLogs(UI_DIR_PATH);

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const listing: string[] = [];

  for (const [index, log] of logs.entries()) {
    const safeTitle = path.basename(log.originalPath);
    const fileName = `${safeTitle}.md`;

    const destPath = path.join(OUTPUT_DIR, fileName);
    await fs.copyFile(log.originalPath, destPath);

    const displayTitle = log.title || `Decision Log #${index + 1}`;
    listing.push(`- [${displayTitle}](./${fileName})`);
  }

  console.log(`✅ Collected ${logs.length} decision logs to ${OUTPUT_DIR}`);
}
