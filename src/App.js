import { useEffect, useState } from 'react'
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth'
import { useCookies } from 'react-cookie'



const getDate = () => {
  const today = new Date()
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return today.toLocaleDateString('en-US', options)
}

const formatTime = (date) => {
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const [ tasks, setTasks] = useState(null)
  const [currentDate, setCurrentDate] = useState(getDate())
  const [currentTime, setCurrentTime] = useState(formatTime(new Date()))

  

  const getData =  async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const json = await response.json()
      console.log(json)
      setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (authToken) {
      getData()
    }}
  , [])

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(formatTime(new Date())), 1000)
    return () => clearInterval(interval)
  }, [])

  console.log(tasks)

  // Sort by Date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  



  return (
   
    <div className='app'>
      {!authToken && <Auth/>} 
      {authToken &&
      <>
      <ListHeader listName={'✔️ TaskTracker'} getData={getData} />

      <div className='misc-info'>
      <p className='user-email'>Welcome {userEmail}</p>
      <div className='date-time'>
        <p className='date'>{currentDate}</p>
        <p className='time'>{currentTime}</p>
      </div>
      </div>
    
      
      {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData}/>)}
      </>}      
      <p className='copyright'>© Code Inc.</p>
    </div>
  )
}

export default App
