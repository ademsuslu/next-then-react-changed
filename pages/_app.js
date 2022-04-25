import '../styles/globals.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Layout from '../Components/Layout'
import { useEffect, useState } from 'react'
import { AppProvider } from '../Context'
function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({}) // Butun Componentlere yaymak için
  useEffect(() => { // hersayfa calıstıgında userı set et
   console.log(user);
    setUser(
      JSON.parse((localStorage.getItem('user'))) ?? {} // localStorage içinden user' çek ve parse et, eğer localStorage içinde user varsa onu kullan yoksa {} boş obje kullan 
      );
  }, [])
  
  return <AppProvider value={{ user, setUser }}>
    <Layout>
      <Component {...pageProps} />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></script>
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.6/dist/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossOrigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossOrigin="anonymous"></script>
    </Layout>
  </AppProvider>
}
export default MyApp
