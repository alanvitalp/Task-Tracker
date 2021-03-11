import { useState } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './About'


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctors Appointment',
      day: 'feb 5th at 12am',
      reminder: true,
    },
    {
      id: 2,
      text: 'Meeting at School',
      day: 'jan 2th at 10am',
      reminder: false,
    },
    {
      id: 3,
      text: 'Food shopping',
      day: 'mar 8th at 14am',
      reminder: false,
    }
  ]);


  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1


    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask
          (!showAddTask)}
          showAdd={showAddTask}
        />

        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask}
              />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No tasks to show'
              )}
            </>
          )}
        />
        <Route path='/about' component={About} />
        <Footer />

      </div>
    </Router>
  );
}

export default App;
