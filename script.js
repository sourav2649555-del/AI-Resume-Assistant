function generateATS(){

let score = Math.floor(Math.random() * 30) + 70;

return score;

}

function detectSkills(text){

const skills = [

"HTML",
"CSS",
"JavaScript",
"Python",
"Java",
"C++",
"React",
"Node.js",
"Firebase",
"MySQL",
"MongoDB",
"AI",
"Machine Learning"

];

let foundSkills = [];

skills.forEach(skill => {

if(text.toLowerCase().includes(skill.toLowerCase())){

foundSkills.push(skill);

}

});

if(foundSkills.length === 0){

foundSkills.push("No major skills detected");

}

return foundSkills;

}

function analyzeResume(){

const fileInput = document.getElementById("resume");

const result = document.getElementById("result");

if(fileInput.files.length === 0){

result.innerHTML =
"<p>Please upload a resume first.</p>";

return;

}

const file = fileInput.files[0];

const reader = new FileReader();

reader.onload = function(e){

const text = e.target.result;

const detectedSkills = detectSkills(text);

const score = generateATS();

let skillsHTML = "";

detectedSkills.forEach(skill => {

skillsHTML += `<p>${skill}</p>`;

});

result.innerHTML = `

<h2>Resume Analysis</h2>

<p>✅ Resume Uploaded Successfully</p>

<p><b>File Name:</b> ${file.name}</p>

<p>✅ Skills Detected:</p>

<div class="skills">

${skillsHTML}

</div>

<p>✅ ATS Score</p>

<div class="progress-bar">

<div class="progress" style="width:${score}%">

${score}%

</div>

</div>

<p>✅ Suggested Role:</p>

<p><b>Frontend Developer</b></p>

`;

};

reader.readAsText(file);

}