import { Box, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

function MapGoogle(props) {
    const [map, setMap] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState({
        formatted_address: ''
    });

    useEffect(() => {
        const mapElement = document.getElementById('map');

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_API_URL_GOOGLE_KEY}&callback=initMap`;
        script.async = true;
        document.body.appendChild(script);

        // inicializa o mapa
        window.initMap = () => {
            if (!mapElement) return;
            const newMap = new window.google.maps.Map(mapElement, {
                center: { lat: -23.5489, lng: -46.6388 },
                zoom: 12,
            });
            newMap.addListener('click', handleMapClick);
            setMap(newMap);
        };
    }, []);

    const handleMapClick = (event) => {
        const { latLng } = event;
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === 'OK') {
                const place = results[0];
                console.log(place);
                setSelectedPlace({
                    formatted_address: place.formatted_address
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
                <form>
                    <Input
          mt={4}
          value={selectedPlace.formatted_address}
          isReadOnly
          placeholder="Seu endereço"
        />
                </form>
            )}
        </>
    );
}

export default MapGoogle;