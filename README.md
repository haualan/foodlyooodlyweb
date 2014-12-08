FoodlyOoodly 
Just blog about your food, we’ll measure the rest…
by Alan Hau, Yukti Abrol
For a link to our video:
https://www.dropbox.com/s/wsnsik95wmnruoj/FoodlyOoodlyMovie.mp4

5. Supporting Write-Up
a. introduce your app and state its main ideas and your motivation behind it

Blogging about your meal should be a pleasant and easy task. Don’t waste time trying to tag your food and calorie intake, just let the computer figure out the numbers for you.
 
b. compare and contrast it to existing apps and technologies

If you use any food tracking app (WebMD, FatSecret, FitBit), the current methods require users to painstakingly record their calorie intake. It takes the enjoyment out of food blogging. FoodlyOoodly only requires the user to type or brag or complain about their food as they do already on their facebook posts. Our server automatically parses your input and uses NLP to figure out what you’re eating and how much calories you consumed.

c. explain your back-end stack and front-end architecture

FoodlyOoodly is based on the MEAN framework; the front end is in Angular.js and Express.js and the backend is in MongoDB and Node.js. 

https://github.com/haualan/foodlyooodlyweb

For the native Android app, please look into the same repository:
https://github.com/haualan/foodlyooodlyweb/tree/master/StartupSystems/FoodlyOoodly

To handle the REST call to Fitbit’s API for calorie information, an Apache + Flask + Python web API is hosted on a separate server. The capabilities of FitBit’s API is shared amongst different projects for differet classes.

https://github.com/haualan/FatBitAPI




d. state and explain your deep-dives and the technologies you used in
achieving your deep-dive goals

To achieve the NLP goals, we used AlchemyAPI to extract keywords/named entities and then passed those outputs to FitBitAPI’s food search service. We parsed the output to return the most relevant calorie count.

e. with a sketch or two, show one or two example interactions between
your app and back-end, e.g. how the process of registering a user occurs
on your system

f. explain how you fulfilled or pivoted from proposal goals

We dropped some deep dive goals due to time constraints. It is not trivial to add capabilities to the app for features that don’t have public angular libraries on github. It would be unrealistic to add all the features we wanted and deliver a working prototype at the same time.

We decided to leverage existing frameworks used in different classes and company projects to maximize code re-use. Our team pivoted away from heavy visualizations in graphs and charts mainly because more progress was made on the other fronts involving NLP. 

Some lofty goals and specializations are abandoned. Originally, the app should record emotional fluctuations amongst pregnant women and their eating habits and how they coincide with the moon phase. Currently the finished product is more generalized and basically converts text input to calories.

g. conclude your write-up by reflecting on your app-building experience.

We had multiple problems with developing in Android. Since Android Studio is in beta, it is updating often, and some of the updates broke our code. Hence, we spent much time troubleshooting the breaks. Additionally, there are certain nuances of Android Studio and programming in Android that were not expected, which led us to rely on StackOverFlow to learn about how certain parts of the programs were meant to be developed. Additionally, it took some time to figure out how the different components fit together.
We were able to build the UI relatively easily, but had some trouble making the camera take and store images. 

On the website, it was significantly easier to create the application. Therefore, we concentrated more on the web presence. 

To put everything together, we linked the web presence with the native app.

h. format: PDF or Markdown
i. optional: names of team members

