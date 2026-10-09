document.addEventListener('DOMContentLoaded', () => {
    const makePlanBtn = document.getElementById('makePlanBtn');
    const outputSection = document.getElementById('outputSection');
    const planContent = document.getElementById('planContent');
    const saveNoteBtn = document.getElementById('saveNoteBtn');
    const journalInput = document.getElementById('journalInput');
    const journalList = document.getElementById('journalList');

    let notes = [];

    makePlanBtn.addEventListener('click', () => {
        const location = document.getElementById('locationInput').value || 'Local Park';
        const totalTime = parseInt(document.getElementById('timeInput').value) || 45;
        const interestsRaw = document.getElementById('interestsInput').value || 'walking, fresh air';
        
        // इंटरेस्ट्स को कॉमा के आधार पर अलग-अलग बांटना
        const interests = interestsRaw.split(',').map(i => i.trim()).filter(i => i.length > 0);

        makePlanBtn.innerText = '✨ Crafting your custom plan...';
        makePlanBtn.disabled = true;

        setTimeout(() => {
            makePlanBtn.innerText = '✨ Make My Plan';
            makePlanBtn.disabled = false;
            outputSection.classList.remove('hidden');

            // हर एक इंटरेस्ट के लिए समय को बराबर हिस्सों में बांटना
            const timePerTask = Math.max(5, Math.floor(totalTime / Math.max(interests.length, 1)));

            let tasksHtml = '';
            interests.forEach((interest, index) => {
                const formattedInterest = interest.charAt(0).toUpperCase() + interest.slice(1);
                tasksHtml += `
                    <div class="task-item">
                        <input type="checkbox">
                        <div>
                            <strong>${index + 1}. ${formattedInterest} Focus (${timePerTask} mins)</strong><br>
                            <small style="color: #64748b;">Dedicated time for your interest in <strong>${interest}</strong> at ${location}. Keep your phone in your pocket and fully immerse yourself.</small>
                        </div>
                    </div>
                `;
            });

            // डायनामिक आउटपुट दिखाना
            planContent.innerHTML = `
                <div class="plan-box">
                    <strong>📍 Destination:</strong> ${location} (${totalTime} mins total)<br>
                    <small style="color: #047857;">Custom split into ${interests.length} distinct activities based on your inputs.</small>
                </div>
                ${tasksHtml}
            `;
        }, 500);
    });

    saveNoteBtn.addEventListener('click', () => {
        const text = journalInput.value.trim();
        if (!text) return;

        notes.push(text);
        journalInput.value = '';

        journalList.innerHTML = notes.map(n => `<div class="note-item">🌿 ${n}</div>`).join('');
    });
});