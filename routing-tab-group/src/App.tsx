import { BrowserRouter, Route, Routes } from 'react-router';
import Container from './components/Container/Container';
import TabGroup from './components/TabGroup/TabGroup';
import Tab from './components/Tab/Tab';
import ContentBlock from './components/ContentBlock/ContentBlock';
import { contentObjects } from './constants';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <TabGroup>
          <Tab to="1" name="Cosmos" />
          <Tab to="2" name="Deep Sea" />
          <Tab to="3" name="Future Tech" />
        </TabGroup>
        <Routes>
          <Route path="1" element={<ContentBlock content={contentObjects.page1} />} />
          <Route path="2" element={<ContentBlock content={contentObjects.page2} />} />
          <Route path="3" element={<ContentBlock content={contentObjects.page3} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App;