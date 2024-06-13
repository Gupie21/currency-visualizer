import React, { useEffect, useState } from 'react';
import { HistoricData } from '../../types/historicData';

interface HistoricPricesTableProps {
    currencyPair: string;
}

const HistoricPricesTable: React.FC<HistoricPricesTableProps> = ({ currencyPair }) => {
    const [historicData, setHistoricData] = useState<HistoricData[]>([]);

    useEffect(() => {
        fetch(`https://fe-challenge.cicadatech.net/historic-data/${currencyPair}`)
            .then((response) => response.json())
            .then((data) => setHistoricData(data['Time Series FX']));
    }, [currencyPair]);

    return (
        <div className="table">
            <h2>Historic Prices</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Open</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Close</th>
                    </tr>
                </thead>
                <tbody>
                    {historicData.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.date}</td>
                            <td>{entry.open}</td>
                            <td>{entry.high}</td>
                            <td>{entry.low}</td>
                            <td>{entry.close}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoricPricesTable;
