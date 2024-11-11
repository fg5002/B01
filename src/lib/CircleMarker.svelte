<script>
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import { onMount, getContext, setContext } from 'svelte';
  import {mapState} from '$lib/store';

  let { 
    circlemarkerPosition = $mapState.center,
    children
  } = $props();

  let circlemarkerContainer = $state();
	let circlemarker = $state();

  const { getMap } = getContext('map');
	const map = getMap();

  setContext('layer', {getLayer: ()=> circlemarker});

  onMount(()=> {
    circlemarker = L.circleMarker(circlemarkerPosition, {
      fillColor: 'yellowgreen',
      radius: 7,
      color: 'black',
      weight: 1,
      opacity: 1.0,
      fillOpacity: 0.5
    })
    .addTo(map);
    
    return ()=> {
      circlemarker?.remove();
      circlemarker = undefined;
    };
	});
  
</script>

<div bind:this={circlemarkerContainer}>
  {#if circlemarker}
    {@render children?.()}
  {/if}
</div>