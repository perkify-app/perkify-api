# Perkify API
[![TypeScript - ^5.3.3](https://img.shields.io/badge/TypeScript-^5.3.3-3178C6?logo=typescript&logoColor=white)](https://typescript.com/)
[![Node.js - ^20.4.0](https://img.shields.io/badge/Node.js-^20.4.0-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![express - ^4.18.2](https://img.shields.io/badge/express-^4.18.2-000000?logo=express&logoColor=white)](https://expressjs.com/)

<a href="https://perkify-api.onrender.com/api">View Hosted Version</a>

## About the Project

An API fully built using Typescript, Express and Node.js

For [full app documentation refer to the front-end readme](https://github.com/perkify-app/perkify-react-native?tab=readme-ov-file#perkify---a-centralised-place-for-users-to-store-their-loyalty-cards-and-a-platform-for-merchants-to-advertise-their-loyalty-programs)

## Getting Started
Follow these instructions to get a local copy up-and-running.

## Installation

1) Clone this repo: 

         https://github.com/perkify-app/perkify-api.git

2) Install dependencies:
            
             npm install
    <details>
    <summary>List of Dependencies</summary>

    dependencies:

            cors 2.8.5
            dotenv: 16.3.1
            express: 4.18.2
            pg: 8.11.3

    devDependencies:
        
            @types/cors: 2.8.17
            @types/express: 4.17.21
            @types/jest: 29.5.11
            @types/node: 20.10.6
            @types/pg: 8.10.9
            @types/pg-format: 1.0.5
            @types/supertest: 6.0.2
            husky: 8.0.2
            jest-extended: 2.0.0
            jest-sorted: 1.0.14
            pg-format: 1.0.4
            supertest: 6.3.3
            ts-jest: 29.1.1
            ts-node: 10.9.2
            typescript: 5.3.3
    </details>

    _npm version 9.7.2 and node v20.4.0 were used on this project._

3) Create .env Files

    To connect locally to the two databases create two .env files in the project root directory:
            
            .env.test
            .env.development
    
    Both files will need to have the environment variable PGDATABASE=,

    _The database names are found at the following path: ./db/setup.sql_

    1) **.env.test** should contain:
        
            PGDATABASE=nc_perkify_test;

    2) **.env.development** should contain:
    
            PGDATABASE=nc_perkify;

## Set-up databases and localhost server

Run the following scripts:

     npm run setup-dbs  
     npm run seed
     npm run start


The API can now be interacted with on port 9090 using a client. 

A list of all endpoints are available on http://localhost:9090/api or in the endpoints.json file.

<p align="right"><a href="#perkify-api">Back to top</a></p>
