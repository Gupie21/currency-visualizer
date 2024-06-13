import React from 'react';

interface TabNavigationProps {
    onSelectCurrency: (currency: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ onSelectCurrency }) => {
    const currencyPairs = ['EURUSD', 'GBPUSD', 'USDJPY']; // puedes obtener estos valores de un API

    return (
        <div className="tab-navigation">
            {currencyPairs.map((pair) => (
                <button key={pair} onClick={() => onSelectCurrency(pair)}>
                    {pair}
                </button>
            ))}
        </div>
    );
};

export default TabNavigation;
