import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../../components/Label';
import ColorPreview from '../../../components/ColorPreview';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
  toggleSwitch: PropTypes.func,
  index: PropTypes.number
};

/**
const label = { inputProps: { 'aria-label': 'Switch demo' } };
 * 
 * sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: 'absolute',
                textTransform: 'uppercase'
              }}
 */

export default function ShopProductCard({ product, toggleSwitch, index }) {
  if (product.checked === undefined) {
    product.checked = false;
  }
  const { id, name, cover, price, colors, status, priceSale, approval, checked } = product;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {approval && (
            <Switch
              checked={checked}
              onChange={(e) => {
                toggleSwitch(e, product, index);
              }}
              sx={{
                zIndex: 9,
                top: 10,
                left: 5,
                position: 'absolute',
                textTransform: 'uppercase'
              }}
            />
          )}
          {status && (
            <Label
              variant="filled"
              color={(status === 'sale' && 'error') || 'info'}
              sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: 'absolute',
                textTransform: 'uppercase'
              }}
            >
              {status}
            </Label>
          )}
        </Stack>
        <ProductImgStyle alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
