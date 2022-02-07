import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';
import MapMoreMenu from './MapMoreMenu';

// ----------------------------------------------------------------------

const MapImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

MapCard.propTypes = {
  map: PropTypes.object
};

export default function MapCard({ map }) {
  const { name, cover } = map;
  console.log(name);
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <MapImgStyle alt={name} src={cover} />
      </Box>
      <Box p={2}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2">{name}</Typography>
        </Link>
        <MapMoreMenu />
      </Box>
    </Card>
  );
}
