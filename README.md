# yum-yum-market

Angular project with nodeJS @ SoftUni

1. Create Angular App
2. Create main modules in app
3. Header
   - create component
   - add html
   - add css
4. Food services
   - create service in food module
5. Dashboard
   - get data from service in ts
   - add html
   - add css
6. Search
   - add method to food service
   - add search route
   - show shearch result in dashboard
   - generate search componet
     - add to dashboard component
     - add ts
     - add html
     - add css
7. Tags Bar
   - create tag model
   - add sample tags to data.ts
   - Food service
     - create getAllTags method
     - create getAllFoodsByTag method
   - add tags routing
   - show tag result in dashboard
   - generate tag component
     - add to dashboard component
     - add ts
     - add html
     - add css
8. Food Datails Page
   - add method to food service
   - generate food page component
     - add route
     - add ts
     - add html
     - add css
9. Cart page
   - create cart item model
   - create cart model
   - generate cart service
   - add to card button in card details page
   - generate cart component
     - add route
     - add ts
     - add html
     - add css
10. Not found page

- generate component
  - add ts
  - add html
  - add css
- add to pages
  - home page
  - food details page
  - cart page

11. Connect to backend

- create backend folder
- initialize project
- install typescript
- add ts config
- copy data from frondend
- install express and cors
- create server.ts
  - install @types
  - install nodemon
  - create routes and controllers folder
  - create foodController and apis inside
- add urs.ts to frontend
- add httpClient module
- update food service

12. Login Page

- generate component
  - add to routes
  - add ts
  - add html
    - import reactive form module
  - add css
- add login api
  - use json
  - add jsonwebtoken
- generate auth service
  - generate user model
  - add user subject
  - add login method
    - add auth urls
    - generate IUserLOgin interface
    - add ngx-toastr
      - import module
      - import BrowserAnimationsModule
      - add styles in angular.json
    - add to header
    - add local storage methods
      - ddd logout method
        - add to header

13. make form input partials

14. connecting to mongoDB

- create models in backend
- adjust controllers with data from database

15. Register

- add register api
- add register service
- add register link
- add register component

16. Loading

- add image
- add component
- add service
- add interceptor

17. Comments

- add comments references to user and food
- make backend routers to handle requests for comments
  - add comments service
  - add comments controller
- add comments component
- add service
- add ts
- add html
- add css

18. Like

- add routes
  - add like and dislike in backend
  - add get user api
- add methods
  - in food service
  - in details
- add html and css for like

19. Checkout Page

- create order model
- create checkout page component
  - add to router
- add user to user service
- add Cart to cart service
- create order items list component
- Create Order Items List Component
- Adding Map To The Checkout Page
  - Add Leaflet npm package
    - Add @types/leaflet
    - Add Css to angular.json
  - Add AddressLatLng to Order Model
  - Create Map component
    - Add to checkout page
    - Add TS
      - Change app-map selector to map
    - Add Html
    - Add CSS
  - Add Auth Guard
- Save Order

  - Add Order Model
  - Add Order Status Enum
  - Add Auth Middleware
  - Add Order Router
    - Add create API
  - Add Order Urls to urls.ts
  - Add Order Service
    - Add create Method
  - Add Auth Interceptor

20. Payment Page

- Generate Component
- Add 'getOrderForCurrentUser' api
- Add Order Service method
- Connect Component to Service
- Make the map component readonly

21. Adding Paypal

- Generate Component
  - Add to payment page
- Get Paypal client Id
- Add Paypal JS to index.html
- Set up Paypal button
- Add Pay api to order router
- Get Paypal sandbox account

22. Order Track Page

- Generate Component
  - Add to routes
- Add API
  - Add to urls.ts
- Add method to order.service
- Add HTML
- Add CSS

23. Orders page

- Add Backend Apis 
 - Add Methods In Service
- Add method in ordersService 
- Generate Orders List Component
 - Add ts 
 - Add html
 - Add css

24. Profile page

- Create Apis in backend
- Add methods in frontend
- Generate Component 
 - Add ts
 - Add html 
 - Add css

