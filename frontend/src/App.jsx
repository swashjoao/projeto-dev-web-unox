import {useCallback, useState} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import TaskList from './pages/tasks/TaskList';
import Categories from './pages/categories/Categories';
import NewTaskPage from './pages/tasks/NewTaskPage';

// Componente de rota protegida
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Componente de rota pública
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" /> : children;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
    const [tasks, setTasks] = useState([]);


    const handleTaskUpdated = useCallback((updatedTask, isNew = false) => {
        if (isNew) {
            setTasks(prevTasks => [...prevTasks, updatedTask]);
        } else {
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === updatedTask.id ? updatedTask : task
                )
            );
        }
    }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Routes>
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Layout darkMode={darkMode} setDarkMode={setDarkMode} />
                    </PrivateRoute>
                }
            >
                <Route
                    index
                    element={
                        <TaskList
                            tasks={tasks}
                            setTasks={setTasks}
                            onTaskUpdated={handleTaskUpdated}
                        />
                    }
                />
                <Route
                    path="tasks"
                    element={
                        <TaskList
                            tasks={tasks}
                            setTasks={setTasks}
                            onTaskUpdated={handleTaskUpdated}
                        />
                    }
                />
                <Route
                    path="tasks/new"
                    element={
                        <NewTaskPage onTaskUpdated={handleTaskUpdated} />
                    }
                />
                <Route
                    path="tasks/edit/:id"
                    element={
                        <NewTaskPage editMode={true} onTaskUpdated={handleTaskUpdated} />
                    }
                />
                <Route path="categories" element={<Categories />} />
            </Route>
          
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;