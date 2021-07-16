// Replace if using a different env file or config
require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const { resolve } = require("path");
const session = require("express-session");
const stripe = require("stripe")('sk_test_51GTdOLEXAhfvjJuXkywMIvsosTmdaTIgGw2WBV6AJEPlcnlBSYbrrAFCXS09M5ORmV90xz3he4Zblk9R94zCwhT900tRGBIExP');

const app = express();
const port = process.env.PORT || 4200;

app.use(express.static('./../src'));
app.use(session({
  secret: "Set this to a random string that is kept secure",
  resave: false,
  saveUninitialized: true,
}))

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});

app.get("/", (req, res) => {
  // const path = resolve(process.env.STATIC_DIR + "/index.html");
  const path = resolve('./../src/index.html')
  res.sendFile(path);
});

const endpointSecret = 'whsec_67hJ1pyr5ZG7mRR0fB85YjMKsShpjnHB';

app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  // Verify webhook signature and extract the event.
  // See https://stripe.com/docs/webhooks/signatures for more information.
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'account.updated') {
    const account = event.data.object;
    handleAccountUpdate(account);
  }

  response.json({received: true});
});

app.post("/onboard-user", async (req, res) => {
  try {
    const account = await stripe.accounts.create({type: "express"});
    req.session.accountID = account.id;

    const origin = `${req.secure ? "https://" : "http://"}${req.headers.origin}`;
    const accountLinkURL = await generateAccountLink(account.id, origin);
    res.send({
      url: accountLinkURL
    });
  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
});

app.get("/onboard-user/refresh", async (req, res) => {
  if (!req.session.accountID) {
    res.redirect("/");
    return;
  }
  try {
    const {accountID} = req.session;
    const origin = `${req.secure ? "https://" : "http://"}${req.headers.host}`;
    
    const accountLinkURL = await generateAccountLink(accountID, origin)
    res.redirect(accountLinkURL);
  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
});

const handleAccountUpdate = (account) => {
  isSubmitted = account.details_submitted;
  (isSubmitted) && console.log(account.id)
}

const generateAccountLink = (accountID, origin) => {
  return stripe.accountLinks.create({
    type: "account_onboarding",
    account: accountID,
    // refresh_url: `${origin}/onboard-user/refresh`,
    // return_url: `${origin}/success.html`,
    refresh_url: `http://localhost:4200/onboard-user/refresh`,
    return_url: `http://localhost:4200/success.html`,
  }).then((link) => link.url);
}

app.listen(port, () => console.log(`Node server listening on port ${port}!`));