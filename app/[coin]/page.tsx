'use client'

import React from 'react';
import CandleVolumeChart from '@/component/Price';
import { usePathname } from 'next/navigation'
import { cryptoCoins } from '@/lib/sample';

type TimeFrame = '1m' | '5m' | '15m' | '30m' | '1h' | '3h' | '6h' | '12h' | '1d' | '3d' | '1w' | '1M';

const HomePage = () => {
  const pathname = usePathname()
  const pathnameParts = pathname.split('/').filter(Boolean);

  const currentCoin: string = pathnameParts[0]; 
  const currentTimeFrame:TimeFrame = '1m';

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      // alignItems: "center",
      justifyContent: "center"
    }}>
      <CandleVolumeChart currentCoin={currentCoin} currentTimeFrame={currentTimeFrame} /> 
    </div>
  );
};

export default HomePage;