# Final Year Project: Foodbank User Portal (JS Source Code)

This is the source code for my Foodbank User Portal which is one part of my FYP. **For a full overview of the project I recommend reading this [Blog Submission]() and watching this [Video Overview of the Project](https://www.youtube.com)**.<br><br>
All deliverables can be found in the "Important Deliverables" section. <br>
This repository is contained as a React project ready to be deployed as an [Azure Static Web App](https://docs.microsoft.com/azure/static-web-apps/overview).<br>
Initial project files were set up with a [template ](staticwebdev/react-basic) which can be found on the documentation.

## Important Deliverables

Here are all deliverables that I have created as part of this project.<br>

[Repo for Foodbank User Portal on Azure Static WebApps](https://github.com/zcabkle/fyp-foodbank-portal)<br>

[Repo for Foodbank Worker Portal on PowerApps](https://github.com/zcabkle/pa-foodbank-worker-app)<br>

[Exported Solution inc. Foodbank Worker Portal on PowerApps and Admin Portal on PowerApps](https://github.com/zcabkle/pa-foodbank-worker-app/files/10996387/FoodbankSolution_1_0_0_10_managed.zip)<br>

[TestStudio Configuration for Foodbank Worker Portal]()<br>

## This repo is currently being hosted. Access it at this link.
https://gentle-beach-0e3070003.2.azurestaticapps.net

## Running Locally

### Prerequisite Steps
As you should have seen in the blog and video overview, **this repository requires a working PowerApps solution to be running**, as this solution accesses the PowerApps Dataverse with its API.

If you want to run locally. Please visit [this repo](https://github.com/zcabkle/pa-foodbank-worker-app) and follow the steps to deploy that project.

After this has been done you need to get the corresponding variables in order to configure your build.

1. Go to the PowerApps environment that you put your solution into. Go to to the top right settings icon and click 'Developer Resources'. **Add an extra forward slash to the end of the 'Web API endpoint' value. This will be the DATABASE_CONNECTION_STRING in our build.**<br>
2. Your DATABASE_CONNECTION_STRING will be of the form https://orgXXXXXXXX.api.crm4.dynamics.com/api/data/v9.2/, **create a string of the form 
https://orgXXXXXXXX.api.crm4.dynamics.com/.default, record this value it will be the SCOPE in our build**.
![Screenshot 2023-03-22 at 13 52 54](https://user-images.githubusercontent.com/73954803/226926700-ac228264-4afb-4c15-982e-7c8a4f4e62b7.png)
3. Go to the [Azure Portal](), navigate to 'Azure Active Directory' and then 'App Registrations'.<br>
4. Add a new app registration, give the registration a meaningful name and select 'Accounts in any organizational directory', navigate to the next page.<br>
5. Add a new secret by clicking 'Add a certificate or secret'. Add a new secret with a meaningful name and with a chosen duration. **Record the value of this secret, this will be the CLIENT_SECRET in our build.**<br>
![image](https://user-images.githubusercontent.com/73954803/226931600-555c9aa3-5057-4065-9ec3-d51121a2ae3e.png)
6. **Record the Application (client) ID, this will be the CLIENT_ID of our build**
![Screenshot 2023-03-22 at 14 16 25](https://user-images.githubusercontent.com/73954803/226932775-7d86f3e1-b487-4518-8c5b-a8070137f43f.png)
7. Append the tenant ID to https://login.microsoftonline.com/. **Record this string, this will be the AUTHORITY in our build**.
![Screenshot 2023-03-22 at 14 19 57](https://user-images.githubusercontent.com/73954803/226933633-11994e5c-6023-452b-8496-032461effa2d.png)

### Steps to Run Locally
1. Make sure you have done the prerequisite steps and recorded your variables.
2. Clone this repo and install required dependencies. 
3. Navigate to the /api folder and create a file called local.settings.json.
4. Add the following content to the file, filling in your variable values. <img width="574" alt="Screenshot 2023-03-22 at 14 29 00" src="https://user-images.githubusercontent.com/73954803/226937234-2d246571-697d-4c5e-b940-94e73712beb6.png">
5. Add this file to .gitignore as it includes your sensitive information such as secrets.
7. Delete .github/workflows.
8. Install the [Azure Static Web Apps Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps)
9. Inside Visual Studio Code, select the Azure logo in the Activity Bar to open the Azure extensions window. <br> <img width="59" alt="image" src="https://user-images.githubusercontent.com/73954803/225747468-6ab62c25-4c73-4c65-93e2-8373947a720f.png">
10. Press F1 to open the Visual Studio Code command palette.
11. Enter Create static web app in the command box.
12. Select Azure Static Web Apps: Create static web app... and select Enter.
13. Enter these values when asked for them. <br> <img width="608" alt="image" src="https://user-images.githubusercontent.com/73954803/225748604-84cfd2f4-0dba-4e33-8213-c31da8b9f8e8.png">
14. Enter these values when asked for them. <br> <img width="611" alt="image" src="https://user-images.githubusercontent.com/73954803/225748743-d1874edc-d64b-4d31-8934-626a7e934385.png">
15. When app creation is a success, you will see this notification <br> <img width="645" alt="image" src="https://user-images.githubusercontent.com/73954803/225748908-3f06c557-0dd1-4293-9ac2-5c8b100752a7.png">
16. Build with the command line at the root directory `npm run build`  
17. Run from the root directory `swa start build --api-location api`  
18. Open http://localhost:4280 on browser.

## Deploying onto Azure

To deploy this repo yourself follow these steps.

1. Complete the steps to run the project locally.
2. By following the steps to run the project locally you may have noticed a workflow file was created in .github/workflows, this workflow will deploy your project when pushed to default branch.
3. Your deployment will fail because your local.settings.json values aren't accessible because they aren't being pushed to git due to security reasons.<br>
4. To configure these variables go to the Azure Portal, navigate to Static Web App and click the Static Web App that you created.
5. Go to configuration on the sidebar.
6. Add 5 new settings with the same names and values as the local.settings.json file. Please note that the underscores are not visible in the screenshot but you **should** include the underscores in the names ![Screenshot 2023-03-22 at 14 41 49](https://user-images.githubusercontent.com/73954803/226940408-08492327-ac8e-4145-be01-1de261f18a7e.png)
7. Push some changes to GitHub and wait for the action to complete.
8. Access the production version here. This menu can be found when you enter the Azure extensions window. <img width="600" alt="image" src="https://user-images.githubusercontent.com/73954803/225749149-f10d31d2-53be-4657-a40b-e832944648b4.png">

Any further commits to the main branch will be deployed to production due to the GitHub Action. The config for this is found in the azure-static-web-apps-XXX-XXX-XXX.yml file.

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
