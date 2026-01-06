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
// Get the path, lowercase it, and remove the trailing slash
let rawPath = window.location.pathname.toLowerCase();
if (rawPath.length > 1 && rawPath.endsWith('/')) {
    rawPath = rawPath.slice(0, -1);
}

// Ensure the root path remains "/"
const currentPath = rawPath || "/";

console.log("📍 Sanitized Path for Config:", currentPath);

// Updated PAGE_CONFIG with lowercased keys
const PAGE_CONFIG = {
    "/full-service": {
        hook: "Want an expert-led, stress-free application? 💼",
        intro: "Our licensed RCICs handle everything from start to finish. We even offer a **Price Match Guarantee**—you won't find a better expert rate in Canada. What describes your situation?",
        source: "Full Service Page"
    },
    "/self-service": {
        hook: "Ready to take control of your own application? 🛠️",
        intro: "Save thousands by doing it yourself with our professional platform guidance. Plus, our **Price Match Guarantee** ensures you get the best tools for the lowest price. What are you applying for?",
        source: "Self Service Page"
    },
    "/temporary-residence": {
        hook: "Want to visit, study, or work in Canada? 🇨🇦",
        intro: "Temporary residence is the fastest way to get your foot in the door. Whether it's for tourism or a career jumpstart, we can check your eligibility in seconds. What’s your goal?",
        source: "Temporary Residence Page"
    },
    "/work-immigration": {
        hook: "Is a Canadian career in your future? 💼",
        intro: "Work permits are a strategic bridge to Permanent Residency. Whether you need an employer-specific or an open permit, let's see which path fits your profile. What best describes you?",
        source: "Work Immigration Page"
    },
    "/permanent-residence": {
        hook: "Ready to call Canada your forever home? 🏠",
        intro: "From Express Entry to PNPs, we specialize in making your dream of living in Canada a legal reality. Let's find your highest-scoring pathway. What describes you?",
        source: "Permanent Residence Page"
    },
    "/sponsorship": {
        hook: "Want to bring your family to Canada? 👨‍👩‍👧‍👦",
        intro: "Reuniting families is at the heart of what we do. We help bring spouses, parents, and children together for good. Who are you looking to sponsor?",
        source: "Family Sponsorship Page"
    },
    "/business-immigration": {
        hook: "Launching a business in Canada? 📈",
        intro: "Canada is looking for innovative entrepreneurs and investors to drive the economy. Secure your PR while building your startup. What describes your investment level?",
        source: "Business Immigration Page"
    },
    "/appeals": {
        hook: "Got a refusal? Don’t give up just yet. 🛑",
        intro: "A refusal isn't always the end. Our experts specialize in Judicial Reviews and Appeal Division challenges to fight for your status. What was the reason for refusal?",
        source: "Appeals Page"
    },
    "/citizenship": {
        hook: "Ready to get your Canadian Passport? 🇨🇦",
        intro: "The final milestone of your journey! We'll help you prepare for the test and ensure your residency requirements are perfectly documented. Are you a PR yet?",
        source: "Citizenship Page"
    },
    "/pricing": {
        hook: "Which path fits your budget? 💰",
        intro: "Whether you want DIY tools or an expert-led Full-Service package with licensed RCICs, we have a plan for you. Which level of support are you looking for?",
        source: "Pricing Page"
    },
    "/about": {
        hook: "Want to learn how we can support your journey? 👋",
        intro: "We have licensed immigration experts (RCICs) on board that can help you on your journey. What best describes your immigration goal?",
        source: "About Us Page"
    },
    "/": {
        hook: "Hi 👋 I can run a free eligibility assessment for you.",
        intro: "Welcome! It takes less than a minute to see which Canadian programs you qualify for. What best describes you?",
        source: "Landing Page"
    }
};

// Select config with a fallback
const activeConfig = PAGE_CONFIG[currentPath] || PAGE_CONFIG["/"];

// Initialize data
let chatData = { source: activeConfig.source };

// Update the Hook text as soon as the page loads
document.addEventListener("DOMContentLoaded", () => {
    const hookPara = document.querySelector('#chat-hook p');
    if (hookPara) {
        hookPara.innerHTML = activeConfig.hook;
    }
});

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
            // FIXED: Use activeConfig.intro instead of hardcoded text
            addMessage(activeConfig.intro);
            
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

    // DEBUG: View the JSON in your console
    //console.log("Final JSON Payload for n8n:", JSON.stringify(chatData, null, 2));
    
    addMessage("Analyzing your eligibility... 🚀");
    
    // Send to n8n
    try {
        const response = await fetch('https://your-n8n-instance.com/webhook/immigration-lead', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(chatData)
        });
        //console.log("n8n Response Status:", response.status);
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