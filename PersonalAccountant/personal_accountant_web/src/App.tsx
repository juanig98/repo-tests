import './App.css'
import FullView from './components/FullView/FullView';
import TabsCards from './components/TabsCards/TabsCards'
import Toolbar from './components/Toolbar/Toolbar'
 

function viewMode() {
  const fullViewActive = localStorage.getItem('fullview');

  console.log(fullViewActive);
  
  return fullViewActive === 'true' ? <FullView /> : <TabsCards />
}
function App() {

  return (
    <div className="App">

      <Toolbar />

      {viewMode()}

    </div>
  )
}

export default App
