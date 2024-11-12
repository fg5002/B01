<script>
  import L from 'leaflet';
  import {getContext, onMount} from 'svelte';
  import Popup from "$lib/Popup.svelte";
  import CircleMarker from "$lib/CircleMarker.svelte";
  
  let {
    data,
    fillcolor = 'lime', 
    color = 'black', 
    children
  } = $props();
  
  let geojson = $state();
  let geojsonContainer = $state();

  const { getMap } = getContext('map');
	const map = getMap();

  $effect(()=> geojson && geojson.clearLayers().addData(data));

  const options = {
    onEachFeature: (feature, layer)=> {
      layer.bindPopup(feature.properties.data,{
        closeButton: false,
        offset: L.point({x:0, y:-5}),
        maxWidth: 200       
      })      
    },

    pointToLayer: (feature, latlng)=>{
      return L.circleMarker(latlng)
    },

    style: {      
      fillColor: fillcolor,
      radius: 7,
      color: color,
      weight: 1,
      opacity: 1.0,
      fillOpacity: 1.0
    }
  }

  onMount(()=> {
    if(map){
      geojson = L.geoJSON(data, options).addTo(map);

      return ()=> {
        geojson?.remove();
        geojson = undefined;
      };
    }
  });

</script>

<div bind:this={geojsonContainer}>
  {#if geojson}  
    {@render children?.()}
  {/if}
</div>