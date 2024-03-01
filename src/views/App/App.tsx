import React, { useEffect } from 'react'
import styles from './index.module.scss'
import { useToDoStore } from '../../data/stores/useToDoStore'
import InputPlus from '../components/InputPlus'
import InputTask from '../components/InputTask'

const App: React.FC = () => {
  const [
    tasks,
    createTask,
    removeTask,
    updateTask
  ] = useToDoStore((state) => [
    state.tasks,
    state.createTask,
    state.removeTask,
    state.updateTask
  ])

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To Do App</h1>
      <section className={styles.articleSection}>
        <InputPlus
          onAdd={(title) => {
            if (title) {
              createTask(title)
            }
          }}
        />
      </section>
      <section className={styles.articleSection}>
        {!tasks.length && (
          <p className={styles.articleText}>There is no one task.</p>
        )}
        {tasks.map((task) => (
          <InputTask id={task.id} title={task.title} onDone={removeTask} onRemoved={removeTask} onEdited={updateTask} key={task.id}/>
        ))}
      </section>
    </article>
  )
}

export default App