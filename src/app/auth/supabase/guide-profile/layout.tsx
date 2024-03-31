'use client';

import CustomLayout from 'src/layouts/custom';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <CustomLayout>{children}</CustomLayout>;
}
