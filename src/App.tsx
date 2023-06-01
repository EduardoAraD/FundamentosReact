import './global.css'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { Post, PostType } from './components/Post'

import styles from './App.module.css'

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/eduardoarad.png',
      name: 'Eduardo Araujo',
      role: 'Dev Mobile'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 
        'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'jane.design/doctorcare' },
      { type: 'hash', content: '#novoprojeto #nlw #rocketseat' },
    ],
    publishedAt: new Date('2023-05-30 08:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/diego3g.png',
      name: 'Diego Fernandes',
      role: 'CTO Rocketseat'
    },
    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 
        'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'jane.design/doctorcare' },
      { type: 'hash', content: '#novoprojeto #nlw #rocketseat' },
    ],
    publishedAt: new Date('2023-05-30 09:00:00'),
  }
]

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => (
            <Post
              post={post}
            />
          ))}
        </main>
      </div>
    </div>
  )
}
