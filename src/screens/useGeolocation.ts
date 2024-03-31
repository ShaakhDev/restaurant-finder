import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {Alert, Linking} from 'react-native';

export const useGeolocation = () => {
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState({latitude: 0, longitude: 0});

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCoords({latitude, longitude});
      },
      err => {
        setLoading(false);
        if (err?.code === 1) {
          Alert.alert(
            'код ошибки ' + err?.code,
            'разрешение на доступ к местоположению отклонено, пожалуйста, включите геопозицию',
            [
              {
                text: 'отмена',
              },
              {
                text: 'разрешить',
                onPress: () => {
                  try {
                    Linking.openSettings();
                  } catch (error) {}
                },
              },
            ],
          );
        } else {
          Alert.alert(
            'код ошибки ' + err?.code,
            'Пожалуйста, попробуйте еще раз',
          );
          setLoading(false);
        }
      },
    );
  }, []);

  return {loading, coords};
};
