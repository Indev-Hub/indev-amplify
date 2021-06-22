import PropTypes from 'prop-types';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@material-ui/core';

const paymentMethods = [
  {
    label: 'Visa Credit/Debit Card',
    value: 'visa'
  },
  {
    label: 'PayPal',
    value: 'paypal'
  }
];

const CheckoutBilling = (props) => {
  const { billing, handleChange, ...other } = props;

  return (
    <div {...other}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 20,
            display: 'flex',
            height: 40,
            justifyContent: 'center',
            width: 40
          }}
        >
          <Typography
            color="textPrimary"
            sx={{ fontWeight: 'fontWeightBold' }}
            variant="h6"
          >
            1
          </Typography>
        </Box>
        <Typography
          color="textPrimary"
          sx={{ ml: 2 }}
          variant="h6"
        >
          Billing Address
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            sm={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              onChange={handleChange}
              value={billing.firstName}
            />
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              onChange={handleChange}
              value={billing.lastName}
            />
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Street Address"
              name="address"
              onChange={handleChange}
              value={billing.address}
            />
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Street Line 2 (optional)"
              name="optionalAddress"
              onChange={handleChange}
              value={billing.optionalAddress}
            />
          </Grid>
          <Grid
            item
            sm={3}
            xs={12}
          >
            <TextField
              fullWidth
              label="State"
              name="state"
              onChange={handleChange}
              value={billing.state}
            />
          </Grid>
          <Grid
            item
            sm={3}
            xs={12}
          >
            <TextField
              fullWidth
              label="Zip"
              name="zip"
              onChange={handleChange}
              value={billing.zip}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          mt: 6
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 20,
            display: 'flex',
            height: 40,
            justifyContent: 'center',
            width: 40
          }}
        >
          <Typography
            color="textPrimary"
            sx={{ fontWeight: 'fontWeightBold' }}
            variant="h6"
          >
            2
          </Typography>
        </Box>
        <Typography
          color="textPrimary"
          sx={{ ml: 2 }}
          variant="h6"
        >
          Shipping Address
        </Typography>
      </Box>
      <Box
        sx={{
          color: 'text.primary',
          mt: 3
        }}
      >
        <FormControlLabel
          control={(
            <Checkbox
              color="primary"
              defaultChecked
            />
          )}
          label="Same as billing address"
        />
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          mt: 6
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 20,
            display: 'flex',
            height: 40,
            justifyContent: 'center',
            width: 40
          }}
        >
          <Typography
            color="textPrimary"
            sx={{ fontWeight: 'fontWeightBold' }}
            variant="h6"
          >
            3
          </Typography>
        </Box>
        <Typography
          color="textPrimary"
          sx={{ ml: 2 }}
          variant="h6"
        >
          Payment Method
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <RadioGroup
          name="paymentMethod"
          onChange={handleChange}
          sx={{ flexDirection: 'row' }}
          value={billing.paymentMethod}
        >
          {paymentMethods.map((paymentMethod) => (
            <FormControlLabel
              control={<Radio color="primary" />}
              key={paymentMethod.value}
              label={(
                <Typography
                  color="textPrimary"
                  variant="body1"
                >
                  {paymentMethod.label}
                </Typography>
              )}
              value={paymentMethod.value}
            />
          ))}
        </RadioGroup>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            sm={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Name on Card"
              name="cardOwner"
              onChange={handleChange}
              value={billing.cardOwner}
            />
          </Grid>
          <Grid
            item
            sm={6}
          />
          <Grid
            item
            sm={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Card Number"
              name="cardNumber"
              onChange={handleChange}
              value={billing.cardNumber}
            />
          </Grid>
          <Grid
            item
            sm={6}
          />
          <Grid
            item
            sm={3}
            xs={12}
          >
            <TextField
              fullWidth
              label="Expire Date"
              name="cardExpirationDate"
              onChange={handleChange}
              placeholder="MM/YY"
              value={billing.cardExpirationDate}
            />
          </Grid>
          <Grid
            item
            sm={3}
            xs={12}
          >
            <TextField
              fullWidth
              label="Security Code"
              name="cardSecurityCode"
              onChange={handleChange}
              value={billing.cardSecurityCode}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

CheckoutBilling.propTypes = {
  billing: PropTypes.object,
  handleChange: PropTypes.func
};

export default CheckoutBilling;
