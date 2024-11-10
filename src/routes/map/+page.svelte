<script>
  import Leaflet from "$lib/Leaflet.svelte"
  import {mapState} from '$lib/store';

  const handleMessage = (d)=> {
    $mapState = d
    console.log(JSON.stringify($mapState))
  }

</script>

<Leaflet
  mapState = {$mapState}
  onMapStateChange = {handleMessage}
></Leaflet>