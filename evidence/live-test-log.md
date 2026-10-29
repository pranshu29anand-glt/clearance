# Live generation test log

Live mode runs only inside the Claude viewer, on the viewer's own account, so these runs happen in the browser, not from the build environment.

## What a good live report must do

- Return a verdict that matches the layer rules: the tier is the worst of G1 (access gate) and G2 (review).
- Say "Not published" rather than invent a wait.
- Tag every login, legal, payment, ID or video step as "You".
- Mark every claim Unverified and every source "not opened".
- For an app it doesn't recognise, say so and fill "Could not determine" instead of guessing.

## Test set

| App | Why it's here | What to check |
| --- | --- | --- |
| Razorpay | Payments category | Does it flag business KYC or an account requirement? |
| HubSpot | CRM with a marketplace | Does it separate a private app from a listed one? |
| Zoom | Marketplace review | Does it mention app review before public distribution? |
| Spotify | Consumer API with quota tiers | Does it flag the extended quota or approval step? |
| An obscure or made-up app | Honesty check | Does it say it doesn't know? |

## Results

Fill this in after running each app in the live app.

| App | Intent / audience | Verdict | Right | Wrong or missing | Unknown |
| --- | --- | --- | --- | --- | --- |
| | | | | | |
