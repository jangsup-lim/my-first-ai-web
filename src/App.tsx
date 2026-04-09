/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import PolicyInfo from './components/PolicyInfo';
import ProTips from './components/ProTips';
import Calculator from './components/Calculator';
import Community from './components/Community';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'policy':
        return <PolicyInfo />;
      case 'tips':
        return <ProTips />;
      case 'calc':
        return <Calculator />;
      case 'community':
        return <Community />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}
