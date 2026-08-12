# Tell Mel website

A fast, static website (plain HTML/CSS/JS, no build step). Just open the files or
drag the whole folder onto any host.

## Pages
| File | What it is |
|------|------------|
| `index.html` | Home |
| `services.html` | Services |
| `meet-mel.html` | Meet Mel |
| `stories.html` | Client stories |
| `faq.html` | FAQ |
| `pricing.html` | Packages + "request a call about pricing" form (no checkout) |
| `free-session.html` | Free group session signup form + "Don't go alone" share section |
| `assets/` | Styles, scripts, images, and the new phoenix logo (`assets/img/phoenix.svg`) |

## The forms (important)

Right now, when someone submits either form it opens their email app with everything
filled in, addressed to **Happinessandclarity@tell-mel.com**. That works with zero setup.

**Recommended:** to collect every submission automatically (so nothing is missed and the
"Who referred you?" answers are all in one place), do this once:

1. Go to <https://formspree.io> and create a free form connected to your email.
2. Copy the endpoint it gives you (looks like `https://formspree.io/f/abcdwxyz`).
3. Open `assets/js/main.js`, and on the line near the top:
   ```js
   const FORM_ENDPOINT = "";
   ```
   paste your endpoint between the quotes and save.

Both forms already include a **Who referred you?** field so you can track word-of-mouth.

## The free group session

The date is written on `index.html` and `free-session.html` as **Thursday, September 3rd,
7:00 PM EST**. To change it, edit that text on those two pages (search for "September 3rd").

## Publishing it

Easiest option: go to <https://app.netlify.com/drop> and drag this whole folder onto the
page. It gives you a live link in seconds. You can later connect your `tell-mel.com` domain.

## Changing the logo

The logo is `assets/img/logo-phoenix.png`. Replace that file (keep the same name) to swap it
everywhere on the site at once. In the nav and footer it is shown as a small rounded, centered
tile; on the homepage it appears large in the hero.
