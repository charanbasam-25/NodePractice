import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';



// 1: {}, 2: {}
const theatreData = [
  {
    
    _id: 1,
    name: 'Theatre 1',
    location: 'Location 1',
    shows: [
      { time: '10:00 AM', name: '', _id: '' },
      { time: '01:00 PM', name: '', _id: ''  },
      { time: '04:00 PM', name: '', _id: ''  },
    ],
  },
  {
    _id: 2,
    name: 'Theatre 2',
    location: 'Location 2',
    shows: [
      { time: '11:00 AM', name: '', _id: ''  },
      { time: '02:00 PM', name: '', _id: ''  },
      { time: '05:00 PM', name: '', _id: ''  },
    ],
  },
  // Add more theatre objects here
];


const theatreAndShowsMapper = (data) => {
  const obj = data.reduce((acc, show) => {
    if (!acc[show.theater._id]) {
      acc[show.theater._id] = { ...show.theater, shows: [] };
    }
    acc[show.theater._id].shows.push({
      _id: show._id,
      name: show.name,
      time: show.time,
    });

    return acc;
  }, {});

  return Object.values(obj);
}

const Theatres = () => {
  const [theatres, setTheatres] = useState([]);
  const { movieId } = useParams();
  let jwtToken=""
  if(localStorage.getItem('jwtToken')){
     jwtToken= localStorage.getItem('jwtToken');
  }
  useEffect(() => {
    fetch(`http://localhost:5000/api/show?movie=${movieId}`, {
      headers: {
        jwttoken: jwtToken
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data,"data----")
        setTheatres(theatreAndShowsMapper(data));
      });
  }, []);
console.log(theatres,"theaters----")
  return (
    <div className="min-h-screen p-4 bg-lightgold">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Theatres</h2>
        <div className="grid grid-cols-1 gap-6">
          {theatres.map((theatre) => (
            <div key={theatre.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex p-4">
                <div className='flex flex-col mr-10 w-32'>
                    <h3 className="text-xl font-semibold mb-2">{theatre.name}</h3>
                    <p className="text-gray-600 mb-2">{theatre.location}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {theatre.shows.map((show, index) => (
                    <Link to={`/movie/${movieId}/theaters/${theatre._id}/shows/${show._id}`}>
                    <button
                      key={index}
                      className="h-10 bg-lightgold hover:text-white text-maroon font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline align-middle"
                    >
                      {show.time}
                    </button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Theatres;