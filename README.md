# React Quiz App

## Description

This is a React-based quiz application that allows users to answer multiple-choice questions. The app tracks the user's progress, scores, and high scores. It also includes features like a timer and different states for loading, error, active quiz, and finished quiz.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Sorelul/react-quizz.git
    ```
2. Navigate to the project directory:
    ```bash
    cd react-quizz
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the development server:
    ```bash
    npm start
    ```
2. Open your browser and navigate to `http://localhost:3000` to see the app in action.

## Components

-   **App**: The main component that manages the state and renders other components based on the current state.
-   **Header**: Displays the app's header.
-   **Main**: Wraps the main content of the app.
-   **Loader**: Shows a loading spinner while questions are being fetched.
-   **Error**: Displays an error message if there is an issue fetching questions.
-   **StartScreen**: The initial screen that prompts the user to start the quiz.
-   **Question**: Displays the current question and options.
-   **Options**: Renders the answer options for the current question.
-   **NextButton**: Button to proceed to the next question.
-   **Progress**: Shows the user's progress through the quiz.
-   **FinishScreen**: Displays the user's score and high score at the end of the quiz.
-   **Timer**: Counts down the time remaining for the quiz.
-   **Footer**: Wraps the footer content.

# questions.json

The `questions.json` file contains the quiz questions and their respective options. It should be placed in the `public` directory of the project. The file should have the following structure:

```json
[
    {
        "question": "What is the capital of France?",
        "options": ["Paris", "London", "Berlin", "Madrid"],
        "correctOption": 0,
        "points": 10
    },
    {
        "question": "What is 2 + 2?",
        "options": ["3", "4", "5", "6"],
        "correctOption": 1,
        "points": 5
    }
]
```

The app fetches this file to load the quiz questions.
