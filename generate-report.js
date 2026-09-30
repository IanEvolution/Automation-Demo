async function run() {
  const { generate } = await import('multiple-cucumber-html-reporter');

  generate({
    jsonDir: 'reports',
    reportPath: 'reports/html',
    openReportInBrowser: true,
    metadata: {
      browser: { name: 'chrome', version: 'latest' },
      device: 'QA Wolf Assessment',
      platform: { name: 'windows', version: '11' }
    }
  });
}

run();