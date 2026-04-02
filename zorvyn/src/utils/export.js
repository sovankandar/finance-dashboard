const makeCsv = (rows) => {
  if (!rows || rows.length === 0) return '';

  const headers = Object.keys(rows[0]);

  const clean = (value) => {
    if (value === null || value === undefined) return '';
    const text = String(value);
    if (text.includes(',') || text.includes('"') || text.includes('\n')) {
      return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
  };

  const lines = [];
  lines.push(headers.join(','));
  rows.forEach((row) => {
    const line = headers.map((key) => clean(row[key])).join(',');
    lines.push(line);
  });

  return lines.join('\n');
};

const saveFile = (content, filename, type) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const exportJSON = (rows, filename = 'transactions.json') => {
  const json = JSON.stringify(rows, null, 2);
  saveFile(json, filename, 'application/json');
};

const exportCSV = (rows, filename = 'transactions.csv') => {
  const csv = makeCsv(rows);
  saveFile(csv, filename, 'text/csv');
};

export { exportJSON, exportCSV };
