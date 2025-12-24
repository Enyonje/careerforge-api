export const authConfig = {
  jwtSecret: process.env.JWT_SECRET || 'super-secret',
  apiKeyHeader: 'x-api-key',
};
