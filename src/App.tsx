import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import TaskList from './components/TaskList';

// Används för att hantera konfiguration och state av ens queries i sin applikation.
// QueryClient instancen är en central hub för att hantera data fetching och caching i sin applikation.
// Den håller state för alla queries, hanterar caching och förser med ett set av metoder för att interagera med data
// fetching procesen.
const queryClient = new QueryClient(); 

function App() {

  return (
    <Container maxWidth="xl"> 
      <CssBaseline /> // Fixar ojämnheter mellan olika browsers
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Todo List
          </Typography>
        </Toolbar>
      </AppBar>
      <QueryClientProvider client={queryClient}>
        <TaskList />
      </QueryClientProvider>
    </Container>
    );
}

export default App;
