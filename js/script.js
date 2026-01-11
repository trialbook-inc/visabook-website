// Smooth Scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Hamburger animation
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const triggers = document.querySelectorAll('.dropdown-trigger');

    // Toggle Main Menu
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Optional: change bars to X
        menuToggle.classList.toggle('is-open-icon');
    });

    // Toggle Accordions
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const parent = trigger.closest('.dropdown');
                parent.classList.toggle('is-open');
            }
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
/*
//Floating Chatbot logic
let rawPath = window.location.pathname.toLowerCase();
if (rawPath.length > 1 && rawPath.endsWith('/')) {
    rawPath = rawPath.slice(0, -1);
}
const currentPath = rawPath || "/";

const PAGE_CONFIG = {
    "/full-service": {
        hook: "Want an expert-led, stress-free application? 💼", 
        intro: "Our licensed RCICs handle everything from start to finish. We even offer a **Price Match Guarantee**—you won't find a better expert rate in Canada. What describes your situation?.", 
        source: "Full Service Page"
    },
    "/self-service": {
        hook: "Ready to take control of your own application? 🛠️", 
        intro: "Save thousands by doing it yourself with our professional platform guidance. What type of immigration support are you looking for?", 
        source: "Self Service Page" 
    },
    "/temporary-residence": { 
        hook: "Want to visit, study, or work in Canada? 🇨🇦", 
        intro: "Temporary residence is the fastest way to get your foot in the door. Ready to get started—what describes your immigration needs today?", 
        source: "Temporary Residence Page" 
    },
    "/work-immigration": { 
        hook: "Is a Canadian career in your future? 💼", 
        intro: "Work permits are a strategic bridge to Permanent Residency. Which path best reflects your immigration goals today?", 
        source: "Work Immigration Page" 
    },
    "/permanent-residence": { 
        hook: "Ready to call Canada your forever home? 🏠", 
        intro: "From Express Entry to PNPs, we specialize in making your dream a reality. Which immigration pathway aligns best with your plans today?", 
        source: "Permanent Residence Page" 
    },
    "/sponsorship": { 
        hook: "Want to bring your family to Canada? 👨‍👩‍👧‍👦", 
        intro: "Reuniting families is at the heart of what we do. Which immigration option best fits your situation today?", 
        source: "Family Sponsorship Page" 
    },
    "/business-immigration": { 
        hook: "Launching a business in Canada? 📈", 
        intro: "Canada is looking for innovative entrepreneurs and investors. Which immigration pathway best matches your ambitions today?", 
        source: "Business Immigration Page" 
    },
    "/appeals": { 
        hook: "Got a refusal? Don’t give up just yet. 🛑", 
        intro: "A refusal isn't always the end. Our experts specialize in Judicial Reviews. What type of immigration case was refused for you?", 
        source: "Appeals Page" 
    },
    "/citizenship": { 
        hook: "Ready to get your Canadian Passport? 🇨🇦", 
        intro: "The final milestone of your journey! Let's get started. Which immigration goal are you ready to achieve today?", 
        source: "Citizenship Page" 
    },
    "/pricing": { 
        hook: "Which path fits your budget? 💰", 
        intro: "Whether you want DIY tools or expert-led Full-Service, we have a plan. Which approach fits your immigration needs today?", 
        source: "Pricing Page" 
    },
    "/about": { 
        hook: "Want to learn how we can support your journey? 👋", 
        intro: "We have licensed immigration experts (RCICs) on board to help you. Which immigration path would you like guidance on today?", 
        source: "About Us Page" 
    },
    "/": { 
        hook: "Hi 👋 I can run a free eligibility assessment for you.", 
        intro: "Welcome! It takes less than a minute to see which programs you qualify for. Which immigration option are you interested in exploring today?", 
        source: "Landing Page" 
    }
};

const activeConfig = PAGE_CONFIG[currentPath] || PAGE_CONFIG["/"];
let chatData = { source: activeConfig.source };

document.addEventListener("DOMContentLoaded", () => {
    const hookPara = document.querySelector('#chat-hook p');
    if (hookPara) hookPara.innerHTML = activeConfig.hook;
});

function toggleChat(event) {
    if (event) {
        event.stopPropagation(); // Stops the click from bubbling up to the document
        event.preventDefault();
    }
    
    const chatWindow = document.getElementById('chat-window');
    const chatHook = document.getElementById('chat-hook');
    
    chatWindow.classList.toggle('hidden');
    
    // Always hide the hook when the window is opened
    if (!chatWindow.classList.contains('hidden')) {
        chatHook.classList.add('hidden');
    }
    
    if (chatData.step === undefined) {
        chatData.step = 0;
        nextStep(1);
    }
}

document.addEventListener('click', function(event) {
    const chatWidget = document.getElementById('visa-chat-widget');
    const chatWindow = document.getElementById('chat-window');

    // If the click is completely outside the entire widget area, hide the window
    if (chatWidget && !chatWidget.contains(event.target)) {
        chatWindow.classList.add('hidden');
    }
});

document.getElementById('chat-window').addEventListener('click', function(event) {
    event.stopPropagation();
});

function addMessage(text, isUser = false) {
    const msg = document.createElement('div');
    msg.className = isUser ? 'user-msg' : 'bot-msg';
    msg.innerText = text;
    document.getElementById('chat-body').appendChild(msg);
    scrollToBottom();
}

function clearControls() {
    const body = document.getElementById('chat-body');
    const controls = body.querySelectorAll('.button-grid, .chat-input, .chat-btn');
    controls.forEach(el => el.remove());
}

function scrollToBottom() {
    const body = document.getElementById('chat-body');
    setTimeout(() => { body.scrollTop = body.scrollHeight; }, 100);
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

function createButtons(options, onSelect) {
    const body = document.getElementById('chat-body');
    const grid = document.createElement('div');
    grid.className = 'button-grid';
    options.forEach(opt => {
        let btn = document.createElement('button');
        btn.className = 'chat-btn';
        btn.innerText = opt;
        btn.onclick = () => onSelect(opt);
        grid.appendChild(btn);
    });
    body.appendChild(grid);
    scrollToBottom();
}

function nextStep(step, val = null) {
    if (val) {
        clearControls();
        addMessage(val, true);
    }

    switch(step) {
        case 1: // Goal
            addMessage(activeConfig.intro);
            createButtons(["Study Permit", "Work Permit", "PR/Express Entry", "Visitor Visa", "Citizenship", "Sponsorship", "Not sure"], (v) => { chatData.intent = v; nextStep(2, v); });
            break;
        case 2: // Urgency
            addMessage("How soon do you want to move?");
            createButtons(["Immediately (0–3 months)", "Soon (3–6 months)", "Exploring options (6+ months)"], (v) => { chatData.urgency = v; nextStep(3, v); });
            break;
        case 3: // Name
            addMessage("Great! What’s your full legal name?");
            createInput("text", "Enter your name...", (v) => { chatData.name = v; nextStep(4, v); });
            break;
        case 4: // Phone
            addMessage("Share your phone number (optional):");
            createInput("tel", "Phone number...", (v) => { chatData.phone = v; nextStep(5, v); }, true);
            break;
        case 5: // Email
            addMessage("Please provide your email so we can share your assessment results:");
            createInput("email", "email@example.com", (v) => { chatData.email = v; nextStep(6, v); });
            break;
        case 6: // Citizenship
            addMessage("What's your country of citizenship?");
            createInput("text", "Country name...", (v) => { chatData.country = v; nextStep(7, v); });
            break;
        case 7: // Experience
            addMessage("Years of work experience:");
            createButtons(["No experience", "Less than 1 year", "1-2 years", "2-3 years", "3 years or more"], (v) => { chatData.experience = v; nextStep(8, v); });
            break;
        case 8: // Education
            addMessage("What's your highest level of education?");
            createButtons(["High school", "Diploma", "Bachelors", "Masters", "PhD"], (v) => { chatData.education = v; nextStep(9, v); });
            break;
        case 9: // English
            addMessage("(Optional) What's your English proficiency level?");
            createButtons(["Skip", "Not tested", "CLB 1-4", "CLB 5-8", "CLB 9+"], (v) => { chatData.english = v; nextStep(10, v); });
            break;
        case 10: // Consent
            addMessage("By providing your information, do you consent to VisaBook contacting you by email with newsletters, service updates, and promotional offers?");
            createButtons(["I accept", "I reject"], (v) => { 
                chatData.consent = v; 
                if (v === "I reject") {
                    handleRejection();
                } else {
                    submitToN8N();
                }
            });
            break;
    }
}

// Add this at the VERY top of your script with your other variables
const CALENDAR_URL = "https://calendar.app.google/h2tZmbhhag6quYYBA"; // <--- MAKE SURE https:// IS HERE

// Function for when a user clicks "I Reject"
function handleRejection() {
    console.log("User rejected consent. Skipping n8n.");
    clearControls();
    addMessage("I reject", true);
    
    addMessage("We are unable to analyze your assessment, however, you may schedule a free consultation session with us to qualify your immigration needs.");
    
    // Force redirect after 4 seconds
    setTimeout(() => {
        console.log("Attempting redirect to:", CALENDAR_URL);
        window.location.assign(CALENDAR_URL);
    }, 4000);
}

async function getIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        chatData.ip_address = data.ip;
    } catch (e) { chatData.ip_address = "Unknown"; }
}

// Function for when a user clicks "I Accept"
async function submitToN8N() {
    clearControls();
    addMessage("I accept", true);
    addMessage("Analyzing your eligibility... 🚀");

    // 1. Attempt Data Gathering and Webhook
    try {
        // Attempt to get IP
        try { 
            await getIP(); 
        } catch(e) { 
            console.warn("IP fetch failed, continuing..."); 
        }

        // DEBUG: View the JSON in your console
        //console.log("Final JSON Payload for n8n:", JSON.stringify(chatData, null, 2));

        // Attempt to send to n8n (Uncomment when ready)
        
        //await fetch('https://your-n8n-instance.com/webhook/immigration-lead', {
        //    method: 'POST',
        //    headers: {'Content-Type': 'application/json'},
        //    body: JSON.stringify(chatData)
        //});
        
    } catch (error) {
        // If the webhook fails, we just log it and move to the next line
        console.error("n8n submission failed, proceeding to redirect:", error);
    }

    // 2. The Next Steps (Always runs because the catch block "swallows" the error)
    setTimeout(() => {
        addMessage("Success! Your assessment is ready. Redirecting you now...");
    }, 1000);

    setTimeout(() => {
        console.log("Final redirecting to:", CALENDAR_URL);
        window.location.assign(CALENDAR_URL);
    }, 2500); // Increased slightly to give the user time to read the message
}
*/

/**
 * SECTION 1: CONFIGURATION & PATH DETECTION
 */
let disclaimerDismissed = false;

window.hideDisclaimer = () => {
    disclaimerDismissed = true;
    const el = document.querySelector('.assessment-disclaimer');
    if (el) el.classList.add('disclaimer-hidden');
};

let rawPath = window.location.pathname.toLowerCase();
if (rawPath.length > 1 && rawPath.endsWith('/')) {
    rawPath = rawPath.slice(0, -1);
}
const currentPath = rawPath || "/";

const PAGE_CONFIG = {
    "/full-service": {
        hook: "Want an expert-led, stress-free application? 💼", 
        intro: "Our licensed RCICs handle everything from start to finish. We even offer a **Price Match Guarantee**.", 
        source: "Full Service Page"
    },
    "/self-service": {
        hook: "Ready to take control of your own application? 🛠️", 
        intro: "Save thousands by doing it yourself with our professional platform guidance.", 
        source: "Self Service Page" 
    },
    "/temporary-residence": { 
        hook: "Want to visit, study, or work in Canada? 🇨🇦", 
        intro: "Temporary residence is the fastest way to get your foot in the door.", 
        source: "Temporary Residence Page" 
    },
    "/work-immigration": { 
        hook: "Is a Canadian career in your future? 💼", 
        intro: "Work permits are a strategic bridge to Permanent Residency.", 
        source: "Work Immigration Page" 
    },
    "/permanent-residence": { 
        hook: "Ready to call Canada your forever home? 🏠", 
        intro: "From Express Entry to PNPs, we specialize in making your dream a reality.", 
        source: "Permanent Residence Page" 
    },
    "/sponsorship": { 
        hook: "Want to bring your family to Canada? 👨‍👩‍👧‍👦", 
        intro: "Reuniting families is at the heart of what we do.", 
        source: "Family Sponsorship Page" 
    },
    "/business-immigration": { 
        hook: "Launching a business in Canada? 📈", 
        intro: "Canada is looking for innovative entrepreneurs and investors.", 
        source: "Business Immigration Page" 
    },
    "/appeals": { 
        hook: "Got a refusal? Don’t give up just yet. 🛑", 
        intro: "A refusal isn't always the end. Our experts specialize in Judicial Reviews.", 
        source: "Appeals Page" 
    },
    "/citizenship": { 
        hook: "Ready to get your Canadian Passport? 🇨🇦", 
        intro: "The final milestone of your journey! Let's get started.", 
        source: "Citizenship Page" 
    },
    "/pricing": { 
        hook: "Which path fits your budget? 💰", 
        intro: "Whether you want DIY tools or expert-led Full-Service, we have a plan.", 
        source: "Pricing Page" 
    },
    "/about": { 
        hook: "Want to learn how we can support your journey? 👋", 
        intro: "We have licensed immigration experts (RCICs) on board to help you.", 
        source: "About Us Page" 
    },
    "/": { 
        hook: "Hi 👋 I can run a free eligibility assessment for you.", 
        intro: "Welcome! It takes less than a minute to see which programs you qualify for.", 
        source: "Landing Page" 
    }
};

const activeConfig = PAGE_CONFIG[currentPath] || PAGE_CONFIG["/"];
const CALENDAR_URL = "https://calendar.app.google/h2tZmbhhag6quYYBA";

// Unified Lead Object
let chatData = { 
    source: activeConfig.source,
    path: currentPath
};

/**
 * SECTION 2: CAROUSEL LOGIC (THE NOVA EXPERIENCE)
 */
let carouselStep = 1;
const totalCarouselSteps = 9;

function initCarousel() {
    const stage = document.getElementById('carousel-stage');
    if (!stage) return;
    renderCarouselCard(1);
}

function renderCarouselCard(step) {
    const stage = document.getElementById('carousel-stage');
    const card = document.createElement('div');
    card.className = 'question-card enter';
    
    // Check if user already closed it; if so, don't show it again
    const disclaimerHtml = disclaimerDismissed ? '' : `
        <div class="assessment-disclaimer">
            <button class="close-disclaimer" onclick="hideDisclaimer()">×</button>
            By chatting, you consent to the chats being recorded, used and shared by us and our service providers according to our 
            <a href="https://www.visabook.ai/privacy-notice" target="_blank">Privacy Notice</a>.
        </div>`;

    let contentHtml = "";

    switch(step) {
        case 1:
            contentHtml = `<h3>${activeConfig.intro}</h3>`;
            // Added '2' as the next step
            contentHtml += generateCarouselButtons(["Study Permit", "Work Permit", "PR/Express Entry", "Visitor Visa", "Sponsorship", "Not sure"], 'intent', 2);
            break;
        case 2:
            contentHtml = `<h3>How soon do you want to move?</h3>`;
            // Added '3' as the next step
            contentHtml += generateCarouselButtons(["Immediately (0–3 months)", "Soon (3–6 months)", "Exploring options (6+ months)"], 'urgency', 3);
            break;
        case 3:
            contentHtml = `<h3>What’s your full legal name?</h3>`;
            contentHtml += `
                <input type="text" class="chat-input" id="c-name" placeholder="Full Name" 
                        onkeydown="handleCarouselEnter(event)">
                <div class="carousel-actions">
                    <button class="carousel-btn primary-btn" onclick="saveCarouselInput('name', 'c-name', 4)">Next</button>
                </div>`;
            break;

        case 4:
            contentHtml = `<h3>Share your phone number (optional)</h3>`;
            contentHtml += `
                <input type="tel" class="chat-input" id="c-phone" placeholder="Phone number" 
                        onkeydown="handleCarouselEnter(event)">
                <div class="carousel-actions">
                        <button class="carousel-btn primary-btn" onclick="saveCarouselInput('phone', 'c-phone', 5)">Next</button>
                </div>`;
            break;

        case 5:
            contentHtml = `<h3>Country of citizenship?</h3>`;
            contentHtml += `
                <input type="text" class="chat-input" id="c-country" placeholder="Country name" 
                        onkeydown="handleCarouselEnter(event)">
                <div class="carousel-actions">
                    <button class="carousel-btn primary-btn" onclick="saveCarouselInput('country', 'c-country', 6)">Next</button>
                </div>`;
            break;
        case 6:
            contentHtml = `<h3>Years of work experience:</h3>`;
            /* FIX: Pass 7 as the next step */
            contentHtml += generateCarouselButtons(["No experience", "Less than 1 year", "1-2 years", "2-3 years", "3 years or more"], 'experience', 7);
            break;
        case 7:
            contentHtml = `<h3>Highest level of education?</h3>`;
            /* FIX: Pass 8 as the next step */
            contentHtml += generateCarouselButtons(["High school", "Diploma", "Bachelors", "Masters", "PhD"], 'education', 8);
            break;
        case 8:
            contentHtml = `<h3>English proficiency level?</h3>`;
            /* FIX: Pass 9 as the next step */
            contentHtml += generateCarouselButtons(["Not tested", "CLB 1-4", "CLB 5-8", "CLB 9+", "Skip"], 'english', 9);
            break;
        case 9:
            contentHtml = `<h3>Where should we send your assessment results? 📧</h3>
                <p style="font-size: 13px; color: #64748b; margin-bottom: 10px;">Enter your email to view your eligibility assessment.</p>
                <input type="email" class="chat-input" id="c-email" placeholder="email@example.com" 
                        onkeydown="handleCarouselEnter(event)">
                <div class="carousel-actions">
                    <button class="carousel-btn primary-btn" onclick="saveCarouselInput('email', 'c-email', 'finish')">Submit</button>
                </div>`;
            break;
    }

    // Combine Disclaimer + Content
    card.innerHTML = disclaimerHtml + contentHtml;

    // Transition Logic
    const oldCard = stage.querySelector('.question-card');
    if (oldCard) {
        oldCard.classList.add('exit');
        setTimeout(() => oldCard.remove(), 500);
    }

    stage.appendChild(card);
    setTimeout(() => card.classList.remove('enter'), 10);

    const prog = document.getElementById('progress-bar');
    if (prog) prog.style.width = `${(step / totalCarouselSteps) * 100}%`;
}

// Carousel Helpers
// Updated to ensure buttons pass the 'next' step correctly
function generateCarouselButtons(options, field, nextStep) {
    const buttonsHtml = options.map(opt => 
        // We pass 'opt' as the value and the nextStep number
        `<button class="carousel-btn" onclick="saveCarouselInput('${field}', '${opt}', ${nextStep})">${opt}</button>`
    ).join('');
    
    return `<div class="button-grid-container">${buttonsHtml}</div>`;
}

// Function to handle Enter key press
window.handleCarouselEnter = (event, nextStepId) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission/page refresh
        // Find the 'Next' button in the same container and click it
        const currentCard = event.target.closest('.question-card');
        const nextBtn = currentCard.querySelector('.primary-btn');
        if (nextBtn) nextBtn.click();
    }
};

// Updated to handle both typed input (IDs) and button clicks (Values)
window.saveCarouselInput = (field, valueOrId, next) => {
    let finalValue;
    const inputEl = document.getElementById(valueOrId);
    
    if (inputEl) {
        finalValue = inputEl.value; // It's a text input
    } else {
        finalValue = valueOrId; // It's a button value
    }

    if (finalValue || field === 'phone') {
        chatData[field] = finalValue || "Not provided";
        if (next === 'finish') {
            finishCarousel('Email Provided');
        } else {
            carouselStep = next;
            renderCarouselCard(carouselStep);
        }
    }
};

window.goToNextCarousel = (next) => {
    carouselStep = next;
    renderCarouselCard(carouselStep);
};

async function finishCarousel(consentType) {
    chatData.consent = consentType; // Records that they clicked Submit
    chatData.source += " (Carousel Mode)";
    
    const stage = document.getElementById('carousel-stage');
    // Clear everything and show loading
    stage.innerHTML = `
        <div class="question-card" style="text-align: center; padding: 40px 0;">
            <div class="spinner"></div> <h3>Analyzing Eligibility... 🚀</h3>
            <p>Great! You’ll now be redirected to schedule your complimentary 30-minute immigration consultation.</p>
        </div>`;
    
    await submitToN8N(true); 
}

/**
 * SECTION 3: FLOATING CHATBOT LOGIC (THE WIDGET)
 */
document.addEventListener("DOMContentLoaded", () => {
    const hookPara = document.querySelector('#chat-hook p');
    if (hookPara) hookPara.innerHTML = activeConfig.hook;
    
    // Auto-init carousel if the element exists on page
    if (document.getElementById('carousel-stage')) initCarousel();
});

function toggleChat(event) {
    if (event) event.stopPropagation();
    const chatWindow = document.getElementById('chat-window');
    const chatHook = document.getElementById('chat-hook');
    
    chatWindow.classList.toggle('hidden');
    if (!chatWindow.classList.contains('hidden')) chatHook.classList.add('hidden');
    
    if (chatData.step === undefined) {
        chatData.step = 0;
        nextStep(1);
    }
}

// Widget Global Clicks
document.addEventListener('click', function(event) {
    const chatWidget = document.getElementById('visa-chat-widget');
    const chatWindow = document.getElementById('chat-window');
    if (chatWidget && !chatWidget.contains(event.target)) {
        chatWindow.classList.add('hidden');
    }
});

function nextStep(step, val = null) {
    if (val) {
        clearControls();
        addMessage(val, true);
    }
    const body = document.getElementById('chat-body');

    switch(step) {
        case 1:
            addMessage(activeConfig.intro);
            createButtons(["Study Permit", "Work Permit", "PR/Express Entry", "Visitor Visa", "Citizenship", "Sponsorship", "Not sure"], (v) => { chatData.intent = v; nextStep(2, v); });
            break;
        case 2:
            addMessage("How soon do you want to move?");
            createButtons(["Immediately (0–3 months)", "Soon (3–6 months)", "Exploring options (6+ months)"], (v) => { chatData.urgency = v; nextStep(3, v); });
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
            addMessage("Please provide your email:");
            createInput("email", "email@example.com", (v) => { chatData.email = v; nextStep(6, v); });
            break;
        case 6:
            addMessage("What's your country of citizenship?");
            createInput("text", "Country name...", (v) => { chatData.country = v; nextStep(7, v); });
            break;
        case 7:
            addMessage("Years of work experience:");
            createButtons(["No experience", "Less than 1 year", "1-2 years", "2-3 years", "3 years or more"], (v) => { chatData.experience = v; nextStep(8, v); });
            break;
        case 8:
            addMessage("Highest level of education?");
            createButtons(["High school", "Diploma", "Bachelors", "Masters", "PhD"], (v) => { chatData.education = v; nextStep(9, v); });
            break;
        case 9:
            addMessage("English proficiency level?");
            createButtons(["Skip", "Not tested", "CLB 1-4", "CLB 5-8", "CLB 9+"], (v) => { chatData.english = v; nextStep(10, v); });
            break;
        case 10:
            addMessage("Do you consent to marketing emails?");
            createButtons(["I accept", "I reject"], (v) => { 
                chatData.consent = v; 
                v === "I accept" ? submitToN8N() : handleRejection();
            });
            break;
    }
}

/**
 * SECTION 4: DATA & NETWORK (SHARED)
 */
async function getIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        chatData.ip_address = data.ip;
    } catch (e) { chatData.ip_address = "Unknown"; }
}

async function submitToN8N(isCarousel = false) {
    if (!isCarousel) {
        clearControls();
        addMessage("I accept", true);
        addMessage("Analyzing your eligibility... 🚀");
    }

    await getIP();

    // DEBUG: View the JSON in your console
    console.log("Final JSON Payload for n8n:", JSON.stringify(chatData, null, 2));

    //try {
    //    await fetch('https://your-n8n-instance.com/webhook/immigration-lead', {
    //        method: 'POST',
    //        headers: {'Content-Type': 'application/json'},
    //        body: JSON.stringify(chatData)
    //    });
    //} catch (error) {
    //    console.error("Submission error:", error);
    //}

    setTimeout(() => {
        if (!isCarousel) addMessage("Success! Redirecting...");
        window.location.assign(CALENDAR_URL);
    }, 4000);
}

function handleRejection() {
    clearControls();
    addMessage("I reject", true);
    addMessage("Redirecting you to consultation...");
    setTimeout(() => window.location.assign(CALENDAR_URL), 2500);
}

// General Utilities
function addMessage(text, isUser = false) {
    const msg = document.createElement('div');
    msg.className = isUser ? 'user-msg' : 'bot-msg';
    msg.innerText = text;
    document.getElementById('chat-body').appendChild(msg);
    scrollToBottom();
}

function clearControls() {
    const body = document.getElementById('chat-body');
    const controls = body.querySelectorAll('.button-grid, .chat-input, .chat-btn');
    controls.forEach(el => el.remove());
}

function scrollToBottom() {
    const body = document.getElementById('chat-body');
    if(body) setTimeout(() => { body.scrollTop = body.scrollHeight; }, 100);
}

function createButtons(options, onSelect) {
    const body = document.getElementById('chat-body');
    const grid = document.createElement('div');
    grid.className = 'button-grid';
    options.forEach(opt => {
        let btn = document.createElement('button');
        btn.className = 'chat-btn';
        btn.innerText = opt;
        btn.onclick = () => onSelect(opt);
        grid.appendChild(btn);
    });
    body.appendChild(grid);
    scrollToBottom();
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