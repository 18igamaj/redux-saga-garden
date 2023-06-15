import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    const reduxState = useSelector(store => store.plantList);

    useEffect(() => {
        console.log('component did mount');
        // dispatch an action to request the plantList from the API
        dispatch({type:'FETCH_PLANTS'})
    }, []); 

    const removePlant = (id) => {
        dispatch({
            type:'REMOVE_PLANT',
            payload: id
        })
    }

    return (
        <div>
            <h3>This is the plant list</h3>
            {/* <pre>{JSON.stringify(reduxState)}</pre> */}
        
            {reduxState.map((plant) => (
                <div key={plant.id}>
                <p > {plant.name} </p>
                <button onClick={() => removePlant(plant.id)}>Delete</button>
                </div>
                
            )) 
            }
        </div>
    );
    //{gifs.map((gif, i) => (
      //  <img key={i} src={gif.images.original.url}
}

export default PlantList;
