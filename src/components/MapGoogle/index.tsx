import { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';

interface MapGoogleProps { }

interface SelectedPlace {
  formatted_address: string;
}

const MapGoogle: React.FC<MapGoogleProps> = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(null);

  useEffect(() => {
    const mapElement = document.getElementById('map');

    if (!mapElement) return;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_API_URL_GOOGLE_KEY}&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);

    window.initMap = () => {
      const mapOptions: google.maps.MapOptions = {
        center: { lat: -23.5489, lng: -46.6388 },
        zoom: 15,
        disableDefaultUI: true,
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          mapOptions.center = { lat: position.coords.latitude, lng: position.coords.longitude };
        });
      }

      const newMap = new window.google.maps.Map(mapElement, mapOptions);
      newMap.addListener('click', handleMapClick);
      setMap(newMap);
    };
  }, []);

  const handleMapClick = (event: google.maps.MouseEvent): void => {
    const { latLng } = event;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK') {
        const place = results[0];
        setSelectedPlace({
          formatted_address: place.formatted_address!,
        });
      } else {
        console.log(`Geocoder falhou com status ${status}`);
      }
    });
  };

  return (
    <>
      <Box id="map" h="300px" w="100%" />
      {selectedPlace && (
        <FormControl id="formatted-address">
          <FormLabel>Endereço</FormLabel>
          <Input type="text" value={selectedPlace.formatted_address} isReadOnly />
        </FormControl>
      )}
    </>
  );
};

export default MapGoogle;