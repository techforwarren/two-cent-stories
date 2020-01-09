# Two Cent Stories

The goal of this project is to demonstrate how much we can accomplish with [Elizabeth Warren's Two-Cent Tax](https://elizabethwarren.com/plans/ultra-millionaire-tax). Tell us about your experience with student debt, and see how easily it can be eliminated with the two-cent tax!

# Working version

The website is now live at [http://twocentstories.com/](http://twocentstories.com/)! Future merges to the `gh-pages` branch will update this site.

# Working with the code

## React app

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Server

### Development and Deployment

#### Install dependencies
`npm install -g serverless`
`cd server`
`npm install`
`virtualenv venv --python=python3`
`source venv/bin/activate`
`pip install -r requirements.txt`
`aws configure`

#### Deploy
`sls deploy`

#### Load data into ElasticSearch
`sls invoke local -f load_sample_data`

#### Test getting submissions
`sls invoke local -f submissions_from_db`
