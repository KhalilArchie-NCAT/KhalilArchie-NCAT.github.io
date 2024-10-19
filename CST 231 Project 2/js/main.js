function loadLesson(topic) {
    let content = '';
    switch(topic) {
        case 'variables':
            content = '<h3>Variables in JavaScript</h3><p>Learn about var, let, and const...</p>';
            break;
        case 'loops':
            content = '<h3>Loops in JavaScript</h3><p>Learn about for, while, and do-while loops...</p>';
            break;
        // Add more cases for other topics
    }
    document.getElementById('lesson-content').innerHTML = content;
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
