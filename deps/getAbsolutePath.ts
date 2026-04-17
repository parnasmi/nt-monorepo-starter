// Source: apps/dashboard/src/shared/lib/utils/getAbsolutePath/getAbsolutePath.ts
// Target: apps/naiton/src/shared/lib/utils/getAbsolutePath/getAbsolutePath.ts

export function getAbsolutePath(path: string) {
  return `/app/${path}`;
}
