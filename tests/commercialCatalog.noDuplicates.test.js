import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';

const ROOT_DIR = path.resolve(import.meta.dirname, '..');

function collectTargetFiles() {
  const files = [
    path.join(ROOT_DIR, 'index.html'),
    path.join(ROOT_DIR, 'src', 'App.jsx'),
  ];

  ['components', 'data', 'utils'].forEach((folder) => {
    const dirPath = path.join(ROOT_DIR, 'src', folder);
    if (!fs.existsSync(dirPath)) return;
    fs.readdirSync(dirPath).forEach((entry) => {
      if (!/\.(js|jsx)$/.test(entry)) return;
      const fullPath = path.join(dirPath, entry);
      const relPath = path.relative(ROOT_DIR, fullPath).replace(/\\/g, '/');
      if (
        relPath === 'src/data/commercialCatalog.js' ||
        relPath === 'src/utils/commercialCatalogUtils.js'
      ) {
        return;
      }
      files.push(fullPath);
    });
  });

  return files;
}

const FORBIDDEN_PATTERNS = [
  { label: 'Link Kiwify fora da fonte única', re: /pay\.kiwify\.com\.br/i },
  { label: 'Preço hardcoded Telefonia/Webchat (R$ 503 / R$ 719)', re: /R\$\s*(?:503|719)\b/i },
  { label: 'Preço hardcoded Schema.org 503.00', re: /"price"\s*:\s*"503\.00"/i },
  { label: 'Preço hardcoded WhatsApp (R$ 349 / R$ 499)', re: /R\$\s*(?:349|499)\b/i },
  { label: 'Preço hardcoded Webchat (R$ 209 / R$ 299)', re: /R\$\s*(?:209|299)\b/i },
  { label: 'Valor R$ 297/mês não aprovado', re: /\b297\b/i },
  { label: 'Preço legado R$ 697 / 1490 / 290 / 690', re: /R\$\s*(?:697|1\.?490|290|690)\b/i },
  { label: 'Preço legado por extenso (duzentos e noventa e sete)', re: /duzentos e noventa e sete/i },
  {
    label: 'Preços hardcoded Team/Scale',
    re: /R\$\s*(?:1\.?511|2\.?159|2\.?519|3\.?599|1\.?399|1\.?999|3\.?149|4\.?499|629|899|2\.?099|2\.?999)\b/i,
  },
  {
    label: 'Preços hardcoded Agência/Parceiros/Setup',
    re: /R\$\s*(?:997|1\.?497|2\.?497|1\.?290|2\.?500(?!\+)|21\.?450|35\.?000|30\.?000|12\.?500)\b/i,
  },
  {
    label: 'Excedentes/unitários hardcoded (R$ 70/h, R$ 0,25/min, R$ 0,80, R$ 0,39, R$ 0,97, R$ 49/núm, R$ 36)',
    re: /R\$\s*(?:70\/h|0,25\/min|0,80\s*por conversa|50\s*por\s*100|49\s*\/\s*n[uú]mero|36\s*\/\s*integra|0,39|0,97)/i,
  },
  {
    label: 'Promoção ou regra hardcoded (30% OFF / 30% A MENOS / primeira fatura / -20%)',
    re: /(?:30%\s*(?:OFF|A MENOS|de desconto)|trinta por cento de desconto de lan[cç]amento|na\s+sua\s+primeira\s+fatura|Anual\s*\(-20%|>\s*-20%\s*<)/i,
  },
  { label: 'Contradições de limites legados', re: /(?:3\.000 conversas|2\.000\+ conversas|4 Assistentes|1000 minutos|3600 minutos|Quando uma cota incluída é ultrapassada)/i },
  { label: 'Referência hardcoded a plano Pro inexistente', re: /\bplano Pro\b/i },
];

describe('Detecção de preços, promoções, limites e links comerciais duplicados nos componentes', () => {
  it('garante que nenhum componente, utilitário ou página mantenha preços/condições duplicados fora de commercialCatalog.js', () => {
    const violations = [];
    const targetFiles = collectTargetFiles();

    targetFiles.forEach((filePath) => {
      const content = fs.readFileSync(filePath, 'utf8');
      const relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');

      FORBIDDEN_PATTERNS.forEach(({ label, re }) => {
        const match = content.match(re);
        if (match) {
          violations.push(`${relPath}: [${label}] -> "${match[0]}"`);
        }
      });
    });

    expect(violations).toEqual([]);
  });
});
