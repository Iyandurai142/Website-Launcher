export const convertToCSV = (websites) => {
  if (!websites || websites.length === 0) {
    return 'Name,URL,Description,Category,Status,Launch Count,Last Launch Date\n';
  }

  const headers = ['Name', 'URL', 'Description', 'Category', 'Status', 'Launch Count', 'Last Launch Date'];
  const rows = websites.map(w => [
    w.name,
    w.url,
    w.description || '',
    w.category,
    w.status,
    w.launchCount,
    w.lastLaunchDate ? new Date(w.lastLaunchDate).toISOString() : 'N/A'
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  return csvContent;
};