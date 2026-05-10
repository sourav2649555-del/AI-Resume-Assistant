function generateATS(){

let score = Math.floor(Math.random() * 30) + 70;

let role = "";

let comment = "";

if(score >= 90){

role = "Full Stack Developer";

comment = "Excellent resume with strong technical skills.";

}

else if(score >= 80){

role = "Frontend Developer";

comment = "Good resume but add more projects.";

}

else{

role = "Junior Web Developer";

comment = "Improve resume formatting and add certifications.";

}

return {

score: score,

role: role,

comment: comment

};

}

function analyzeResume(){

const fileInput = document.getElementById("resume");

const result = document.getElementById("result");

if(fileInput.files.length === 0){

result.innerHTML =
"<p>Please upload a resume first.</p>";

return;

}

const fileName = fileInput.files[0].name;

result.innerHTML = `

<h2>Analyzing Resume...</h2>

<p>Please wait...</p>

`;

setTimeout(() => {

const data = generateATS();

result.innerHTML = `

<h2>Resume Analysis</h2>

<p>✅ Resume Uploaded Successfully</p>

<p><b>File Name:</b> ${fileName}</p>

<p>✅ Skills Found:</p>

<div class="skills">

<p>HTML</p>

<p>CSS</p>

<p>JavaScript</p>

<p>Firebase</p>

</div>

<p>✅ ATS Score</p>

<div class="progress-bar">

<div class="progress" style="width:${data.score}%">

${data.score}%

</div>

</div>

<p>✅ Suggested Role:</p>

<p><b>${data.role}</b></p>

<p>✅ AI Feedback:</p>

<p>${data.comment}</p>

`;

}, 2000);

}