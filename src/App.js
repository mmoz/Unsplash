import './App.css';
import PhotoComponent from './Components/PhotoComponents';
import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';

function App() {
  const apiKey = '';

  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);

  const fetchImage = async () => {
    setLoad(true);
    try {
      const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setPhotos((oldData) => {
        return [...oldData, ...data];
      });
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  useEffect(() => {
    fetchImage();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (window.innerHeight + window.scrollY > document.body.offsetHeight - 500 && !load) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener('scroll', event);
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <Navbar />
      <section className='photos'>
        <div className='display-photo'>
          {photos.map((data, index) => {
            return <PhotoComponent key={index} {...data} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default App;
