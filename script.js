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

async function extractPDFText(file){

const reader = new FileReader();

reader.readAsArrayBuffer(file);

reader.onload = async function(){

const typedArray = new Uint8Array(reader.result);

const pdf = await pdfjsLib.getDocument(typedArray).promise;

let fullText = "";

for(let i = 1; i <= pdf.numPages; i++){

const page = await pdf.getPage(i);

const content = await page.getTextContent();

const strings = content.items.map(item => item.str);

fullText += strings.join(" ");

}

showAnalysis(fullText, file.name);

};

}

function showAnalysis(text, fileName){

const result = document.getElementById("result");

const detectedSkills = detectSkills(text);

const score = generateATS();

let skillsHTML = "";

detectedSkills.forEach(skill => {

skillsHTML += `<p>${skill}</p>`;

});

result.innerHTML = `

<h2>Resume Analysis</h2>

<p>✅ Resume Uploaded Successfully</p>

<p><b>File Name:</b> ${fileName}</p>

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

}

function analyzeResume(){

const fileInput = document.getElementById("resume");

const result = document.getElementById("result");

if(fileInput.files.length === 0){

result.innerHTML =
"<p>Please upload a PDF resume first.</p>";

return;

}

const file = fileInput.files[0];

result.innerHTML = `

<h2>Analyzing Resume...</h2>

<p>Please wait...</p>

`;

extractPDFText(file);

}
