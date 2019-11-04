# hotel-deals-app
a simple app written with expressjs and angular frameworks to create a site that consumes expedia's hotel deals API and display them in an appealing manner, user can use filters to filter hotel deals based on preferences.
#### Deals Filters
1. destination : a free text where user can insert destination name, city name, or region IDs.
destination text will be used to send a query parameter named either : destinationName, cityName, or regionIds.
   * if it's one of the cities the API will use the cityName filter. 
   * if it's a comma separated numbers it will use the regionIds filter.
   * otherwise this text will be considered as destinationName.
2.  min/ maxTripStartDate : 
to filter hotels based on trip start and end dates, these date params are converted to utc to take into consideration timezones differences between one location to another, assuming that expedia's API is using utc times.
3. lengthOfStay: integer to filter number of trip days.
4.  min/maxStarRating: integer range from 1 to 5 to filter hotels based on star rating assuming that expedia's API lowest hotel star rating is 1 and the heighest is 5.
5.  min/maxTotalRate: integers starting from zero to filter hotels based on room costs.
6. min/maxGuestRating: inter range from 1 to 5 to filters hotels based on guest rating assuming that expedia's API lowest guest rating is 1 and heighest is 5.
#### Deals Listing
* Each deal will show it's information of: hotelname, city, country, street, star rating, guest rating, crossed out price per night, dislay price per night, savings percent, currency. and if the user inserts length of stay night the total price will be shown as well. 
* Deals are by default sorted by price asending, user has the option to sort by other options. 
* Deals count is added as a text.


## Getting Started
### Prerequisites
install [Node.js](https://nodejs.org/en/download/) on your platform, current version is 12.13.0
## Running the application locally
1. In project directory run `npm install` to install dependencies.
2. Run `npm run start` to start the application, you should see a message telling you that it's running on port 4000, now you can go to http://localhost:4000/.
3. to add frontend work: 
frontend is using angular framework that eventually created a bundled files. in order to generate these files, the following steps must be done:
   1. in a new shell go to prject directory/client and run `npm install` to install frontend dependencies.
   2. install angular cli by running `npm install -g @angular/cli`
   3. in the same frontend shell run the command `ng build --watch`.

### Live Site
This site is deployed on Heroku
https://nodejs-hotel-deals-app.herokuapp.com/

#### About the API: 
- the API expects certain headers to be sent, suitable headers were used in the code.
- the API response has some hotels with values of zero as guest rating, but when sending minGuestRating=0 the API does not return results, therefore the minGuestRating was restricted to start from 1.