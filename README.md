## **Setting Up**

**Setting up Hyperledger Composer**
1. Setup the lab environment as per the instructions in https://github.com/suenchunhui/easy-hyperledger-composer
2. Start the lab environment
    
    Mac users run these commands in ~/easy-hyperledger-composer folder

    For windows users, run these commands in the IDE:
    ```
        npm run setup_cryptpo

        npm run start_fabric

        npm run start_playground
    ```
3. Import charity-fundraising network

    In the playground environment, 
    
    - Import charity-fundraising.bna file and 
    - Set up the credentials that will be used to deploy the network:
         > Enrolment ID: "admin" 
         
         > Enrolment secret: "adminpw"

    - Deploy the network
    

**Setting up the MySQL external db**

This tutorial assumes that you have MySQL already installed.

1. Set-up database on mySQL
   
   *We will be including our 4 identities/accounts for easy testing*

   RUN the following lines of code in MySQL:
    ```
    CREATE DATABASE is4302;
    USE is4302;
    CREATE TABLE login_details (memberID VARCHAR(30), password VARCHAR(30), role VARCHAR(20));
    INSERT INTO login_details VALUES ('donor1', 'password1', 'Donor');
    INSERT INTO login_details VALUES ('bene1', 'password1', 'Beneficiary');
    INSERT INTO login_details VALUES ('co1', 'password1', 'Charity');
    INSERT INTO login_details VALUES ('treasury1', 'password1', 'Treasury');
    ```
2. Change 'password' of mySQL on 2 files to query from the earlier created local database.
    
    a. File 1
    > Enter folder 'node-server', OPEN server.js
In line 15, change 'password' to your own mySQL password

    b. File 2
    > Enter folder 'node-server', folder 'app', folder 'model' and OPEN db.js <br> In line 11, change 'password' to your own mySQL password

**Setting Up the Web-app and Server**

1.  On the cmd line, navigate to the desired folder and run:
    ```
    git clone https://github.com/nichhholas/CharityDistributedLedger
    ```

2.  Navigate to the downloaded folder.

3.  Install vue-cli by running: 
    ```
    npm install -g vue-cli
    ```

4.  To install dependencies, run: 
    ```
    npm install
    ```
5.  To set up NodeJS, run **in a separate terminal**:
    
    a. Change directory to the folder node-server
    ```
    cd <directory-where-git-repo-was-saved-to>/node-server
    ```
    b. Once in the folder, run
    ```
    npm run dev
    ```
    *Should you meet with errors on missing packages, run "npm install" and try the above again.*

6.  To host the web-app locally, run: 
    ```
    npm run serve
    ```
    You may access the project at the localhost url indicated.
    > e.g. localhost:8081/#/


## **Creation of Profiles and Testing**

#### On Composer:

1.  Create new participants and assign IDs for

    1.  Beneficiary

        -  Using “bene1” for participant ID as well as profile ID

    2.  Donor

        -  Using “donor1” for participant ID as well as profile ID

    3.  Charity Organisation

        -  Using “co1” for participant ID as well as profile ID

    4.  Treasury

        -  Using “treasury1” for participant ID as well as profile ID

#### On terminal:

1.  Creation of composer REST servers for each profile

2.  Beneficiary

    -  Run this code on the terminal: 
        ```
        npm run start_rest-server bene1@<your-network-name> 3004
        ```
3.  Donor

    -  Run this code on the terminal: 
        ```
        npm run start_rest-server donor1@<your-network-name> 3001
        ```
4.  Charity Organisation

    -  Run this code on the terminal: 
        ```
        npm run start_rest-server co1@<your-network-name> 3002
        ```

5.  Treasury

    -  Run this code on the terminal: 
        ```
        npm run start_rest-server bene1@<your-network-name> 3003
        ```


**Donation Process**

1.  Sign up for an account at the sign up page with the following credentials:

    >   Email: donor1

    >   Password: password1

1.  Login with the newly created account

2.  Make a Donation (you may view the pending donation after refreshing the
    page)

3.  Logout and Login as the Treasury with the following credentials:

    >   Email: treasury1

    >   Password: password1

1.  View the pending donation under “Pending Transactions”, and proceed to
    accept the donation

2.  Logout and Login as charity organisation with the following credentials:

    >    Email: co1

    >    Password: password1

3.  Proceed to either “Withdrawal” or “Distribute” to make a withdrawal or distribution (to beneficiary). 
    
    You may also view the status of the
    transactions. 
    
    Withdrawals are tracked as ‘Financial Statements’ while
    distributions are recorded as ‘Bank Statements’.

4.  Logout and Login as treasury as the same credentials as before, and approve
    or reject the previous withdrawals and distributions made.

5.  Logout and login as beneficiary with the following credentials:

    >   Email: bene1

    >   Password: password1

6.  If the prior distribution was approved, the beneficiary may see it reflected
    in the beneficiary page.
