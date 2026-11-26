import { Suspense } from 'react';
import { connection } from 'next/server';

/**
 * Signals intentional runtime work under Cache Components so
 * `generateMetadata` may safely await `params` / cookies while the
 * rest of the page still prerenders a static shell.
 */
async function Connection() {
  await connection();
  return null;
}

export default function DynamicMarker() {
  return (
    <Suspense fallback={null}>
      <Connection />
    </Suspense>
  );
}
