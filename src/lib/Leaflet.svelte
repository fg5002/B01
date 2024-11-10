<script>
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import { onMount, setContext } from 'svelte';

	let {
		mapState,
    onMapStateChange,
		children
	} = $props();

	let mapContainer = $state();
	let map = $state();
  let currentMapState = $state(mapState);

  setContext('map', {getMap: ()=> map});

  const latLngToLatlngArray = (a)=> [a.lat, a.lng].map(c=>parseFloat(c.toFixed(6)));

  const mapStateChange = (a)=> {
    Array.isArray(a) ? currentMapState.center = a : currentMapState.zoom = a;
		onMapStateChange(currentMapState);
	}

  onMount(()=> {
    map = L.map(mapContainer, {
      center: mapState.center, 
      zoom: mapState.zoom
    })
    .on('dragend', ()=> mapStateChange(latLngToLatlngArray(map.getCenter())))
    .on('zoomend', ()=> mapStateChange(map.getZoom()));

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 7,
      maxZoom: 19,
      attribution: '&copy; OpenstreetMap',
      crossOrigin : true
    }).addTo(map);
    
    return ()=> {
      map?.remove();
      map = undefined;
    };
	});
  
</script>

<div class="w-full h-full z-1000" bind:this={mapContainer}>
  {#if map}
    {@render children?.()}
  {/if}
</div>;