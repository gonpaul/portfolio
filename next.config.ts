import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(withMDX(nextConfig));
