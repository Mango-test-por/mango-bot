'use client';

import Image from 'next/image';
import { useState } from 'react';

// Porsche's image CDN already handles optimisation; retain its original URLs.
export default function AssetImage({ alt, className = '', ...props }) {
  const [unavailable, setUnavailable] = useState(false);
  return <Image {...props} alt={alt} unoptimized className={`${className}${unavailable ? ' image-unavailable' : ''}`} onError={() => setUnavailable(true)} />;
}
