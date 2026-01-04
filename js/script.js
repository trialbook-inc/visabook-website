// Smooth Scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Simple Scroll Animation Observer
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.6s ease-out";
    observer.observe(card);
});

//FAQ Accordian section
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        
        // Close other FAQ items (Optional: remove this if you want multiple open)
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) item.classList.remove('active');
        });

        // Toggle the clicked item
        faqItem.classList.toggle('active');
    });
});

//Animation for the external essential helpful links
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1 // Lowered to 10% so it triggers sooner
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-now');
                // Optional: Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.experience-layout').forEach(el => {
        observer.observe(el);
    });
});

//Chatbot logic
let chatData = { source: "VisaBook Website" };

// 1. Modified Toggle Function
function toggleChat(event) {
    if (event) event.stopPropagation(); // Prevents document listener from firing immediately
    const chatWindow = document.getElementById('chat-window');
    chatWindow.classList.toggle('hidden');
    document.getElementById('chat-hook').classList.add('hidden');
    
    if (chatData.step === undefined) {
        chatData.step = 0;
        nextStep(1);
    }
}

// 2. NEW: Global Outside Click Listener
document.addEventListener('click', function(event) {
    const chatWidget = document.getElementById('visa-chat-widget');
    const chatWindow = document.getElementById('chat-window');

    // If the click happened OUTSIDE the widget AND the window is NOT hidden, hide it.
    if (!chatWidget.contains(event.target)) {
        if (!chatWindow.classList.contains('hidden')) {
            chatWindow.classList.add('hidden');
        }
    }
});

// 3. Prevent clicks inside the window from closing it
document.getElementById('chat-window').addEventListener('click', function(event) {
    event.stopPropagation();
});

function hideHook() { document.getElementById('chat-hook').classList.add('hidden'); }

function scrollToBottom() {
    const body = document.getElementById('chat-body');
    setTimeout(() => {
        body.scrollTop = body.scrollHeight;
    }, 100);
}

function addMessage(text, isUser = false) {
    const msg = document.createElement('div');
    msg.className = isUser ? 'user-msg' : 'bot-msg';
    msg.innerText = text;
    document.getElementById('chat-body').appendChild(msg);
    scrollToBottom();
}

function clearControls() {
    // Removes all buttons and inputs from the chat body so user can't click twice
    const body = document.getElementById('chat-body');
    const controls = body.querySelectorAll('.button-grid, .chat-input, .chat-btn');
    controls.forEach(el => el.remove());
}

async function getIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        chatData.ip_address = data.ip;
    } catch (e) { chatData.ip_address = "Unknown"; }
}

function nextStep(step, val = null) {
    const body = document.getElementById('chat-body');
    if (val) {
        clearControls();
        addMessage(val, true);
    }

    switch(step) {
        case 1:
            addMessage("What best describes you?");
            const grid = document.createElement('div');
            grid.className = 'button-grid';
            const options = ["Study in Canada", "Work in Canada", "Family sponsorship", "PR / Express Entry", "Not sure"];
            options.forEach(opt => {
                let btn = document.createElement('button');
                btn.className = 'chat-btn';
                btn.innerText = opt;
                btn.onclick = () => { chatData.intent = opt; nextStep(2, opt); };
                grid.appendChild(btn);
            });
            body.appendChild(grid);
            scrollToBottom();
            break;
            
        case 2:
            addMessage("How soon do you want to move?");
            const uGrid = document.createElement('div');
            uGrid.className = 'button-grid';
            const urgency = { "Immediately (0–3 months)": "High", "Soon (3–6 months)": "Medium", "Exploring options (6+ months)": "Low" };
            Object.keys(urgency).forEach(key => {
                let btn = document.createElement('button');
                btn.className = 'chat-btn';
                btn.innerText = key;
                btn.onclick = () => { chatData.urgency = urgency[key]; nextStep(3, key); };
                uGrid.appendChild(btn);
            });
            body.appendChild(uGrid);
            scrollToBottom();
            break;

        case 3:
            addMessage("Great! What’s your full legal name?");
            createInput("text", "Enter your name...", (v) => { chatData.name = v; nextStep(4, v); });
            break;

        case 4:
            addMessage("Share your phone number (optional):");
            createInput("tel", "Phone number...", (v) => { chatData.phone = v; nextStep(5, v); }, true);
            break;

        case 5:
            addMessage("Finally, your email for the assessment:");
            createInput("email", "email@example.com", (v) => { submitToN8N(v); });
            break;
    }
}

function createInput(type, placeholder, onDone, skippable = false) {
    const body = document.getElementById('chat-body');
    const input = document.createElement('input');
    input.type = type;
    input.className = 'chat-input';
    input.placeholder = placeholder;
    input.onkeypress = (e) => { if(e.key === 'Enter' && input.value) onDone(input.value) };
    body.appendChild(input);

    if(skippable) {
        const skip = document.createElement('button');
        skip.className = 'chat-btn';
        skip.style.marginTop = "8px";
        skip.innerText = "Skip";
        skip.onclick = () => onDone("Not provided");
        body.appendChild(skip);
    }
    scrollToBottom();
}

async function submitToN8N(email) {
    clearControls();
    addMessage(email, true);
    chatData.email = email;
    
    // Capture IP before sending
    await getIP();
    
    addMessage("Analyzing your eligibility... 🚀");
    
    // 1. Send data to n8n
    try {
        fetch('https://your-n8n-instance.com/webhook/immigration-lead', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(chatData)
        });
    } catch (e) {
        console.error("n8n submission failed", e);
    }

    // 2. Show success message
    setTimeout(() => {
        addMessage("Success! Your assessment is ready. Redirecting you to book your free 30-min consultation...");
    }, 1000);

    // 3. Redirect to Google Meet / Calendar after 3.5 seconds
    setTimeout(() => {
        const calendarLink = "https://calendar.app.google/h2tZmbhhag6quYYBA";
        window.location.href = calendarLink;
    }, 3500);
}