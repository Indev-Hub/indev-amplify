// Replace if using a different env file or config
require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const { resolve } = require("path");
const session = require("express-session");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(process.env.STATIC_DIR));

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

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

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  // const path = resolve('./../src/index.html')
  res.sendFile(path);
});

const endpointSecret = process.env.WH_SECRET_KEY;

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

    // const origin = `${req.secure ? "https://" : "http://"}${req.headers.origin}`;
    const origin = `${req.headers.origin}`;
    console.log(origin)
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
    // const origin = `${req.secure ? "https://" : "http://"}${req.headers.host}`;
    const origin = `${req.headers.origin}`;
    
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
    refresh_url: `${origin}/onboard-user/refresh`,
    return_url: `${origin}/success.html`
    // refresh_url: `http://localhost:4200/onboard-user/refresh`,
    // return_url: `http://localhost:4200/success.html`,
  }).then((link) => link.url);
}

app.listen(port, () => console.log(`Node server listening on port ${port}!`));