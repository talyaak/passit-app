# PassIt

<img src="https://repository-images.githubusercontent.com/531040566/6b6f74f8-3a95-47ac-b138-cf4e79326262"  width="300">

## PassIt is a web app engineered with a PERN stack

It's a public-use app, designed as a platform for publishing pre-owned items (clothes, household products, electronics) 
that you want to pass forward to individuals who would benefit from it but can't afford it financially.


## Technologies

Written with TypeScript, PassIt utilizes front-end with React and back-end with Express, PostgreSQL & NodeJS.

## Execute locally

1. Installing packages:
* On root directory, execute (for root node_modules):
    ```
    npm install
    ```
    Afterwards, execute (for client & server node_modules):
    ```
    npm install-packages
    ```
    Following this will ensure all of the packages are installed correctly.
    
    ### Side note: 
    
    Root folder is in charge of keeping it simple while maintaining server and client folders separate. 'Concurrently' package helps us run commands on both directories simultaneously with a one-liner.

2. After installing in the above order, execute:
    ```
    npm start
    ```

    This is another one-liner that starts execution of server & client side using 'concurrently'.

### Further information will be published in this README file
