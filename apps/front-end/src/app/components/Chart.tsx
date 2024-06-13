import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import ChartJS, { ChartData, ChartOptions } from 'chart.js/auto'; // Importa 'chart.js/auto' para incluir todas las funcionalidades

interface ChartProps {
    currencyPair: string;
}

const Chart: React.FC<ChartProps> = ({ currencyPair }) => {
    const [chartData, setChartData] = useState<ChartData<'line'>>({
        labels: [],
        datasets: [
            {
                label: 'Close Price',
                data: [],
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
        ],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://fe-challenge.cicadatech.net/historic-data/${currencyPair}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                const dates = data['Time Series FX'].map((entry: any) => entry.date);
                const closePrices = data['Time Series FX'].map((entry: any) => parseFloat(entry.close));

                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Close Price',
                            data: closePrices,
                            borderColor: 'rgba(75,192,192,1)',
                            fill: false,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [currencyPair]);

    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Historic Data Chart',
            },
        },
        scales: {
            x: {
                type: 'time', // Utiliza 'time' como tipo de escala x
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Price',
                },
            },
        },
    };

    return (
        <div>
            <h2>Line Chart Example</h2>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default Chart;
