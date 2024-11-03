// import React, { useEffect, useState } from 'react';
// import { Map,APIProvider, Marker, AdvancedMarker } from '@vis.gl/react-google-maps';
// import { HeatmapLayer } from '@deck.gl/aggregation-layers';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import { useGetIncidentsQuery } from '../slices/IncidentApiSlice';
// import { useDispatch,useSelector } from 'react-redux';
// import { fetchIncidents } from '../slices/IncidentsSlice';
// import { Suspense } from 'react';

// const API_KEY = "AIzaSyAeL0NOt9Z0u3wdU451MynINYppACDdcJY"; // Replace with your Google Maps API key


// const center = { lat: 36.81897, lng: 10.16579 };

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

// function Heatmap() {
//   const [pointsData, setPointsData] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [currentIncident , setCurrentIncident] = useState({
//     location:"", // Creating a LatLng object
//     description: "",
//     timestamp: "",
//     id:""

// })
//   const handleOpen = () => setModalOpen(true);
//   const handleClose = () => setModalOpen(false);

//   const { data, isLoading, isError, error } = useGetIncidentsQuery({refetchOnMountOrArgChange: true});
//   const dispatch = useDispatch();
//   const incidents = useSelector((state) => state.incidents);
  


//   // Fetch points from the JSON file
//   useEffect(() => {
//     if(!isLoading){
//     const loadPointsData = async () => {
//       try {
//         // const response = await fetch('/points_tunis.json');
//         // const data = await response.json();
//         console.log(data)

//         const points = data.map(point => ({
//           location: new google.maps.LatLng(point.location[0], point.location[1]), // Creating a LatLng object
//           description: point.description,
//           timestamp: point.timestamp,
//           id: point.id,
//         }));

//         console.log(points)

//         // Set points data to local state if needed
//         setPointsData(points);



//         // Dispatch the points to your Redux store
//         dispatch(fetchIncidents(points)); // Pass the mapped points data
//         console.log(incidents)
//       } catch (error) {
//         console.error('Error loading points:', error);
//       }
//     }
//     loadPointsData();
//     };

//      // Call the async function

//   }, [data]);







//   const addMarkerOnClick = (location) => {
//     console.log(location.detail.latLng)
//     const newMarkerPos = new google.maps.LatLng(location.detail.latLng.lat, location.detail.latLng.lng)
//     console.log(pointsData)
    
//     const newIncident = {
//         location: newMarkerPos,
//         description:"",
//         timestamp:"",
//         id: pointsData.length+1
//     }
    

//     const Markers = [...pointsData]
//     console.log(pointsData)


//     Markers.push(newIncident)
//     setPointsData(Markers)


// }

// const handleMarkerClick = (e,pos) => {
//     console.log(e)
//     handleOpen()
//     setCurrentIncident(pos)
//     console.log(pos)

//     return null;
// }





//   return (
//     <>
//     <APIProvider apiKey={API_KEY}>
    
//     <Map
//         style={{width: '100vw', height: '100vh'}}
//         defaultCenter={{lat: 36.802192, lng: 10.178743}}
//         defaultZoom={12}
//         gestureHandling={'greedy'}
//         disableDefaultUI={true}
//         mapId={"35d516d6074145e9"}
//         onClick={(e)=>{addMarkerOnClick(e)}}
//     >
        

//         {isLoading ?  <Suspense></Suspense> : pointsData.map( pos => <AdvancedMarker key={pos.id} onClick={(e)=>handleMarkerClick(e,pos)} position={pos.location} />)}


//     </Map>
//     </APIProvider>
//     <Modal
//     open={modalOpen}
//     onClose={handleClose}
//     aria-labelledby="modal-modal-title"
//     aria-describedby="modal-modal-description"
//   >
//     <Box sx={style}>
//       <Typography id="modal-modal-title" variant="h6" component="h2">
//         Incident : 
//       </Typography>
//       <Typography id="modal-modal-description">
//         {currentIncident.description != "" ? currentIncident.description : "None set"}
//       </Typography>
//       <Typography id="modal-modal-title" variant="h6" component="h2">
//         Timestamp :     
//       </Typography>
//       <Typography id="modal-modal-description">
//       {currentIncident.timestamp != "" ? currentIncident.timestamp : "None set"}
//       </Typography>
//     </Box>
//   </Modal>


//   </>
//   );
// }

// export default Heatmap;

import React, { useEffect, useState } from 'react';
import { Map,APIProvider, Marker, AdvancedMarker } from '@vis.gl/react-google-maps';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useGetIncidentsQuery } from '../slices/IncidentApiSlice';
import { useDispatch } from 'react-redux';
import { fetchIncidents } from '../slices/IncidentsSlice';

const API_KEY = "AIzaSyAeL0NOt9Z0u3wdU451MynINYppACDdcJY"; // Replace with your Google Maps API key


const center = { lat: 36.81897, lng: 10.16579 };

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function Heatmap() {
  const [pointsData, setPointsData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIncident , setCurrentIncident] = useState({
    location:"", // Creating a LatLng object
    description: "",
    timestamp: "",
    id:""

})
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const { data, isLoading, isError, error } = useGetIncidentsQuery({refetchOnMountOrArgChange: true});
  const dispatch = useDispatch();
  console.log(data);


  // Fetch points from the JSON file
  useEffect(() => {
    fetch('/points_tunis.json')
      .then(response => response.json())
      .then(data => {
        const points = data.points.map(point => ({
            location: new google.maps.LatLng(point.lat, point.lng), // Creating a LatLng object
            description: point.incidentDescription,
            timestamp: point.timestamp,
            id:point.id

        }));            
        setPointsData(points);
      })
      .catch(error => console.error('Error loading points:', error));
      dispatch(fetchIncidents(data))

    
  }, []);


  useEffect(()=>{},[])


  const addMarkerOnClick = (location) => {
    console.log(location.detail.latLng)
    const newMarkerPos = new google.maps.LatLng(location.detail.latLng.lat, location.detail.latLng.lng)
    
  
    var newDescription = prompt("enter description")
    var newTimestamp = prompt("enter time")
    
    const Markers = [...pointsData]

    var newIncident = {
        location: newMarkerPos,
        description:newDescription,
        timestamp:newTimestamp,
        id: pointsData.length+1
    }
    if(newIncident.location == "" || newIncident.description == ""){
        return;
    }

    Markers.push(newIncident)
    setPointsData(Markers)


}

const handleMarkerClick = (e,pos) => {
    console.log(e)
    handleOpen()
    setCurrentIncident(pos)
    console.log(pos)

    return null;
}





  return (
    <>
    <APIProvider apiKey={API_KEY}>
    <Map
        style={{width: '100vw', height: '100vh'}}
        defaultCenter={{lat: 36.802192, lng: 10.178743}}
        defaultZoom={12}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={"35d516d6074145e9"}
        onClick={(e)=>{addMarkerOnClick(e)}}
    >

        {pointsData.map( pos => <AdvancedMarker key={pos.id} onClick={(e)=>handleMarkerClick(e,pos)} position={pos.location} />
)}


    </Map>
    </APIProvider>
    <Modal
    open={modalOpen}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Incident : 
      </Typography>
      <Typography id="modal-modal-description">
        {currentIncident.description != "" ? currentIncident.description : "None set"}
      </Typography>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Timestamp :     
      </Typography>
      <Typography id="modal-modal-description">
      {currentIncident.timestamp != "" ? currentIncident.timestamp : "None set"}
      </Typography>
    </Box>
  </Modal>


  </>
  );
}

export default Heatmap;
