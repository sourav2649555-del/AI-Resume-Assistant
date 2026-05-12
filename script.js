const themeToggle = document.getElementById('themeToggle');

let darkMode = true;

themeToggle.addEventListener('click', () => {

    document.body.classList.toggle('light-mode');

    darkMode = !darkMode;

    themeToggle.innerHTML = darkMode ? '🌙' : '☀️';
});

function generateResume() {

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const skills = document.getElementById('skills').value;
    const summary = document.getElementById('summary').value;
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;

    const preview = document.getElementById('resumePreview');

    preview.innerHTML = `

        <h1>${name}</h1>

        <p>${email} | ${phone}</p>

        <hr>

        <h2>Professional Summary</h2>
        <p>${summary}</p>

        <h2>Skills</h2>
        <p>${skills}</p>

        <h2>Experience</h2>
        <p>${experience}</p>

        <h2>Education</h2>
        <p>${education}</p>

    `;

    calculateATS(skills, summary, experience);

    generateAISuggestions(summary, experience);
}

function calculateATS(skills, summary, experience) {

    let score = 50;

    if(skills.length > 20) score += 20;
    if(summary.length > 50) score += 15;
    if(experience.length > 50) score += 15;

    if(score > 100) score = 100;

    document.getElementById('atsScore').innerText = score + '%';
}

function generateAISuggestions(summary, experience) {

    const suggestions = document.getElementById('suggestions');

    suggestions.innerHTML = '';

    if(summary.length < 50) {
        suggestions.innerHTML += '<li>Improve professional summary.</li>';
    }

    if(experience.length < 80) {
        suggestions.innerHTML += '<li>Add more detailed work experience.</li>';
    }

    suggestions.innerHTML += '<li>Add quantified achievements.</li>';
    suggestions.innerHTML += '<li>Use ATS-friendly keywords.</li>';
}

async function downloadPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    const content = document.getElementById('resumePreview').innerText;

    doc.text(content, 10, 10);

    doc.save('resume.pdf');
}

const uploadInput = document.getElementById('resumeUpload');

uploadInput.addEventListener('change', (e) => {

    const file = e.target.files[0];

    if(file) {
        alert(`Uploaded: ${file.name}`);
    }
});
