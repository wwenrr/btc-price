"use client"

import React, { useEffect, useRef, useState } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { GetCandles, GetLiveCandle } from '@/lib/sample';

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
  const chartContainerRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const volumeSeriesRef = useRef(null);
  const [canData, setCan] = useState<CandleData[]>([]);
  const [volData, setVol] = useState<VolumeData[]>([]);

  useEffect(() => {
    
    //@ts-ignore
    const chart = createChart(chartContainerRef.current, {
        //@ts-ignore
      width: chartContainerRef.current.clientWidth,
      //@ts-ignore
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: '#A9B5DF',
        textColor: '#333',
      },
      grid: {
        vertLines: {
            color: 'rgba(238, 238, 238, 0.6)',
        },
        horzLines: {
            color: 'rgba(238, 238, 238, 0.6)',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: '#ccc',
      },
      timeScale: {
        borderColor: '#ccc',
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

    const fetchData = async () => {
      const data = await GetCandles(currentTimeFrame, currentCoin);
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

    fetchData();

    const socket = new WebSocket(GetLiveCandle(currentTimeFrame, currentCoin));

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const candle = message.k; // Dữ liệu kline
    
      if (candle && candle.x) {  // Kiểm tra xem nến có đóng chưa
        const newCandle = {
          time: candle.t / 1000,  // Thời gian chuyển sang giây
          open: parseFloat(candle.o),
          high: parseFloat(candle.h),
          low: parseFloat(candle.l),
          close: parseFloat(candle.c),
        };
    
        // Kiểm tra dữ liệu nến mới
        if (
          !newCandle.time ||
          !newCandle.open ||
          !newCandle.high ||
          !newCandle.low ||
          !newCandle.close
        ) {
          console.error("Invalid candle data:", newCandle);
          return;
        }
    
        // Cập nhật dữ liệu nến
        setCan((prevCanData) => {
          const lastCandle = prevCanData[prevCanData.length - 1];
    
          if (lastCandle && newCandle.time < lastCandle.time) {
            console.error("New candle time is less than the last candle time:", newCandle.time, lastCandle.time);
            return prevCanData; // Không cập nhật nếu thời gian không hợp lệ
          }
    
          if (lastCandle && lastCandle.time === newCandle.time) {
            // Thay thế phần tử cuối cùng bằng nến mới
            const updatedCanData = [...prevCanData];
            updatedCanData[updatedCanData.length - 1] = newCandle;
            return updatedCanData;
          } else {
            // Thêm nến mới vào cuối mảng
            return [...prevCanData, newCandle];
          }
        });
    
        // Cập nhật dữ liệu volume
        setVol((prevVolData) => {
          const newVolumeData = {
            time: newCandle.time,
            value: parseFloat(candle.v),  // Sử dụng volume từ dữ liệu WebSocket
            color: newCandle.close > newCandle.open ? '#26a69a' : '#ef5350',
          };
    
          const lastVolume = prevVolData[prevVolData.length - 1];
    
          if (lastVolume && lastVolume.time === newVolumeData.time) {
            // Thay thế phần tử cuối cùng bằng volume mới
            const updatedVolData = [...prevVolData];
            updatedVolData[updatedVolData.length - 1] = newVolumeData;
            return updatedVolData;
          } else {
            // Thêm volume mới vào cuối mảng
            return [...prevVolData, newVolumeData];
          }
        });
      }
    };
    

    return () => {
      chart.remove();
      socket.close();
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

  return (
    <>
      <a href="/"><img style={{position: "absolute", zIndex: 5, top: 10, left: 10, cursor: 'pointer'}} src="https://cdn-icons-png.flaticon.com/128/189/189254.png" width={45} height={45} alt="" /></a>
      
      <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />
    </>
  )
};

export default CandleVolumeChart;