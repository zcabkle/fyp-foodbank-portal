# Final Year Project: Foodbank User Portal (JS Source Code)

This is the source code for my Foodbank User Portal which is one part of my FYP. All deliverables can be found in the "Important Deliverables" section. <br>
It is contained as a React project ready to be deployed as an [Azure Static Web App](https://docs.microsoft.com/azure/static-web-apps/overview).<br>
Initial project files were set up with a [template ](staticwebdev/react-basic) which can be found on the documentation.

## Important Deliverables

Here are all deliverables that I have created as part of this project.<br>
[Repo for Foodbank User Portal on Azure Static WebApps](https://github.com/zcabkle/fyp-foodbank-portal)<br>

[Repo for Foodbank Worker Portal on PowerApps](https://github.com/zcabkle/pa-foodbank-worker-app)<br>

[Exported Solution inc. Foodbank Worker Portal on PowerApps and Admin Portal on PowerApps](https://github.com/zcabkle/pa-foodbank-worker-app/files/10996387/FoodbankSolution_1_0_0_10_managed.zip)<br>
[TestStudio Configuration for Foodbank Worker Portal]()<br>

[Video Overview of the Project](https://www.youtube.com)<br>
[Blog Submission]()<br>

## This repo is currently being hosted. Access it at this link.
https://gentle-beach-0e3070003.2.azurestaticapps.net

## Running Locally

1. Install required dependencies. 
2. Build with `npm run build`  
3. Run with `swa start build --api-location api`  
4. Open http://localhost:4280 on browser.

## Deploying onto Azure

To clone and deploy this repo yourself follow these steps.

1. Clone this repo.
2. Install the [Azure Static Web Apps extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps)
3. Inside Visual Studio Code, select the Azure logo in the Activity Bar to open the Azure extensions window. <br> <img width="59" alt="image" src="https://user-images.githubusercontent.com/73954803/225747468-6ab62c25-4c73-4c65-93e2-8373947a720f.png">
4. Select F1 to open the Visual Studio Code command palette.
5. Enter Create static web app in the command box.
6. Select Azure Static Web Apps: Create static web app... and select Enter.
7. Enter these values when asked for them. <br> <img width="608" alt="image" src="https://user-images.githubusercontent.com/73954803/225748604-84cfd2f4-0dba-4e33-8213-c31da8b9f8e8.png">
8. Enter these values when asked for them. <br> <img width="611" alt="image" src="https://user-images.githubusercontent.com/73954803/225748743-d1874edc-d64b-4d31-8934-626a7e934385.png">
9. When app creation is a success, you will see this notification <br> <img width="645" alt="image" src="https://user-images.githubusercontent.com/73954803/225748908-3f06c557-0dd1-4293-9ac2-5c8b100752a7.png">
10. Access the production version here. This menu can be found when you enter the Azure extensions window. <img width="600" alt="image" src="https://user-images.githubusercontent.com/73954803/225749149-f10d31d2-53be-4657-a40b-e832944648b4.png">

Any further commits to the main branch will be deployed to production due to the GitHub Action. The config for this is found in the **NEED TO WRITE FILENAME HERE**

## Azure Portal

The [Azure Portal](https://portal.azure.com/#home) is a way to customise and monitor your deployment.<br>

### Configuring the Deployment
1. After you have deployed on Azure you should be able to navigate to Static Web Apps page from the landing page by searching or clicking the icon.<br><img width="1440" alt="Screenshot 2023-03-16 at 21 02 24" src="https://user-images.githubusercontent.com/73954803/225752516-cd4ca6ae-1808-458a-9630-148ab3f33d87.png"><br>
2. You will then land on this page which will give you some more options for customisation.<br>
<img width="1439" alt="Screenshot 2023-03-16 at 20 57 37" src="https://user-images.githubusercontent.com/73954803/225752677-3493ac15-c8ab-4742-ae15-003334e62d74.png"><br>
3. Changing any fields will affect your production deployment.

## Useful Documentation & Resources

To aid further development, here are some useful resources to get you started.

[Full documentation on Azure Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/)<br>
[Microsoft Learn resources for Azure Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/overview)<br>
[Guide for the API](https://learn.microsoft.com/en-us/azure/static-web-apps/add-api?tabs=vanilla-javascript#update-the-frontend-app-to-call-the-api)<br>
[Documentation for MUI](https://mui.com)<br>
[Documentation for React](https://react.dev)<br>
