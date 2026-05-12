alert("App JS Connected");
const themeToggle = document.getElementById('themeToggle');

let darkMode = true;

themeToggle.addEventListener('click', () => {

    document.body.classList.toggle('light-mode');

    darkMode = !darkMode;

    themeToggle.innerHTML = darkMode ? '🌙' : '☀️';
});


// =========================
// GENERATE RESUME
// =========================

async function generateResume() {

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;

    // AI Generate Summary
    const summary = await aiGenerateSummary(skills, experience);

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


// =========================
// GEMINI AI FUNCTION
// =========================

async function aiGenerateSummary(skills, experience) {

    const API_KEY = "AIzaSyDwbeTe_4mLx0CDhczyLseXiplz7nM9rJI";

    const prompt = `
    Generate a professional ATS-friendly resume summary.

    Skills: ${skills}

    Experience: ${experience}

    Keep it professional and modern.
    `;

    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            }
        );

        const data = await response.json();

        console.log(data);

        const text =
            data.candidates[0].content.parts[0].text;

        return text;

    } catch (error) {

        console.log(error);

        return "Professional software developer with modern technical skills and strong problem-solving abilities.";

    }
}


// =========================
// ATS SCORE
// =========================

function calculateATS(skills, summary, experience) {

    let score = 50;

    if(skills.length > 20) score += 20;

    if(summary.length > 50) score += 15;

    if(experience.length > 50) score += 15;

    if(score > 100) score = 100;

    document.getElementById('atsScore').innerText = score + '%';
}


// =========================
// AI SUGGESTIONS
// =========================

function generateAISuggestions(summary, experience) {

    const suggestions = document.getElementById('suggestions');

    suggestions.innerHTML = '';

    if(summary.length < 50) {

        suggestions.innerHTML += `
        <li>Improve professional summary.</li>
        `;
    }

    if(experience.length < 80) {

        suggestions.innerHTML += `
        <li>Add more detailed work experience.</li>
        `;
    }

    suggestions.innerHTML += `
    <li>Add quantified achievements.</li>
    `;

    suggestions.innerHTML += `
    <li>Use ATS-friendly keywords.</li>
    `;
}


// =========================
// PDF DOWNLOAD
// =========================

async function downloadPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    const content =
        document.getElementById('resumePreview').innerText;

    doc.text(content, 10, 10);

    doc.save('resume.pdf');
}


// =========================
// FILE UPLOAD
// =========================

const uploadInput =
    document.getElementById('resumeUpload');

uploadInput.addEventListener('change', (e) => {

    const file = e.target.files[0];

    if(file) {

        alert(`Uploaded: ${file.name}`);
    }
});
