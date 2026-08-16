import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, '..');
const defaultSourceRoot = path.resolve(
  repositoryRoot,
  '..',
  'PhayarSar',
  'PhayarSar',
  'Resources',
);
const sourceArgumentIndex = process.argv.indexOf('--source');
const sourceRoot = path.resolve(
  sourceArgumentIndex === -1
    ? defaultSourceRoot
    : process.argv[sourceArgumentIndex + 1],
);
const destinationRoot = path.join(repositoryRoot, 'public', 'phayar-sar');

const groupDefinitions = [
  {
    groupId: 8,
    title: 'အခြားဂါထာနှင့် သုတ်တော်များ',
  },
  {
    groupId: 9,
    title: 'ပဋ္ဌာန်း',
  },
];

const additions = [
  { groupId: 1, id: 6, file: 'NatPint.json' },
  { groupId: 1, id: 7, file: 'သီလတောင်း.json' },
  { groupId: 1, id: 8, file: 'သရဏဂုံ.json' },
  { groupId: 8, id: 1, file: 'သမ္ဗုဒ္ဓေ.json' },
  { groupId: 8, id: 2, file: 'ရှင်သီဝလိ.json' },
  { groupId: 8, id: 3, file: 'Dhammacakka.json' },
  { groupId: 8, id: 4, file: 'အနတ္တလက္ခဏသုတ်.json' },
  { groupId: 8, id: 5, file: 'မဟာသမယသုတ်.json' },
  { groupId: 8, id: 6, file: 'ဂုဏ်တော်ကွန်ချာ.json' },
  { groupId: 8, id: 7, file: 'မစ္ဆရာဇသုတ်.json' },
  { groupId: 9, id: 1, file: 'ပဋ္ဌာန်းအကျဥ်း.json' },
  { groupId: 9, id: 2, file: 'ပဋ္ဌာန်းအကျယ်.json' },
];

function parseJson(filePath, allowTrailingCommas = false) {
  let json = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  if (allowTrailingCommas) {
    json = json.replace(/,\s*([}\]])/g, (_match, closingToken) => closingToken);
  }
  return JSON.parse(json);
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

if (!fs.existsSync(sourceRoot)) {
  throw new Error(
    `PhayarSar resources were not found at ${sourceRoot}. Pass --source <directory>.`,
  );
}

const catalogPath = path.join(destinationRoot, 'data.json');
const catalog = parseJson(catalogPath);

for (const groupDefinition of groupDefinitions) {
  const existingGroup = catalog.find(
    (group) => group.groupId === groupDefinition.groupId,
  );
  if (!existingGroup) {
    catalog.push({ ...groupDefinition, data: [] });
  }
}

for (const addition of additions) {
  const sourcePath = path.join(sourceRoot, addition.file);
  const source = parseJson(sourcePath, true);
  const body = source.body.map(({ content, pronunciation }) => ({
    content,
    pronunciation,
  }));
  const detail = {
    id: addition.id,
    groupId: addition.groupId,
    sourceId: source.id,
    title: source.title,
    about: source.about,
    content: body.map((paragraph) => paragraph.content).join('\n\n'),
    body,
  };
  const group = catalog.find((item) => item.groupId === addition.groupId);
  const summary = {
    id: detail.id,
    groupId: detail.groupId,
    sourceId: detail.sourceId,
    title: detail.title,
  };
  const existingIndex = group.data.findIndex((item) => item.id === detail.id);

  if (existingIndex === -1) {
    group.data.push(summary);
  } else {
    group.data[existingIndex] = summary;
  }

  writeJson(
    path.join(destinationRoot, String(detail.groupId), `${detail.id}.json`),
    detail,
  );
}

catalog.sort((left, right) => left.groupId - right.groupId);
for (const group of catalog) {
  group.data.sort((left, right) => left.id - right.id);
}
writeJson(catalogPath, catalog);

console.log(
  `Imported ${additions.length} prayers from ${sourceRoot} into ${destinationRoot}.`,
);
