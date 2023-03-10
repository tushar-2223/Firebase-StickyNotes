import React, { useState, useEffect } from 'react';
import Card from './Card';
import fireDB from '../firebase';

const Home = () => {

  // fetch detail on firebase
  const [data, setData] = useState({});

  useEffect(() => {
    fireDB.child("sticky-notes-db").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    }
  }, []);

  return (
    <div className="container flex flex-wrap justify-center p-5 mt-0">
      {Object.keys(data).map((id) => (
        <>
          <Card noteData={data} id={id} />
        </>
      ))}
    </div>
  )
}

export default Home