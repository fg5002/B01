<script>
  import L from 'leaflet';
  import {getContext, setContext, onMount} from 'svelte';
  import 'leaflet.markercluster/dist/leaflet.markercluster.js';
  import 'leaflet.markercluster/dist/MarkerCluster.css';
  import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

  let children = $props();

  let markerCluster = $state();
  let markerClusterContainer = $state();

  const map = getContext('map');

  setContext('markercluster', ()=> markerCluster);

  onMount(()=> {

    markerCluster = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true
    }).addTo(map());

    return ()=> {
      markerCluster?.remove();
      markercluster = undefined;
    };
  });

</script>

<div bind:this={markerClusterContainer}>
  {#if markerCluster}
    {@render children?.()}
  {/if}
</div>