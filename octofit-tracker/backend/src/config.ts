export function getApiBaseUrl(codespaceName = process.env.CODESPACE_NAME): string {
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}
