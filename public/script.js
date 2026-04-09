const chatBody = document.getElementById("chatBody");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");

// 2. NAVIGATION LOGIC
function switchTab(screen) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.querySelectorAll(".bottom-nav button").forEach(b => b.classList.remove("active"));

    if (screen === "chat") {
        document.getElementById("chatScreen").classList.add("active");
        document.getElementById("navChat").classList.add("active");
    } else if (screen === "reels") {
        document.getElementById("reelsScreen").classList.add("active");
        document.getElementById("navReels").classList.add("active");
        loadVideos();
    } else {
        document.getElementById("schemeScreen").classList.add("active");
        document.getElementById("navScheme").classList.add("active");
        loadSchemes();
    }
}
const responses = {
    greetings: [
        "Oye! Kaise ho? 🌸",
        "Hi bhai, kya chal raha hai?",
        "Hello! Main yahin hoon, bolo kya baat hai? 💚",
        "Hi there! Bloom is here for you. 😊"
    ],

    sad: [
        "Arre... kya hua? Tension mat le, main hoon na. 🫂",
        "Mann halka kar le bhai, bol de jo bhi hai.",
        "Life hai bhai, ups and downs toh aate rehte hain. Himmat rakh.",
        "Duniya khatam nahi hui hai, sab thik ho jayega. ❤️"
    ],

    breakup: [
        // "Bhai, ye dard real hai... main samajh sakta hoon. 💔",
        // "Time lagega, par tu strong banega isse.",
        // "Khud se pyaar kar yaar...kuch nhi rakha ensab mai",
        "Move on mushkil hai, par tu kar legi. Stay Strong... Comeback kar.... usko dikha ki thukra ke mera pyaaar meri intekaam dekhega fir tu usko reject karna 💪",
        // "Block maar aur apni life pe focus kar."
    ],

    lonely: [
        "Main hoon na tera dost! Tu akela nahi hai. 📱",
        "Bhai, tu akela nahi hai, main yahin hoon.",
        "Ghar walo ke sath time spend kar bhai !.",
        "Koi akela nhi hota, bhagwan sab ke sath hote h.",
        "Kabhi bhi message kar, ignore nahi karunga."
    ],

    stress: [
        "Gehri saans le... sab thik ho jayega. 🧘‍♂️",
        "Overthinking band kar thodi der ke liye.",
        "Gharwalo ke sath time spend kar...bohot achha lagega.",
        "Break lele bhai, brain bhi rest chahta hai."
    ],

    motivation: [
        "Tu kar sakta hai bhai! 🔥",
        "Aaj mushkil hai, kal easy hoga.",
        "Consistency hi success hai. 🚀",
        "Sher hai tu! Haar mat maan."
    ],

    bored: [
        "Bor ho raha hai? Chal baat karte hain 😄",
        "Kuch naya try kar bhai!",
        "Music sun le ya reel dekh le 🎬"
    ],

    sleepy: [
        "Bhai soja, phone rakh de 💤",
        "Sleep important hai, goodnight 🌙",
        "Kal fresh mind ke saath baat karenge"
    ],

    funny: [
        "😂😂 bhai tu mast hai",
        "Haste reh bhai!",
        "Tera humor top level hai 💯"
    ],

    burnout: [
        "Bhai break lele 🛑 Machine nahi hai tu",
        "Thoda chill kar, sab thik ho jayega",
        "Mummy se baat karle bhai, sab thik ho jayega 💖"
    ],

    // NEW: ANGRY
    angry: [
        "Abe chill kar bhai 😅 kya ho gaya?",
        "Itna gussa kyu? Bata kya scene hai.",
        "Gaali dene se problem solve nahi hoti bhai😆",
        "Control bro, main help karne ke liye hoon."
    ],

    // LOVE / CRUSH
    love: [
        "Ohooo 😏 kisi pe dil aa gaya lagta hai",
        "Love wali vibes aa rahi hai 💖",
        "Bhai careful rehna, pyaar dangerous hota hai 😂",
        "Crush ka scene hai kya?"
    ],

    // STUDY
    study: [
        "Padle bhai 📚 future banega",
        "Thoda focus maar, phone side rakh",
        "Consistency rakhega toh topper banega",
        "Exam aa rahe hain kya? 😄"
    ],

    // NEW: JOKES
    joke: [
        "Ek bachha rote hue school se aaya. Maa: Kya hua? Bachha: Teacher ne maara. Maa: Tune kya kiya tha? Bachha: Kuch nahi, bas pucha tha ki Miss, aapne jo make-up kiya hai, wo kis app se kiya hai? 🤣",
        "Teacher: Batao sabse wafadaar jaanwar kaunsa hai? Student: Murgi! Teacher: Wo kaise? Student: Zinda hai to anda deti hai, mar jaye to leg piece! 🍗😂",
        "Pati: Aaj khane mein kya banaya hai? Patni: Zehar! Pati: Thik hai, tum kha ke so jao, bartan main dho dunga. 💀🤣",
        "  Computer-Mujhe chill karna hai...Laptop-Thik hai, sleep mode mein chala jao 💻😂." ,
        " Internet down hua… aur mai realize ki meri life ka main purpose sirf memes dekhna tha. 🌐💔🤣" ,
        "Murgi: Main pehle aayi ya anda? Main: Relax bro… dono ka future scrambled hai!🐔🥚😂" ,
        "Arz kiya hai... Na dard hai, na aawaz hai... Na dard hai, na aawaz hai... Kyunki mera phone silent par hai! Wah wah! 📱🤪",
        "Dost: Bhai, main kal se subah 5 baje uthunga. Main: Bhai tu uthega nahi, uthega toh bas tera agla sapna! 😴😂"
    ],

    default: [
        "Achha? Phir kya hua?",
        "Bolo bhai, main sun raha hoon 💚",
        "Interesting... aur bata",
        "Samajh raha hoon, continue kar"
    ]
};


// RANDOM PICK
function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}


// MAIN RESPONSE LOGIC
function getResponse(t) {
    t = t.toLowerCase();

    // GREETING
    if (t.includes("hi") || t.includes("hello") || t.includes("hey"))
        return pick(responses.greetings);

    // SAD
    if (t.includes("sad") || t.includes("dukh") || t.includes("rona") || t.includes("upset"))
        return pick(responses.sad);

    // BREAKUP
    if (t.includes("breakup") || t.includes("dhokha") || t.includes("ex"))
        return pick(responses.breakup);

    // JOKE
    if (t.includes("joke") || t.includes("chutkula") || t.includes("hansa") || t.includes("comedy"))
        return pick(responses.joke);

    // LONELY
    if (t.includes("akela") || t.includes("lonely") || t.includes("alone"))
        return pick(responses.lonely);

    // STRESS
    if (t.includes("stress") || t.includes("tension") || t.includes("exam"))
        return pick(responses.stress);

    // BORED
    if (t.includes("bore") || t.includes("kya karu"))
        return pick(responses.bored);

    // MOTIVATION
    if (t.includes("motivation") || t.includes("dar") || t.includes("himmat"))
        return pick(responses.motivation);

    // BURNOUT
    if (t.includes("thak") || t.includes("tired") || t.includes("burnout"))
        return pick(responses.burnout);

    // SLEEP
    if (t.includes("sleep") || t.includes("neend") || t.includes("so raha"))
        return pick(responses.sleepy);

    // FUNNY
    if (t.includes("haha") || t.includes("lol") || t.includes("joke"))
        return pick(responses.funny);

    // LOVE
    if (t.includes("love") || t.includes("crush") || t.includes("pyaar"))
        return pick(responses.love);

    // STUDY
    if (t.includes("study") || t.includes("pad"))
        return pick(responses.study);

    // GAALI DETECTION 
    if (
        t.includes("madarchod") ||
        t.includes("behenchod") ||
        t.includes("bhosdike") ||
        t.includes("chutiya") ||
        t.includes("gandu") ||
        t.includes("bc") ||
        t.includes("bsdk") ||
        t.includes("mc")
    ) {
        return pick(responses.angry);
    }

    return pick(responses.default);
}


// SEND MESSAGE
function sendMsg() {
    let text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const typingId = "typing-" + Date.now();

    let typingDiv = document.createElement("div");
    typingDiv.className = "msg bot typing-style";
    typingDiv.id = typingId;
    typingDiv.innerHTML = "Bloom is listening<span class='dots'>...</span>";

    chatBody.appendChild(typingDiv);
    scrollBottom();

    setTimeout(() => {
        const indicator = document.getElementById(typingId);
        if (indicator) indicator.remove();

        addMessage(getResponse(text), "bot");
    }, 1200);
}
// ADD MESSAGE
function addMessage(text, type) {
    let d = document.createElement("div");
    d.className = "msg " + type;
    d.innerText = text;

    chatBody.appendChild(d);
    scrollBottom();
}

function scrollBottom() { chatBody.scrollTop = chatBody.scrollHeight; }

async function loadVideos() {
    const container = document.getElementById("reelsContainer");
    container.innerHTML = "<p style='text-align:center; color:white;'>Loading vibes... 🌸</p>";

    try {
        const res = await fetch("https://bloom-6g0s.onrender.com/videos");
        const data = await res.json();

        container.innerHTML = "";

        if (data.length === 0) {
            container.innerHTML = "<p style='text-align:center; color:white;'>No videos found. Check API key!</p>";
            return;
        }

        data.forEach(id => {
            let div = document.createElement("div");
            div.className = "reel";
            div.innerHTML = `
                <iframe 
                    src="https://www.youtube.com/embed/${id}?autoplay=0&rel=0&playsinline=1"
                    frameborder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            `;

            container.appendChild(div);
        });

    } catch (err) {
        console.error("Fetch Error:", err);
        container.innerHTML = "<p style='text-align:center; color:red;'>Error loading videos !!</p>";
    }
}
// 6. HELP SCHEMES
function loadSchemes() {
    const container = document.getElementById("schemeContainer");
    container.innerHTML = `
        <div class="emergency-box">
            <p>Immediate Help Needed?</p>
            <a href="tel:14416" class="emergency-btn">📞 Call National Helpline (14416)</a>
            <span>Available 24/7 | Free | Confidential</span>
        </div>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <div class="scheme-card">
            <h3>Tele-MANAS 🧠</h3>
            <p>Govt. of India's 24/7 free mental health helpline.</p>
            <button onclick="window.open('https://telemanas.mohfw.gov.in/')">Visit Website</button>
        </div>
        <div class="scheme-card">
            <h3>Vandrevala Foundation 🤝</h3>
            <p>Free 24/7 crisis intervention and emotional support.</p>
            <button onclick="window.open('https://www.vandrevalafoundation.com/')">Get Support</button>
        </div>
        <div class="scheme-card">
            <h3>NIMHANS 🏥</h3>
            <p>Professional psychological support and counseling.</p>
            <button onclick="window.open('https://nimhans.ac.in/')">Get Help</button>
        </div>
    `;
}

// 7. INITIALIZE
sendBtn.onclick = sendMsg;
input.addEventListener("keypress", (e) => { if (e.key === "Enter") sendMsg(); });
window.onload = () => switchTab("chat");