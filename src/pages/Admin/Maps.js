import { useFormik } from 'formik';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { Container, Stack, Typography, Button } from '@mui/material';
// components
import Page from '../../components/Admin/Page';
import { MapList } from '../../components/Admin/_dashboard/map';
//
import MAPS from '../../_mocks_/map';

// ----------------------------------------------------------------------

export default function Maps() {
  const [openFilter, setOpenFilter] = useState(false);

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    <Page title="Template Maps | Admin">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Maps
          </Typography>
          <Button variant="contained" to="#" startIcon={<Icon icon={plusFill} />}>
            New map
          </Button>
        </Stack>
        <MapList maps={MAPS} />
        {/* <ProductCartWidget /> */}
      </Container>
    </Page>
  );
}
