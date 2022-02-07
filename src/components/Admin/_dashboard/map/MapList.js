import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import MapCard from './MapCard';

// ----------------------------------------------------------------------

MapList.propTypes = {
  maps: PropTypes.array.isRequired
};

export default function MapList({ maps, ...other }) {
  console.log(maps.length);
  return (
    <Grid container spacing={3} {...other}>
      {maps.map((map) => (
        <Grid key={map.id} item xs={12} sm={6} md={3}>
          <MapCard map={map} />
        </Grid>
      ))}
    </Grid>
  );
}
