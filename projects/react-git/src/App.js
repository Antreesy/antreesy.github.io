import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Test from './pages/Test'
import Notes from './pages/Notes'
import Create from './pages/Create'
import TicTac from './pages/TicTac'
import {createTheme, ThemeProvider} from "@mui/material/styles"
// import { deepPurple } from '@mui/material/colors'

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: '#cddc39',
  //   }
  // },
})


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Notes />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            {/* <Route path="/test">
              <Test />
            </Route> */}
            <Route path="/tictac">
              <TicTac />
            </Route>
          </Switch>
        </Layout>
      </Router>
   </ThemeProvider>
  );
}

export default App;
