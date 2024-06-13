// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import React, { useState } from 'react';
import Banner from './components/Banner';
import HistoricPricesTable from './components/HistoricPriceTable';
import DailyTrendTable from './components/DailyTrendTable';
import Chart from './components/Chart';
import TabNavigation from './components/TabNavigation';

const App: React.FC = () => {
    const [selectedCurrency, setSelectedCurrency] = useState<string>('EURUSD');

    return (
        <div className="app">
            <Banner currencyPair={selectedCurrency} />
            <TabNavigation onSelectCurrency={setSelectedCurrency} />
            <div className="content">
                <Chart currencyPair={selectedCurrency} />
                <HistoricPricesTable currencyPair={selectedCurrency} />
                <DailyTrendTable currencyPair={selectedCurrency} />
            </div>
        </div>
    );
};

export default App;
