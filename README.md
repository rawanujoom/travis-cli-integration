# hotel-deals-app
a simple app written with expressjs and angular frameworks to create a site that consumes this JSON API https://offersvc.expedia.com/offers/v2/getOffers?scenario=deal-finder&amp;page=foo&amp;uid=foo&amp;productType=Hotel and displays deals.

##  Hotels Deals can be filtered by:

1- destination : a free text where user can insert destination name, city name, or region IDs.
destination text will be used to send a query parameter named either : destinationName, cityName, or regionIds.
* if it's one of the cities the API will use the cityName filter. 
* if it's a comma separated numbers it will use the regionIds filter.
* otherwise this text will be considered as destinationName.

2- min/ maxTripStartDate : 
to filter hotels based on trip start and end dates, these date params are converted to utc to take into consideration timezones differences between one location to another, assuming that expedia's API is using utc times.

3-lengthOfStay: integer to filter number of trip days.

4- min/maxStarRating: integer range from 1 to 5 to filter hotels based on star rating assuming that expedia's API lowest hotel star rating is 1 and the heighest is 5.

5- min/maxTotalRate: integers starting from zero to filter hotels based on room costs.

6- min/maxGuestRating: inter range from 0 to 5 to filters hotels based on guest rating assuming that expedia's API lowest guest rating is 0 and heighest is 5.


