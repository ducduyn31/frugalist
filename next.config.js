const withNextIntl = require('next-intl/plugin')('./i18n-server-config.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = withNextIntl(nextConfig)
