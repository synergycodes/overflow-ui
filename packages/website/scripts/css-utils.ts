import { CSSVariableData } from '@site/src/types';
import { Declaration, findAll, parse } from 'css-tree';
import fs from 'node:fs/promises';

export async function getCSSVariableData(path: string) {
  const content = await fs.readFile(path, 'utf-8');

  const variableDeclarations = parsePublicVariables(content);
  const comments = parseCSSComments(content);

  const variablesData = variableDeclarations.map(
    ({ property, loc }: Declaration): CSSVariableData => {
      const declarationLine = loc.start.line;
      const relatedLines = [declarationLine, declarationLine - 1];

      return {
        name: property,
        comment: comments
          .find((comment) => relatedLines.includes(comment.line))
          ?.value.trim(),
      };
    },
  );

  return variablesData;
}

const PUBLIC_PREFIX = '--ax-public';
function parsePublicVariables(content: string) {
  const cssNode = parse(content, {
    positions: true,
  });

  const vars = findAll(
    cssNode,
    (node) =>
      node.type === 'Declaration' && node.property.startsWith(PUBLIC_PREFIX),
  );

  return vars;
}

function parseCSSComments(content: string) {
  const comments: CommentData[] = [];

  parse(content, {
    onComment: (value, loc) => {
      comments.push({ value, line: loc.end.line });
    },
    positions: true,
  });

  return comments;
}

type CommentData = { value: string; line: number };
