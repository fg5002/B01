<script>
  import Leaflet from "$lib/Leaflet.svelte"
  import {mapState} from '$lib/store';
  import Marker from "$lib/Marker.svelte";
  import Popup from "$lib/Popup.svelte";
  import CircleMarker from "$lib/CircleMarker.svelte";
  import Cursor from "$lib/Cursor.svelte";
  import Control from "$lib/Control.svelte";

  let showcursor = $state(false);

  const onMapStateChange = (d)=> $mapState = d;

  const onclick = (e) =>{
    console.log(e);
    showcursor = false;
  }

  const toggleCursor = ()=> {
    showcursor = !showcursor;
  }

</script>

<Leaflet
  mapState = {$mapState}
  {onMapStateChange}
>

  <Control position={'bottomleft'}>
    <button 
      class="flex justify-center px-2 py-1 font-bold text-white bg-red-500 border-2 border-black rounded-md" 
      onclick={toggleCursor}
    >Cursor</button>
  </Control>

  {#if showcursor}
    <Cursor {onclick} />
  {/if}

  <Marker markerPosition = {[47.391657,19.03352]}>
    <Popup>
      <div class="flex flex-col justify-center w-64 gap-1 p-2 bg-yellow-200">
        <div class="font-bold whitespace-nowrap">Uhu</div>
        <div class="italic whitespace-nowrap">Bubo bubo</div>
      </div>
    </Popup>    
  </Marker>

  <CircleMarker>
    <Popup>
      <div class="flex flex-col justify-center w-64 gap-1 p-2 bg-yellow-200">
        <div class="font-bold whitespace-nowrap">Nagy fülemüle</div>
        <div class="italic whitespace-nowrap">Luscinia luscinia</div>
      </div>
    </Popup>   
  </CircleMarker>

</Leaflet>