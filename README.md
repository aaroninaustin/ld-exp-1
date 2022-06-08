# LaunchDarkly Basic Feature Flagging example

This example is designed to mimic an experiment that could be run using the LaunchDarkly feature flagging platform.


See the basic test plan created for this exercise here:
https://docs.google.com/document/d/152g76aQ5XVoJW99wZ9JWUKBIpTfOgZFB6a42bzvwuoQ/edit?usp=sharing


## Install and run locally. 

This project is based on a slightly modified version of the Best Buy Playground API, which aims to be a training tool for students and other learners.

In this case I've added a very simple store front and feature flagging using the LaunchDarkly Javascript client side SDK.

### To install and run follow these simple steps.

Begin by cloning this repo locally. 

Then navigate to the public/client.js file within the project in your favorite editor.

Replace the first line of the client.js file with your own key.
```javascript
const myapikey ='YOURKEYHERE>';
```

Then head to the root of the project in your terminal to start the application

```bash
npm install -—build-from-source
npm start
# Best Buy API Playground started at http://localhost:3030
```

### To recreate this experiment in LaunchDarkly follow these basic steps:

Create a new flag called **Personalized Recomendations /  personalized-recomendations**

With that new flag created, under Targeting, create a new rule in the  **Target who match these rules** section:
> *if*: camp contains 'starwars'
> 
> *serve*: a percentage rollout 
>  - 50% true
>  - 50% false

Setting the **Default rule** to 

>Serve: False

Ensuring that non-trageted users will not get included.

*Note: the 50% false group will represent our Control group in this instance.*

Also be sure to enable to **Client-side SDK availability** in the settings area for this project.

Toggle Targeting On then Review and Save.

Now open http://localhost:3030?ref=starwars in your browser to trigger the experiment. You should see users with random keys being to be bucketed into your experiment as you refresh the page.

To review and see additional information about this exercise take a look at the client.js file which contains all code for deploymeny of the feature flag.
