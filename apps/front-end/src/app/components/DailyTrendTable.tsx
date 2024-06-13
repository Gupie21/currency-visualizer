import React, { useEffect, useState } from 'react';
import { FXData } from '../../types/fxData';

interface DailyTrendProps {
    currencyPair: string;
}

const DailyTrendTable: React.FC<DailyTrendProps> = ({ currencyPair }) => {
    const [trendData, setTrendData] = useState<FXData[]>([]);

    useEffect(() => {
        fetch(`https://fe-challenge.cicadatech.net/historic-data/${currencyPair}`)
            .then((response) => response.json())
            .then((data) => {
                const transformedData = data['Time Series FX'].map((entry: FXData) => ({
                    ...entry,
                    difference: parseFloat(entry.close) - parseFloat(entry.open),
                }));

                setTrendData(transformedData);
            });
    }, [currencyPair]);

    return (
        <div className="trend-table">
            <h2>Daily Trend Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Open</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Close</th>
                        <th>Difference</th>
                    </tr>
                </thead>
                <tbody>
                    {trendData.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.date}</td>
                            <td>{entry.open}</td>
                            <td>{entry.high}</td>
                            <td>{entry.low}</td>
                            <td>{entry.close}</td>
                            <td>{entry.difference}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DailyTrendTable;
