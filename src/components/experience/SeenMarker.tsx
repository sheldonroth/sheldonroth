'use client';

import { useEffect } from 'react';
import { markExperienceSeen } from './seen';

/** Mounted in the site layout: anyone who has reached the normal site has no need for the intro on "/". */
export default function SeenMarker() {
  useEffect(() => markExperienceSeen(), []);
  return null;
}
