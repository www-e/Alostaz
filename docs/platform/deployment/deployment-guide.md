# Deployment Guide

## Overview

This document provides comprehensive instructions for deploying the Alostaz platform to various environments, including development, staging, and production.

## Prerequisites

- Node.js 16+ and npm 8+
- Git
- Supabase CLI (for local development)
- Docker (for local Supabase)
- Vercel or similar hosting account

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Other
NODE_ENV=development
```

## Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/alostaz.git
cd alostaz
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Local Supabase

1. Start Supabase:
   ```bash
   npx supabase start
   ```

2. Apply database migrations:
   ```bash
   npx supabase db push
   ```

3. Seed the database (optional):
   ```bash
   npx ts-node scripts/seed.ts
   ```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Staging Deployment

### 1. Create a New Branch

```bash
git checkout -b release/staging
```

### 2. Update Environment Variables

Update the environment variables in your hosting provider's dashboard.

### 3. Deploy to Vercel

1. Push your branch:
   ```bash
   git push origin release/staging
   ```

2. Create a new deployment in Vercel from the branch

### 4. Run Tests

```bash
npm test
npm run test:e2e
```

## Production Deployment

### 1. Create a Release

```bash
git checkout main
git pull
git tag v1.0.0
git push origin v1.0.0
```

### 2. Deploy to Production

1. In Vercel, create a production deployment from the main branch
2. Monitor the deployment in the Vercel dashboard

### 3. Verify Deployment

1. Check the health endpoint: `https://your-domain.com/api/health`
2. Verify all functionality
3. Check error tracking (if applicable)

## CI/CD Pipeline

The project includes GitHub Actions workflows for:

- **CI**: Runs on every push to any branch
  - Linting
  - Type checking
  - Unit tests
  - E2E tests

- **CD**: Runs on push to main or tags
  - Build and deploy to production
  - Run migrations
  - Invalidate CDN cache

## Database Migrations

### Create a New Migration

```bash
npx supabase migration new migration_name
```

### Apply Migrations

```bash
npx supabase db push
```

### Rollback Migrations

```bash
npx supabase db reset
```

## Environment-Specific Configuration

| Environment | URL | Database | Notes |
|-------------|-----|----------|-------|
| Development | http://localhost:3000 | Local Supabase | Auto-reload, debug logs |
| Staging | https://staging.alostaz.com | Staging DB | Mirrors production |
| Production | https://alostaz.com | Production DB | Optimized, minified |

## Monitoring and Logging

### Error Tracking

- **Frontend**: Sentry
- **Backend**: Supabase Logs
- **Performance**: Vercel Analytics

### Logging Levels

- `error`: Critical issues requiring immediate attention
- `warn`: Potential issues that don't prevent operation
- `info`: General operational logs
- `debug`: Detailed debugging information

## Rollback Procedure

### Frontend Rollback

1. Revert to previous deployment in Vercel
2. Clear CDN cache
3. Verify functionality

### Database Rollback

1. Revert to previous migration:
   ```bash
   npx supabase migration down
   ```
2. Restore from backup if needed

## Scaling

### Vertical Scaling

- Upgrade Vercel plan
- Increase database resources in Supabase

### Horizontal Scaling

- Enable Vercel Edge Functions
- Implement database read replicas if needed

## Security Considerations

1. **Secrets Management**
   - Never commit secrets to version control
   - Use environment variables
   - Rotate keys regularly

2. **Dependencies**
   - Regularly update dependencies
   - Audit for vulnerabilities
   - Use Dependabot

3. **Monitoring**
   - Set up alerts for errors
   - Monitor performance
   - Review access logs

## Backup Strategy

### Database Backups

- Automatic daily backups in Supabase
- 7-day retention policy
- Manual backup before major updates

### File Storage

- Regular backups of file storage
- Versioning enabled

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Verify connection string
   - Check network connectivity
   - Verify database is running

2. **Build Failures**
   - Check Node.js version
   - Verify environment variables
   - Check dependency versions

3. **Performance Issues**
   - Check database queries
   - Review network requests
   - Monitor resource usage

## Support

For deployment issues, contact:

- **Email**: dev-support@alostaz.com
- **Slack**: #deployments
- **On-call**: +1-555-123-4567

## Changelog

See [CHANGELOG.md](../../CHANGELOG.md) for version history and changes.
