import Home from './components/Home'
import Login from './components/Login'
import Notfound from './components/Notfound'
import Jobs from './components/Jobs'
import ProtectedRoute from './components/ProtectedRoute'
import JobItemDetails from './components/JobItemDetails'
import { BrowserRouter,Route,Switch } from 'react-router-dom'
const App=()=>{
    return(
        <BrowserRouter>
            <Switch>
                <ProtectedRoute exact path="/home" component={Home}/>
                <Route exact path="/" component={Login}/>
                <ProtectedRoute exact path="/jobs" component={Jobs}/>
                <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails}/>
                <Route component={Notfound}/>
            </Switch>
        </BrowserRouter>
    )
}
export default App