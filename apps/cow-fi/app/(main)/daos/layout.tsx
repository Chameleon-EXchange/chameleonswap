import { Metadata } from 'next'
import { getPageMetadata } from '@/util/getPageMetadata'

export const metadata: Metadata = {
  ...getPageMetadata({
    absoluteTitle: 'DAOs - Savvy DAOs Choose Chameleon swap',
    description: 'The smartest DAOs trust Chameleon swap with their most-important trades',
  }),
}

export default function LayoutPage({ children }: { children: React.ReactNode }) {
  return children
}
