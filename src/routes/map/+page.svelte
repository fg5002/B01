<script>
  import Leaflet from "$lib/Leaflet.svelte"
  import {mapState, sampleData} from '$lib/store';
  import Popup from "$lib/Popup.svelte";
  import CircleMarker from "$lib/CircleMarker.svelte";
  import Cursor from "$lib/Cursor.svelte";
  import Control from "$lib/Control.svelte";
  import GeoJson from "$lib/GeoJson.svelte";

  let showcursor = $state(false);

  const onMapStateChange = (d)=> $mapState = d;

  const onclick = (e) =>{
    addNewData(e);
    showcursor = false;
  }

  const toggleCursor = ()=> {
    showcursor = !showcursor;
  }

  const addNewData = (c)=> {
    [c[0], c[1]] = [c[1], c[0]];
    let f = {
      'type': 'Feature',
      'properties': {
        data: `Zab-${$sampleData.features.length}`,
      },
      'geometry': {
        'type': 'Point',
        'coordinates': c,
      }
    }
    $sampleData.features = [...$sampleData.features, f];
  }

</script>

<Leaflet
  mapState = {$mapState}
  {onMapStateChange}
>
  <GeoJson data={$sampleData}/>

  <Control position={'bottomleft'}>
    <button 
      class="flex justify-center px-2 py-1 m-4 text-lg font-bold text-white bg-red-500 border-2 border-black rounded-md" 
      onclick={toggleCursor}
    >Cursor</button>
  </Control>

  {#if showcursor}
    <Cursor {onclick} />
  {/if}

  <CircleMarker position ={[47.391857,19.03652]}>
    <Popup>
      <div class="flex flex-col justify-center w-64 gap-1 p-2 bg-yellow-200">
        <div class="font-bold whitespace-nowrap">Nagy fülemüle</div>
        <div class="italic whitespace-nowrap">Luscinia luscinia</div>
      </div>
    </Popup>   
  </CircleMarker>

</Leaflet>