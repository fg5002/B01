<script>
  import L from 'leaflet';
  import {getContext, onMount} from 'svelte';
  
  let {
    data,
    fillcolor = 'yellowgreen', 
    color = 'black', 
    children
  } = $props();
  
  let geojson = $state();
  let geojsonContainer = $state();

  const { getMap } = getContext('map');
	const map = getMap();

  $effect(()=> geojson && geojson.clearLayers().addData(data));

  const popupContent = (data)=> {
    return  `<div class="flex flex-col justify-center p-2 bg-yellow-200">
              <div class="font-bold whitespace-nowrap">${data}</div>
            </div>`
  }

  onMount(()=> {
    if(map){
      geojson = L.geoJSON(data, {

        onEachFeature: (feature, layer)=> {
          layer.bindPopup(
            popupContent(feature.properties.data), 
            {closeButton: false, offset: [0,-5]}
          )      
        },

        pointToLayer: (feature, latlng)=> L.circleMarker(latlng),

        style: {      
          fillColor: fillcolor,
          radius: 7,
          color: color,
          weight: 1,
          opacity: 1.0,
          fillOpacity: 1.0
        }

      }).addTo(map);

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