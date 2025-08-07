import React from "react";
import data from "./dataset.jsx"; // 
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS } from 'chart.js/auto';

const Charts = () =>{
  return (
    <div className="pl-10">
        <h1 className="text-xl font-bold pb-5">Grafik Penjualan CEMILQUE</h1>
        <div className="relative w-full h-96">
            <Bar
            data={{
                labels: data.map(item => item.Produk),
                datasets: [
                {
                    label: 'Jumlah',
                    data: data.map(item => item.Jumlah),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
                ],
            }}
            options={{
                responsive: true,
                plugins: {
                legend: {
                    position: 'top',
                },
                },
            }}
            />
        </div>
    </div>
  );
};

export default Charts;