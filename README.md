# Commutilator - Momentum Team 13 Eagles

## Description

This application helps you calculate the cost of your commute, whether to work, school, or even the grocery store, using your route, your personal vehicle information, and local gas prices.\
\
We hope you are able to use our app to make informed decisions about your drive!

## Data Retrieval

### Gas Prices

Real-time gas price data is fetched from the GasBuddy API once the starting and ending locations are submitted by the end-user. The API returns all available gas prices, which is filtered by city. The average is taken for each city of submitted the starting and ending locations, providing an average starting location gas price and an average ending location gas price. The average of these two values is then used in the calculation.\
\
If no gas price data is able to be fetched for either the starting or ending location, the overall average used in the calculation will be the other location's average gas price.\
\
If no gas price data is able to be fetched for both the starting and ending locations, the end-user will receive an error message notifying them that no gas price data was found.

### Miles Per Gallon
Vehicle miles-per-gallon values (when not manually entered) are fetched from the GasBuddy API once the Year, Make, and Model are populated on the form.\
\
If no vehicle information is able to be fetched, the end-user will receive an error message requesting that they manually enter the MPG.

### Route and Distance
The mapped route and distance are calculated using the React Google Map API. Once the starting and ending locations are submitted by the end-user, the best available route is calculated and returned.\
\
If the route is unable to accessed via car, the end-user will receive an error message notifying them that no route can be calculated.\
\
If no route is able to be calculated, the end-user will receive an error message requesting that they enter a different location.

## Calculations

### Daily
daily_result = round((((commute.distance * 2) / vehicle.mpg) * commute.avg_gas_commute), 2)

### Weekly
weekly_result = round((((commute.distance * 2) / vehicle.mpg) * commute.avg_gas_commute) * commute.days_per_week_commuting, 2)

### Monthly
monthly_result = round((((commute.distance * 2) / vehicle.mpg) * commute.avg_gas_commute) * (commute.days_per_week_commuting * (len(calendar.monthcalendar(today.year, today.month)))), 2)

### Annual
annual_result = round((((commute.distance * 2) / vehicle.mpg) * commute.avg_gas_commute) * commute.days_per_week_commuting * 52, 2)

## Installation

- Copy this Repository URL and clone into your terminal using `git clone <URL>`
- `cd` into the newly created repository
- Run `npm install` to download all dependencies
- To preview the application in your local host, run `npm start`
- To edit code, type `code . ` or use your favorite code editor

## Creators

- Andres Alcocer, Jose Reyes, Metta Rolando, and Michael Perry II

## Link to Production Site:

`https://commutilator.netlify.app/`

