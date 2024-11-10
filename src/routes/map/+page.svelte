<script>
  import Leaflet from "$lib/Leaflet.svelte"
  import {mapState} from '$lib/store';
  import Marker from "$lib/Marker.svelte";
  import Popup from "$lib/Popup.svelte";

    let mpos = [47.391457,19.03352];

  const handleMessage = (d)=> {
    $mapState = d
    console.log(JSON.stringify($mapState))
  }

</script>

<Leaflet
  mapState = {$mapState}
  onMapStateChange = {handleMessage}
>
  <Marker markerPosition = {$mapState.center}>
    <Popup>
      <div class="flex items-center justify-center w-64 gap-1 p-2 bg-yellow-200">
        <div>Rabszolgahangya</div>
        <div>officinalis</div>
      </div>
    </Popup>
  </Marker>
</Leaflet>