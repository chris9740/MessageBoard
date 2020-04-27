# Message Board API

Message board is a REST API for sending messages on a board.

## Installation

Clone this package from Github, cd into it, and run `npm install` to install the dependencies needed

```bash
git clone https://github.com/chris9740/MessageBoard.git
cd MessageBoard
npm install
```

## Configuration
This project requires some configuration. Create the files `./config/dev.env` and `./config/prod.env`, and copy paste the contents from `./config/sample.env` and insert the correct values. `./config/dev.env` is only required if you're planning to run the server in production mode, and `./config/prod.env` is not required for development mode.

## Running the API server

Run in development mode
```bash
npm run dev
```
Run in production mode
```bash
npm start
```

## License
[MIT](https://choosealicense.com/licenses/mit/)