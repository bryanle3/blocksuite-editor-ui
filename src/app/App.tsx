import { EditorProvider } from './components/EditorProvider';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import EditorContainer from './components/EditorContainer';
import './index.css';

export default function App() {
  return (
    <EditorProvider>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <TopBar />
          <div className="mt-4">
            <EditorContainer />
          </div>
        </div>
      </div>
    </EditorProvider>
  );
}
