function loadExercise(exercise) {
    let content = '';
    switch(exercise) {
        case 'exercise1':
            content = '<h3>Exercise 1: Variable Declaration</h3><p>Write a JavaScript code to declare a variable using var, let, or const.</p>';
            break;
        case 'exercise2':
            content = '<h3>Exercise 2: Looping</h3><p>Write a JavaScript loop that iterates over an array of numbers and prints each number.</p>';
            break;
        case 'exercise3':
            content = '<h3>Exercise 3: Functions</h3><p>Write a function that takes two numbers and returns their sum.</p>';
            break;
        // Add more exercises as needed
    }
    document.getElementById('exercise-content').innerHTML = content;
}

function runCode() {
    const userCode = document.getElementById('user-code').value;
    try {
        eval(userCode); // This will run the user's code
        document.getElementById('feedback').innerText = 'Code ran successfully!';
    } catch (error) {
        document.getElementById('feedback').innerText = 'Error: ' + error.message;
    }
}
