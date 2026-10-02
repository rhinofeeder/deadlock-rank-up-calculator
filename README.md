# Deadlock Rank Calculator

A lightweight, client-side web utility to calculate the exact number of consecutive wins and streak bonuses required to
rank up in Valve's **Deadlock**.

## Features

- **Win Streak Scaling**: Accurately computes Deadlock's streak bonus RP (+70 RP on 3rd win, +90 RP on 4th, +110 RP on
  5th, +130 RP on 6th+).
- **Existing Streak Offset**: Takes your current pre-game win streak into account.
- **Game-by-Game Breakdown**: Renders a progression table showing base RP, bonus RP, total gained, and remaining RP
  needed for each projected match until promotion.
- **Zero Dependencies**: Built with plain HTML5, custom CSS (design tokens, flex/grid), and lightweight modular
  JavaScript.

> Note: Deadlock's actual RP payout varies per match based on lobby MMR expectation and hero-specific rank factors. This
> calculator uses a customizable static base RP assumption (defaulting to 300) for target estimation.