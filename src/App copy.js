import { useEffect, useState } from "react";
import "./App.css";
import {Auth} from "./components/auth";
import {db} from "./config/firebase";
import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([])

  // New movie States
  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [newReceivedAnOscar, setNewReceivedAnOscar] = useState(false)

  // Update Title State
  const [updatedTitle, setUpdatedTitle] = useState("")

  const moviesCollectionRef = collection(db, "movies");
  
  const getMovieList = async() => {
    try{
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc)=> ({...doc.data(), id:doc.id,}));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    try{
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
    }catch (err) {
      console.error(err);
    }
  } 

  const updatesMovieTitle = async (id) => {
    try{
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, {title:updatedTitle});
      getMovieList();
    }catch (err) {
      console.error(err);
    }
  }

  useEffect (()=> {

    getMovieList();
  }, []);
  
  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle, 
        releaseDate:newReleaseDate, 
        receivedAnOscar: newReceivedAnOscar
      });

      getMovieList();
    }  catch (err) {
      console.error(err);
    }
  }

  return (
      <center>
        <div classname="App">
          <Auth/>
          <br/>
          <div>
            <input placeholder="Movie title..." onChange={(e)=> setNewMovieTitle(e.target.value)}/>
            <input placeholder="Release Date..." onChange={(e)=> setNewReleaseDate(Number(e.target.value))} type="number"/>
            <input type="checkbox" checked={newReceivedAnOscar} onChange={(e)=> setNewReceivedAnOscar(e.target.checked)} />
            <label>Received an Oscar </label>
            <button onClick={onSubmitMovie}>Submit Movie</button>
          </div><br/>
          <div>
            {movieList.map((movie)=> (
              <div>
                <h1 style={{color:movie.receivedAnOscar?"green":"red"}}> {movie.title} </h1>
                <p> Date: {movie.releaseDate} </p>

                <button onClick={()=> deleteMovie(movie.id)}> Delete Movie </button>
                <input placeholder="new title..." onChange={(e) => setUpdatedTitle(e.target.value)}/>
                <button onClick={()=> updatesMovieTitle(movie.id)}> Update</button>
                </div>
            ))}
          </div>
        </div>
      </center>
    );
}

export default App;