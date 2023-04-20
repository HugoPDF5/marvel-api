import { useState, useEffect } from 'react';
import { Alert, AlertIcon, Box, Button, Center, FormControl, FormLabel, Input, Spinner } from '@chakra-ui/react';

interface MapGoogleProps { }

interface SelectedPlace {
  formatted_address: string;
}

const MapGoogle: React.FC<MapGoogleProps> = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);

  useEffect(() => {
    const mapElement = document.getElementById('map');

    if (!mapElement) return;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_API_URL_GOOGLE_KEY}&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);

    window.initMap = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userLatLng = { lat: position.coords.latitude, lng: position.coords.longitude };
          const mapOptions: google.maps.MapOptions = {
            center: userLatLng,
            zoom: 16,
            disableDefaultUI: true,
          };
          const newMap = new window.google.maps.Map(mapElement, mapOptions)
          newMap.addListener('click', handleMapClick);
          setMap(newMap);
        });
      } else {
        const mapOptions: google.maps.MapOptions = {
          center: { lat: -23.5489, lng: -46.6388 },
          zoom: 16,
          disableDefaultUI: true,
        };
        const newMap = new window.google.maps.Map(mapElement, mapOptions);
        newMap.addListener('click', handleMapClick);
        setMap(newMap);
      }
    };
  }, []);

  function handleClick() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 2000);
  }

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
        console.log(`Geocoder failed with status ${status}`);
      }
    });
  };

  return (
    <>
      <Box mb={4} id="map" h="300px" w="100%" />
      {selectedPlace && (
        <FormControl id="formatted-address">
          <FormLabel>Address</FormLabel>
          <Input type="text" value={selectedPlace.formatted_address} isReadOnly />
        </FormControl>
      )}
      <Center mt={8}>
        {isSent ? (
          <Alert status="success">
            <AlertIcon />
            The products will reach you as soon as possible!
          </Alert>
        ) : (
          <Button
            onClick={handleClick}
            color="white"
            variant="solid"
            background="red"
            size="lg"
            _hover={{ color: "red", background: "white" }}
          >
            {isLoading ? (
              <Center>
                <Spinner thickness="4px" speed="0.4s" emptyColor="yellow" color="white" size="xl" />
              </Center>
            ) : (
              "Send to your address"
            )}
          </Button>
        )}
      </Center>
    </>
  );
};

export default MapGoogle;