TechEd Watch-and-code CodeJam

# Prerequisites
In order to participate in this CodeJam, you will need a BTP account.
If you have an account already, you can use that.
Alternatively you can setup a Trial account following these steps: https://developers.sap.com/tutorials/hcp-create-trial-account.html

# Development Environment Setup

We have two options for you to work on this CAP development. The first is setting up a a BTP Account and activating Business Application Studio, which comes with all the necessary tools you need out of the box. 

The other option is setting up the same tools on your own machine. Both approaches are equally valid.

## Option 1: SAP Business Application Studio

### Create a BTP Trial Account

For those who do not have a trial account or who do not have access to BTP yet, SAP produced a handy guide on how to set up a trial account, available [here](https://developers.sap.com/tutorials/hcp-create-trial-account.html). 

### Set up and start Business Application Studio

These days trial accounts come with BAS pre-activated. If you can't find it To set up BAS on a BTP environment, the necessary steps can be found in [this handy guide](https://developers.sap.com/tutorials/set-up-bas.html)

## Option 2: Local Visual Studio Code option

Follow these instructions as required. To work with CAP locally, a few tools need to be installed. The SAP documentation has a good [Jumpstart devvelopment](https://cap.cloud.sap/docs/get-started/jumpstart) section. There's also is a handy [setup guide](/CAP/Setup.md) we wrote that is a bit more comprehensive on how to work with a terminal on windows or Mac. 

# SAP CodeJam Exercise
Based on: [The SAP CodeJam](https://github.com/SAP-samples/cap-service-integration-codejam/tree/main/exercises/12-extend-fiori-ui-with-annotations)

## Pre-built content / git repository - Jorg

## Steps to follow - Jorg
Follow Tutorial 1 to [Create a CAP-Based Application](/CAP/CreateApplication.md). The summary is below:

<details>

1. Create an empty NodeJS application with `npm init`
2. Initialise an empty CAP application with `cds init && npm install`
3. Start your app in development mode with `cds watch`
3. Add a schema file
4. Add an entity for Incidents
5. Add some mock data for your entity 
6. Create a service cds file
7. Create an IncidentsService and add a projection to your entity
7. View your service and the metadata on your localhost
8. Create your first annotation and enable draft functionality on your Incidents projection
9. Add a *Composition* for comments and provide some sample data
10. Add an *Association* for Incident type and provide some sample data

</details>

Follow Tutorial 2 to [Create a Fiori Elements Application](/CAP/CreateFioriElementsUI.md)
<details>

1. Create a Fiori Elements application with the wizard of type List Report / Object Page
2. Use the *Page map* to add some columns to the list report, and some fields to the object page
3. Use the *Page map* to turn the Incident type field into a search help

</details>

# AWS Account Setup
## Provision AWS Account using Workshop Studio 

<details>

1. Access this URL or scan the QR code below: 

    **https://catalog.us-east-1.prod.workshops.aws/join?access-code=377a-0cdfa0-95** 

    ![Alt text](./images/image-60.png)

2. Select Email one-time password (OTP)

    ![Alt text](./images/image-61.png)

3. Provide an Email address that you have access to, then click on **Send passcode**.

    You can use your corporate or personal email address. 

    ![Alt text](./images/image-62.png)


4. Check your email for the passcode. 


    ![Alt text](./images/image-63.png)


5. Copy this 9-digit into the Passcode field, then click on **Sign in**. 

    ![Alt text](./images/image-64.png)

    ![Alt text](./images/image-65.png)

6. You will be prompted to Review and join the event. 

    ![Alt text](./images/image-66.png)

7. Scroll down to review all the Terms and conditions, then check the box for **I agree with the Terms and Conditions**, and click on **Join event**.

    ![Alt text](./images/image-67.png)


8. Now you'll be in your Event dashboard, which will look similar to the screenshot below. 

    For this CodeJam, you can ignore the top section of the menu on the left and the main content of the workshop. You have to click on the **Open AWS Console** link, as highlighted in RED below. 
    
    ![Alt text](./images/image-68.png) 

9. Once the link opens, you will be inside the AWS Console, where all services are available.

    You're now ready to go!

    ![Alt text](./images/image-69.png)

</details>

# AWS CodeJam 

In this section of the CodeJam you're going to extend the application that you built this morning. 
There are two separated parts for this session.
First, you're going to add the ability to add an attachment to the records you create in the BTP Application. These attachments will be stored in Amazon Simple Storage Services (a.k.a. S3), which is a realiable and cost effective object store service. 
In order to do this, you will create an S3 Bucket (Buckets are object containers), then you will create a Role to provide access to the S3 Bucket and finally an API which will allow you to interact with the S3 bucket from the BTP Application. 

## Part 1 - Attach a document
### Step 1 - Create S3 Bucket

The first step is to create an S3 bucket. There are a number of options available for S3 buckets, including cross region replication, versioning as well as events and notifications. For now you're going to go with a basic setup. 

<details>
1. Access S3 Console

Enter S3 in the search bar and select S3 from the dropdown menu.
![Alt text](./images/images/image.png)

2. Create bucket

On the main S3 console, click on the Crate bucket button on the right
![Alt text](./images/images/image-1.png)

3. Enter bucket name

Enter a bucket name. The bucket name needs to be unique across all AWS accounts. 
A good idea would be to call it <your_name-teched-codejam>.

![Alt text](./images/images/image-2.png)

4. Scroll down and click on Create bucket

![Alt text](./images/image-3.png)

5. Access the S3 bucket to retrieve the bucket resource name

This will be required on a subsequent step, when we need to provide authorise our API to access to the S3 Bucket
Click on the bucket name on the list
![Alt text](./images/image-4.png)

6. Select Properties

![Alt text](./images/image-5.png)

7. Copy the Amazone Resource Name (ARN)

Clicking on the button to the left of the name will copy the ARN.
![Alt text](./images/image-6.png)

That's the S3 bucket created. 
</details>

### Step 2 - Setup IAM Role

Next you will need to create a policy to provide access to your S3 bucket and assign this to a Role that you will also create. You will use this role later on when creating the API. 


<details>
1. Access IAM console

On the search bar, type IAM (Identity Access Management), and select IAM from the menu.

![Alt text](./images/image-7.png)

2. Create Policy

Select policies from the left side panel

 ![Alt text](./images/image-8.png)
 
Click on the Create policy button
 ![Alt text](./images/image-9.png)


Switch the policy editor to JSON clicking on the button 
![Alt text](./images/image-10.png)

Copy and paste the following policy in the Policy Editor.
Replace the resource with the ARN you copied before, or just replace the <your_bucket> text with the name of your bucket (without <>). Ensure that the /* are included at the end of the ARN.
This policy enables access to read and write objects from your S3 bucket as well as listing objects within the bucket. 

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:ListBucket"		
            ],
            "Resource": "arn:aws:s3:::<your_bucket>/*"
        }
}
```

![Alt text](./images/image-11.png)

Click next and enter a policy name

![Alt text](./images/image-12.png)

Scroll down and click Create policy

![Alt text](./images/image-13.png)

You can now search and see your policy.

![Alt text](./images/image-14.png)

3. Create Role

Select the Roles menu entry from the side panel

![Alt text](./images/image-15.png)

Click Create role

![Alt text](./images/image-16.png)

On the next screen, select Custom trust policy. This will enable the role we're creating to be used by our API. The action sts:AssumeRole allows a service or instance to adopt a role while it is performing an action. The service "apigateway.amazonaws.com" specifies that we're allowing the API Gateway service to use this role. 
Copy the following code and paste it on the Custom trust policy section
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
        "Sid": "",
        "Effect": "Allow",
        "Principal": {
            "Service": "apigateway.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
        }
    ]
} 
```

![Alt text](./images/image-17.png)

Scroll down and click Next

![Alt text](./images/image-18.png)

On the next screen, you will add the policy you just created to this role. Search for the policy and select it using the checkbox next to the name. Click Next. 

![Alt text](./images/image-19.png)

Enter a name for your role

![Alt text](./images/image-20.png)

Scroll down and click Create role

![Alt text](./images/image-21.png)

4. Get Amazon Resource Name (ARN) for the role.

This will be required for to create the API. Search for your role and click on the name.

![Alt text](./images/image-22.png)

Copy the ARN. You can click on the button on the left to do so. 

![Alt text](./images/image-23.png)
</details>

### Step 3 - Create API in API Gateway

The next step is to create an API to access the S3 bucket. 
We will enable the option to save and read files from S3.
This is done by implementing the PUT and GET methods.

<details>


1. Access API Gateway

Search for API Gateway and click on the service on the menu

![Alt text](./images/image-24.png)


2.	Select **REST API - Build**

On the API Gateway screen, scroll down to REST API
![Alt text](./images/aws-20.png)

Click Build


3.	Select **New API**, enter your **API name** and leave **Endpoint Type = Regional**. Click **Create API**

    ![Alt text](./images/aws-21.png)

4.	Create Resource **{folder}**.  
    Ensure you enter **{folder}** for the **Resource Name** and **Resource Path** field.  


    ![Alt text](./images/aws-22.png)
    ![Alt text](./images/image-14.png)

5.	Create resource **{item}** under {folder}. Ensure you enter **{item}** for both the **Resource Name** and **Resource Path** field. 

    ![Alt text](./images/image-15.png)
    ![Alt text](./images/image-16-2.png)

6.	Create method **PUT** under {item}
    Ensure **{item}** is selected

    ![Alt text](./images/aws-26.png)

7.	Select **PUT** and click on the refresh button next to it to view the form.
    
    ![Alt text](./images/aws-27.png)

8.	Update with the following information. Leave the rest as default/blank.

    ```
    Integration type: AWS Service
    AWS Region: your region
    AWS Service: Simple Storage Service (S3)
    HTTP Method: PUT
    Action Type: Use path override
    Path override: {bucket}/{object}
    Execution Role: resource name for the role created in the previous section.
    ```
    ![Alt text](./images/aws-28.png)

9.	In the next screen select **Integration Request**.
    We need to map the path (bucket/object) to the resources we created (folder/item)
    
    ![Alt text](./images/aws-29.png)
    
10.	Expand URL Path Parameters and select Add path.
    
    ![Alt text](./images/aws-30.png)
    
11.	Enter the following mappings

    ```
    Name: bucket - Mapped from: method.request.path.folder 
    Name: object – Mapped from: method.request.path.item
    ```

    ![Alt text](./images/aws-31.png)

    Make sure you click on the tick after entering the second line:

    ![Alt text](./images/aws-32.png)

12.	Go back by selecting Method Execution at the top and select **Create Method**, to define the **GET** method

    ![Alt text](./images/aws-33.png)

    ![Alt text](image-4.png)

13.	Use the same settings from the PUT method, except for the HTTP method (GET in this case)

    ![Alt text](./images/aws-34.png)

14.	Enter the URL Path Parameters (same parameters used for the PUT Method)
    ![Alt text](./images/aws-35.png)

15.	Click on Method Execution to go back
    ![Alt text](./images/aws-36.png)

16. You need to map the Content-Type so the API can display the files in the browsers. Select **Method Response**

    ![Alt text](image-5.png)

17. Expand the HTTP Status 200 and remove the Content type 'application/json' by clicking on the x 

    ![Alt text](image-6.png)

18. Add Content-Type as Response Header. Select Add Header and enter 'Content-Type'.

    ![Alt text](image-7.png)

    ![Alt text](image-8.png)

    Click on the tick button to accept the changes. 

    Go back to the previous step by clicking on **Method Execution** at the top. 

    ![Alt text](image-9.png)


19. Map the Content-Type from the file retrieved from S3. Select **Integration Response** 

    ![Alt text](image-10.png)

    Expand the line by clicking in the triangle and select the change (pencil button) for the Content-Type Response header.

    ![Alt text](image-11.png)
    
    Update the mapping with the following value and click the tick button. 

    ``` 
    integration.response.header.Content-Type
    ```

    Click on **Method Execution** to go back

    ![Alt text](image-12.png)


20. Enable **CORS**

    From the actions menu, select **Enable CORS**

   ![Alt text](image-13.png)


Ensure both PUT and GET methods are selected. Click on **Enable CORS and repkace existing CORS headers**
    ![Alt text](image-1.png)
    ![Alt text](image-2.png)
    ![Alt text](image-3.png)
    
Please note that when enabling CORS, the Method Response and Integration Responses will be updated and an entry for Access-Control-Allow-Origin added. No action is required but you will notice this as an additional value.

21.	Click on Settings on the left side to configure the Binary Media Types supported.
    ![Alt text](./images/aws-37.png)



22.	Scroll down, click on **Add Binary Media Type** and enter **application/pdf**


    This will configure binary support for PDF files.

    ![Alt text](image-14.png)

    Click on **Save Changes**. 

23.	 Navigate back to the Resources Method by clicking on **Resources**

 ![Alt text](image.png)



26.	Deploy API
    
    Click on the **Actions** dropdown and select Deploy API

    ![Alt text](./images/aws-42.png)

27.	Create a New Stage, enter a Stage name, Stage description and Deployment description and click Deploy

    ![Alt text](./images/aws-43.png)

28.	Leave all settings with their default values and click Save Changes
    
    ![Alt text](./images/aws-44.png)

    You will find the URL for your API at the top of this page, under Invoke URL. Note down this Invoke URL.

</details>

### SAP BTP App Modifications - Shaun
1. Add button to add attachment
Is a popup screen needed?
Add a field on the DB to store attachment details so it can be retrieved. 
3. Call API Put
4. Add button to retrieve attachment
5. Call API Get

## Part 2 - Find a solution using Amazon Bedrock

In the second step you're going to call a pre-defined API to find a solution for the incidents you create in your BTP application.
The API provided below will receive a question (in the body of the call) and will first perform an internet search for a solution and provide a step by step set of instructions for you to solve your problem. This API leverages the Generative AI capability provided by Amazon Bedrock and the Anthropic Claude Foundation Model. 

### API Details:

https://w2n1b8qko7.execute-api.us-east-1.amazonaws.com/v1/fix

### Body:

```
{
	"Question" : "<TITLE OF THE INCIDENT FROM BTP>"
}
```


### Add button in SAP BTP App to call API - Shaun


### Display results in SAP BTP App - Shaun

