import Layout from './components/Layout';
import Hero from './components/Hero';
import TheorySections from './components/TheorySections';

// 1. Import thêm các component còn thiếu
import MindMap from './components/MindMap';
import References from './components/References';
import TOC from './components/TOC';

export default function App() {
  return (
    <Layout>    
      <Hero />
      <TheorySections />
      <MindMap />
      <References />
    </Layout>
  );
}