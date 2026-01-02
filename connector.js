// البحث عن خانة الإدخال في صفحتك
const inputField = document.querySelector('input');

if (inputField) {
    inputField.addEventListener('change', async () => {
        const username = inputField.value.trim();
        if (username.length < 3) return; // لا يبحث إذا كان الاسم قصيراً جداً

        console.log(`📡 Scanning for: ${username}...`);

        try {
            const response = await fetch(`http://localhost:3000/scan?username=${username}`);
            const result = await response.json();

            if (result.success) {
                // عرض النتيجة في منطقة الـ Intelligence
                let display = document.getElementById('intel-result');
                if (!display) {
                    display = document.createElement('div');
                    display.id = 'intel-result';
                    inputField.parentElement.appendChild(display);
                }

                display.innerHTML = `
                    <div style="margin-top: 15px; padding: 10px; border: 2px solid lime; background: #000; display: inline-block; width: 200px;">
                        <img src="${result.imageUrl}" style="width: 100%; border: 1px solid #333;">
                        <div style="color: lime; font-family: monospace; font-size: 14px; margin-top: 8px;">
                            NAME: ${result.username}<br>
                            ID: ${result.userId}
                        </div>
                    </div>
                `;
            }
        } catch (err) {
            console.log("Scanner offline");
        }
    });
}