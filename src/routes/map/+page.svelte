<script>
  import Leaflet from "$lib/Leaflet.svelte"
  import {sampleData} from '$lib/store';
  import Popup from "$lib/Popup.svelte";
  import CircleMarker from "$lib/CircleMarker.svelte";
  import Cursor from "$lib/Cursor.svelte";
  import Control from "$lib/Control.svelte";
  import GeoJson from "$lib/GeoJson.svelte";
  import SubGroup from "$lib/SubGroup.svelte";
  import Layers from "$lib/Layers.svelte";
  import TileLayer from "$lib/TileLayer.svelte";
  import MarkerCluster from "$lib/MarkerCluster.svelte";

  let showcursor = $state(false);


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

<Leaflet>

  <Layers>      
    <TileLayer
      name={'OSM'}
      url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
      options={{ minZoom: 7, maxZoom: 19, attribution: '&copy; OpenstreetMap', crossOrigin : true}}
      selected
    />        
    <TileLayer
      name={'Google'}
      url={'https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga'}
      options={{ minZoom: 7, maxZoom: 21, attribution: '&copy; Google Maps', crossOrigin : true}}
    />  
    <TileLayer
      name={'Esri'}
      url={'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'}
      options={{ minZoom: 7, maxZoom: 19, attribution: '&copy; ESRI', crossOrigin : true}}
    />

    <TileLayer
      name={'Túristautak'}
      url={'http://{s}.map.turistautak.hu/tiles/turistautak/{z}/{x}/{y}.png'}
      options={{ minZoom:7, maxZoom:18, attribution: '&copy; Túristautak.hu', crossOrigin : true}}
    />

    <SubGroup name={"Sample"}>
      <GeoJson data={$sampleData}/>
    </SubGroup>     

  </Layers>
    
  <!--GeoJson name={"Sample"} data={$sampleData}/-->
  
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