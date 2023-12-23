# TopSpin (CIS 550 Final Project)

### Description

TopSpin is a web application that aims to use compelling data across ATP (Association of Tennis Professionals) and WTA (Women’s Tennis Association) tournaments and matches to provide greater insight into the most infamous question in any sport - who is the greatest of all time (GOAT)? It aggregates data about athletes, rankings, and matches dating back to late 1800s, and match odds from 2000 to 2019. The web app displays various dynamic summary views and more in-depth pages about tennis players and matches based on historical data.

Visit the live web app @ [topspin.peterai.me](https://topspin.peterai.me/)

### Technologies

- `Node.js`
- `Express.js`
- `MySQL`
- `React`
- `Material UI`
- `Python`
- `Pytorch`
- `Numpy`
- `Pandas`

### Project Installation and Setup

#### Downloading Node.js dependencies

To install server packages (from project root)

    cd server
    npm install

To install client packages (from project root)

    cd client
    npm install

This will install all necessary dependencies to run the project.

#### Setting up Flask server

Ensure Python version >3.8x is installed. To install Python packages, dependencies, and set up Flask server:

```
cd src/ml
pip install -r ./requirements.txt
```

#### Running the project

Note that a .env file placed at the project root containing the values specified in `server/config.js` is required to run this project locally and access the database. For security reasons, this file is not available in our GitHub repository.

Running the Flask server (port 5002):

    cd src/ml
    sh run_flask.sh

Running the node server (port 8080):

    cd server
    npm run start

Running the client:

    cd client
    npm run dev

Then, point your browser at [localhost:5173](http://localhost:5173/) to view the webpage!

### Data

#### Raw Data

The core data used for this project consists of information about tennis tournaments, matches, and players through time dating back to the late 1800s for ATP and early 1900s for WTA. It is available on github in Jeff Sackmann's repos:

- [tennis_wta](https://github.com/JeffSackmann/tennis_wta)
- [tennis_atp](https://github.com/JeffSackmann/tennis_atp)

Additionally, we use betting odds for tennis matches after 2000, available on [Kaggle](https://www.kaggle.com/datasets/hakeem/atp-and-wta-tennis-data) and on [github](https://github.com/chief-r0cka/MLT).

#### Preprocessed Data

Due to constraints on file size, cleaned and aggregated data is stored in CSV files in a shared drive (request access [here](https://drive.google.com/drive/folders/14wodIUZZj7R28aX-mTczlzbZ5z_Nh_bw?usp=sharing)).

#### Attribution

Tennis databases, files, and algorithms by [Jeff Sackmann / Tennis Abstract](http://www.tennisabstract.com/) is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/).
