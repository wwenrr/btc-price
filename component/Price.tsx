"use client"

import React, { useEffect, useRef, useState, useContext } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { GetCandles, GetLiveCandle } from '@/lib/sample';
import Link from 'next/link';
import { ThemeContext } from "@/component/ThemeContext";
import { TimeFrame } from '@/app/[coin]/page';
import {TimeFrame as TimeComp} from './TimeFrame';

type CandleData = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

type VolumeData = {
  time: number;
  value: number;
  color: string;
};

//@ts-ignore
const CandleVolumeChart = ({ currentCoin, currentTimeFrame }) => {
  const context = useContext(ThemeContext);
        if (!context) {
        throw new Error("useContext phải được dùng bên trong ThemeContext.Provider");
    }
    
    const { theme, toggleTheme } = context;

  const chartContainerRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const volumeSeriesRef = useRef(null);
  const [canData, setCan] = useState<CandleData[]>([]);
  const [volData, setVol] = useState<VolumeData[]>([]);
  const [time, setTime] = useState<string>("1m")

  const fetchData = async () => {
    const data = await GetCandles(time, currentCoin);
    const candleData = data.map((item) => ({
      time: item.openTime / 1000,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));
    const volumeData = data.map((item) => ({
      time: item.openTime / 1000,
      value: item.volume,
      color: item.close > item.open ? '#26a69a' : '#ef5350',
    }));

    setCan(canData)
    setVol(volumeData)
    
    //@ts-ignore
    candleSeriesRef.current.setData(candleData);
    //@ts-ignore  
    volumeSeriesRef.current.setData(volumeData);
  };

  useEffect(() => {
    
    //@ts-ignore
    const chart = createChart(chartContainerRef.current, {
        //@ts-ignore
      width: chartContainerRef.current.clientWidth,
      //@ts-ignore
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: theme ? "#A9B5DF" : "#1A1A1A", // Màu nền sáng/tối
        textColor: theme ? "#333" : "#FFF", // Màu chữ sáng/tối
      },
      grid: {
        vertLines: {
          color: theme ? "rgba(238, 238, 238, 0.6)" : "rgba(60, 60, 60, 0.6)", // Màu lưới sáng/tối
        },
        horzLines: {
          color: theme ? "rgba(238, 238, 238, 0.6)" : "rgba(60, 60, 60, 0.6)",
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: theme ? "#ccc" : "#555", // Màu viền sáng/tối
      },
      timeScale: {
        borderColor: theme ? "#ccc" : "#555",
      },
    });

        //@ts-ignore
    candleSeriesRef.current = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderDownColor: '#ef5350',
      borderUpColor: '#26a69a',
      wickDownColor: '#ef5350',
      wickUpColor: '#26a69a',
    });

    //@ts-ignore
    volumeSeriesRef.current = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
    });

    chart.priceScale('').applyOptions({
      scaleMargins: {
        top: 0.7,
        bottom: 0,
      },
    });

    (async () => {await fetchData()})()

    return () => {
      chart.remove();
    };
  }, [currentCoin, currentTimeFrame]);

  useEffect(() => {
    if (candleSeriesRef.current && canData.length > 0) {
      
      console.log(canData)
      //@ts-ignore
      candleSeriesRef.current.setData(canData);  // Cập nhật dữ liệu nến
    }
  }, [canData]);  // Chỉ gọi khi canData thay đổi

  useEffect(() => {
    if (volumeSeriesRef.current && volData.length > 0) {
      console.log(volData)
      //@ts-ignore
      volumeSeriesRef.current.setData(volData);  // Cập nhật dữ liệu volume
    }
  }, [volData]);  // Chỉ gọi khi volData thay đổi


  const timeFrames: TimeFrame[] = ['1m', '5m', '15m', '30m', '1h'];

  useEffect(() => {
    const intervalId = setInterval(fetchData, 1000); 
  
    return () => clearInterval(intervalId); 
  }, [time]); 

  return (
    <>
      <a href="/"><img style={{position: "absolute", zIndex: 5, top: 10, left: 10, cursor: 'pointer'}} src="https://cdn-icons-png.flaticon.com/128/189/189254.png" width={45} height={45} alt="" /></a>
      
      <div ref={chartContainerRef} style={{ width: '70vw', height: '70vh', backgroundColor: "gray", marginTop: 40, overflow: "hidden" }} />

      <div style={{position: "absolute", zIndex: 5, bottom: 60, left: 0, width: "100%", display: "flex", justifyContent: "center"}}>
        <div style={{display: "flex", justifyContent: "center", gap: 35, width: "80%", minWidth: 500, overflow: "auto"}}>
          {timeFrames.map((tf) => (
            <TimeComp key={tf} time={tf} cur={time} setTime={setTime} />
          ))}
        </div>
      </div>
    </>
  )
};

export default CandleVolumeChart;