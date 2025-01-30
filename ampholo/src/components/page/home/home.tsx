import { Outlet } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Home
