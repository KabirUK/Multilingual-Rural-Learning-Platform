/* ================= BACKEND LOGIN ================= */

function loginWithBackend() {
    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;
    const msg = document.getElementById("loginMessage");

    if (!email || !password) {
        if(msg) {
            msg.innerText = "Please fill all fields";
            msg.style.color = "red";
        } else {
            alert("Please fill all fields");
        }
        return;
    }

    fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userRole", data.role);
            window.location.href = "home.html";
        } else {
            if(msg) {
                msg.innerText = data.message;
                msg.style.color = "red";
            } else {
                alert(data.message);
            }
        }
    })
    .catch(error => {
        console.error("Login Error:", error);
        if(msg) {
            msg.innerText = "Server not reachable.";
            msg.style.color = "red";
        } else {
            alert("Server not reachable.");
        }
    });
}

/* ================= BACKEND REGISTER ================= */

function registerWithBackend() {
    const name = document.getElementById("name")?.value;
    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;
    const role = document.getElementById("role")?.value;
    const msg = document.getElementById("message");

    if (!name || !email || !password || !role) {
        if(msg) {
            msg.innerText = "Please fill all fields";
            msg.style.color = "red";
        } else {
            alert("Please fill all fields");
        }
        return;
    }

    fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
    })
    .then(response => response.json())
    .then(data => {
        if(msg) {
            msg.innerText = data.message;
            msg.style.color = data.status === "success" ? "green" : "red";
        } else {
            alert(data.message);
        }

        if (data.status === "success") {
            // redirect to login page after 1 second
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);
        }
    })
    .catch(error => {
        console.error("Register Error:", error);
        if(msg) {
            msg.innerText = "Server not reachable.";
            msg.style.color = "red";
        } else {
            alert("Server not reachable.");
        }
    });
}

/* ================= HOME PAGE ================= */

function loadHome() {

    // Check if user is logged in
    const loggedIn = localStorage.getItem("loggedIn");
    const userEmail = localStorage.getItem("userEmail");
    const userRole = localStorage.getItem("userRole");

    if (loggedIn !== "true" || !userEmail) {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }

    // Show logged in user
    const studentDisplay = document.getElementById("studentDisplay");
    if (studentDisplay) {
        studentDisplay.innerText = `👋 Welcome, ${userEmail} (${userRole})`;
    }
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

function openCourse() {
    window.location.href = "course.html";
}

/* ================= COURSE PAGE ================= */

const lessons = {
    intro: {
        en: "INTRODUCTION TO PHOTOSYNTHESIS\n\nPhotosynthesis is the fundamental biological process by which green plants, algae, and certain bacteria convert light energy from the sun into chemical energy stored in glucose molecules. This process is absolutely essential for the survival of almost all life forms on Earth.\n\nThe word 'photosynthesis' comes from two Greek words: 'photo' meaning light, and 'synthesis' meaning to combine or put together. So photosynthesis literally means 'putting together with light'.\n\nEvery living organism, whether plant or animal, directly or indirectly depends on photosynthesis for its survival. Without photosynthesis, there would be no oxygen in the atmosphere, and most forms of life as we know them could not exist.\n\nPhotosynthesis occurs mainly in the leaves of plants, specifically in the chloroplasts, which are specialized structures containing the green pigment chlorophyll. This pigment is responsible for absorbing light energy and giving plants their characteristic green color.\n\nThere are two main stages of photosynthesis: the Light Dependent Reactions (which occur in the thylakoid membranes) and the Light Independent Reactions or Calvin Cycle (which occur in the stroma).",
        hi: "प्रकाश संश्लेषण का परिचय\n\nप्रकाश संश्लेषण वह मौलिक जैविक प्रक्रिया है जिसमें हरे पौधे, शैवाल और कुछ जीवाणु सूर्य की प्रकाश ऊर्जा को ग्लूकोज अणुओं में संग्रहीत रासायनिक ऊर्जा में बदलते हैं। यह प्रक्रिया पृथ्वी पर लगभग सभी जीवन रूपों के अस्तित्व के लिए बिल्कुल आवश्यक है।\n\n'प्रकाश संश्लेषण' शब्द दो ग्रीक शब्दों से आता है: 'फोटो' का अर्थ है प्रकाश, और 'संश्लेषण' का अर्थ है संयोजित करना। इसलिए प्रकाश संश्लेषण का शाब्दिक अर्थ है 'प्रकाश के साथ संयोजित करना'।\n\nप्रत्येक जीवित जीव, चाहे वह पौधा हो या जानवर, प्रत्यक्ष या अप्रत्यक्ष रूप से अपने अस्तित्व के लिए प्रकाश संश्लेषण पर निर्भर करता है। प्रकाश संश्लेषण के बिना, वायुमंडल में कोई ऑक्सीजन नहीं होती, और अधिकांश जीवन रूप मौजूद नहीं रह सकते।\n\nप्रकाश संश्लेषण मुख्य रूप से पौधों की पत्तियों में होता है, विशेषकर क्लोरोप्लास्ट में, जो क्लोरोफिल नामक हरी पिगमेंट से युक्त विशेषीकृत संरचनाएं हैं।",
        mr: "प्रकाशसंश्लेषणाचा परिचय\n\nप्रकाशसंश्लेषण ही मूलभूत जैविक प्रक्रिया आहे ज्याद्वारे हिरव्या वनस्पती, शैवाल आणि काही जीवाणू सूर्यप्रकाशाची उर्जा ग्लुकोजच्या रूपात संचयित करतात। ही प्रक्रिया पृथ्वीवरील सर्व जीवनाच्या अस्तित्वासाठी अत्यंत आवश्यक आहे।\n\n'प्रकाशसंश्लेषण' हा शब्द दोन ग्रीक शब्दांपासून आला आहे: 'फोटो' म्हणजे प्रकाश, आणि 'संश्लेषण' म्हणजे एकत्रित करणे। तर प्रकाशसंश्लेषणाचा अर्थ म्हणजे 'प्रकाशाद्वारे एकत्रित करणे'।\n\nप्रत्येक जीवन्त जीव, वनस्पती हो वा प्राणी, थेट किंवा अप्रत्यक्षपणे प्रकाशसंश्लेषणावर अवलंबून आहे। प्रकाशसंश्लेषण शिवाय, वातावरणात ऑक्सिजन असणार नाही, आणि जीवन अस्तित्वात राहू शकणार नाही।\n\nप्रकाशसंश्लेषण मुख्यतः पानांमध्ये होते, विशेषतः क्लोरोप्लास्टमध्ये, जे क्लोरोफिल नामक हिरव्या रंगद्रव्याने भरलेली विशेष संरचना आहे।"
    },
    process: {
        en: "THE PHOTOSYNTHESIS PROCESS\n\nPhotosynthesis can be broken down into two main stages:\n\n1. LIGHT-DEPENDENT REACTIONS (Light Reactions):\nThese reactions occur in the thylakoid membranes of the chloroplast. During this stage:\n- Chlorophyll absorbs photons (particles of light) from the sun\n- This energy excites electrons in the chlorophyll molecules\n- The excited electrons are transferred through an electron transport chain\n- As electrons move through the chain, their energy is used to pump hydrogen ions (H+) across the thylakoid membrane\n- This creates a concentration gradient that drives ATP synthesis\n- Water molecules are split, releasing oxygen as a byproduct and electrons\n- Both ATP and NADPH (electron carriers) are produced\n\n2. LIGHT-INDEPENDENT REACTIONS (Calvin Cycle):\nThese reactions occur in the stroma of the chloroplast. During this stage:\n- Carbon dioxide from the air enters the chloroplast\n- The CO2 is combined with a 5-carbon sugar (RuBP) using the enzyme RuBisCO\n- This creates unstable 6-carbon compounds that immediately split into 3-carbon molecules (3-PG)\n- The 3-PG is reduced using the ATP and NADPH produced in the light reactions\n- Some of these 3-carbon molecules form glucose, while others regenerate RuBP\n- The glucose produced serves as food for the plant and also as a starting material for other organic compounds",
        hi: "फोटोसिंथेसिस की प्रक्रिया\n\nफोटोसिंथेसिस को दो मुख्य चरणों में विभाजित किया जा सकता है:\n\n1. प्रकाश पर निर्भर प्रतिक्रियाएं (प्रकाश प्रतिक्रियाएं):\nये प्रतिक्रियाएं क्लोरोप्लास्ट की थाइलेकॉइड झिल्ली में होती हैं। इस चरण के दौरान:\n- क्लोरोफिल सूर्य से फोटॉन (प्रकाश कणों) को अवशोषित करता है\n- यह ऊर्जा क्लोरोफिल अणुओं में इलेक्ट्रॉनों को उत्तेजित करती है\n- उत्तेजित इलेक्ट्रॉन एक इलेक्ट्रॉन परिवहन श्रृंखला के माध्यम से स्थानांतरित होते हैं\n- जैसे ही इलेक्ट्रॉन श्रृंखला के माध्यम से चलते हैं, उनकी ऊर्जा हाइड्रोजन आयनों को थाइलेकॉइड झिल्ली के पार पंप करने के लिए उपयोग की जाती है\n- यह ATP संश्लेषण को चलाने वाली एक सांद्रता प्रवणता बनाता है\n- जल अणु विभाजित होते हैं, ऑक्सीजन को एक उप-उत्पाद के रूप में और इलेक्ट्रॉन को मुक्त करते हैं\n- ATP और NADPH दोनों (इलेक्ट्रॉन वाहक) का उत्पादन होता है\n\n2. प्रकाश स्वतंत्र प्रतिक्रियाएं (कैल्विन चक्र):\nये प्रतिक्रियाएं क्लोरोप्लास्ट के स्ट्रोमा में होती हैं। इस चरण के दौरान:\n- हवा से कार्बन डाइऑक्साइड क्लोरोप्लास्ट में प्रवेश करती है\n- CO2 को RuBisCO नामक एंजाइम का उपयोग करके 5-कार्बन शर्करा (RuBP) के साथ संयुक्त किया जाता है\n- यह अस्थिर 6-कार्बन यौगिक बनाता है जो तुरंत 3-कार्बन अणुओं (3-PG) में विभाजित होते हैं",
        mr: "प्रकाशसंश्लेषणाची प्रक्रिया\n\nप्रकाशसंश्लेषणाची प्रक्रिया दोन मुख्य टप्प्यांमध्ये विभागली जाते:\n\n1. प्रकाश-अवलंबी प्रतिक्रियाएं (प्रकाश प्रतिक्रियाएं):\nही प्रतिक्रियाएं क्लोरोप्लास्टच्या थाइलेकॉइड झिल्लीमध्ये होतात। या टप्प्यात:\n- क्लोरोफिल सूर्यापासून फोटॉन (प्रकाश कणांची) शोषण करते\n- ही ऊर्जा क्लोरोफिल अणुमधील इलेक्ट्रॉनांना उत्तेजित करते\n- उत्तेजित इलेक्ट्रॉन इलेक्ट्रॉन परिवहन साखळीतून स्थानांतरित होतात\n- इलेक्ट्रॉन साखळीतून चलत असताना, त्यांची ऊर्जा हायड्रोजन आयन पंप करण्यासाठी वापरली जाते\n- हे ATP संश्लेषण चालविणारी सांद्रता प्रवणता तयार करते\n- पाण्याचे अणु विभाजित होतात, ऑक्सिजन सोडतात\n- ATP आणि NADPH दोन्हीचा उत्पादन होतो\n\n2. प्रकाश स्वतंत्र प्रतिक्रियाएं (कॅल्व्हिन चक्र):\nही प्रतिक्रियाएं क्लोरोप्लास्टच्या स्ट्रोमामध्ये होतात। या टप्प्यात:\n- हवेतून कार्बन डायऑक्साइड क्लोरोप्लास्टमध्ये प्रवेश करते\n- CO2 हे RuBisCO नावाच्या एन्झाइमद्वारे 5-कार्बन साखर (RuBP) सह एकत्रित केले जाते\n- हे अस्थिर 6-कार्बन यौगिक तयार करते जे तात्क्षणिक 3-कार्बन अणुंमध्ये विभाजित होते"
    },
    importance: {
        en: "IMPORTANCE OF PHOTOSYNTHESIS\n\nPhotosynthesis is one of the most important biological processes on Earth. Here's why it matters:\n\n1. OXYGEN PRODUCTION:\nPhotosynthesis is the primary source of atmospheric oxygen. Nearly all the oxygen we breathe today was produced by photosynthetic organisms. Without photosynthesis, oxygen levels would gradually decrease, making aerobic respiration impossible for most organisms.\n\n2. FOOD PRODUCTION:\nPhotosynthesis forms the base of nearly all food chains and food webs. Plants are primary producers that convert light energy into chemical energy stored in glucose. All animals, whether herbivores or carnivores, ultimately depend on this energy for survival.\n\n3. CARBON CYCLE REGULATION:\nPhotosynthesis plays a crucial role in removing carbon dioxide from the atmosphere. Plants absorb CO2 and incorporate the carbon into organic molecules. This helps regulate atmospheric CO2 levels and prevents excessive greenhouse gases.\n\n4. ENERGY SOURCE:\nThe glucose produced during photosynthesis serves as:\n- An energy source for the plant itself (through cellular respiration)\n- Building blocks for creating cellulose, starch, and other complex molecules\n- Food for herbivores and, indirectly, carnivores\n\n5. GLOBAL CLIMATE REGULATION:\nPhotosynthetic organisms help maintain Earth's temperature by absorbing CO2 and producing O2, thereby regulating the greenhouse effect.\n\n6. SOIL ENRICHMENT:\nPlants produced through photosynthesis eventually decompose, enriching the soil with organic matter and nutrients.\n\n7. MEDICINAL AND INDUSTRIAL PRODUCTS:\nMany medicines, dyes, oils, and other valuable products are derived from plants that depend on photosynthesis.",
        hi: "प्रकाश संश्लेषण का महत्व\n\nप्रकाश संश्लेषण पृथ्वी पर सबसे महत्वपूर्ण जैविक प्रक्रियाओं में से एक है। यह क्यों महत्वपूर्ण है:\n\n1. ऑक्सीजन उत्पादन:\nप्रकाश संश्लेषण वायुमंडलीय ऑक्सीजन का प्राथमिक स्रोत है। आज हम जो ऑक्सीजन सांस लेते हैं, उसका लगभग सभी प्रकाश संश्लेषक जीवों द्वारा निर्मित है।\n\n2. भोजन उत्पादन:\nप्रकाश संश्लेषण लगभग सभी खाद्य श्रृंखलाओं का आधार है। पौधे प्राथमिक उत्पादक हैं जो प्रकाश ऊर्जा को ग्लूकोज में संग्रहीत रासायनिक ऊर्जा में परिवर्तित करते हैं।\n\n3. कार्बन चक्र विनियमन:\nप्रकाश संश्लेषण वायुमंडल से कार्बन डाइऑक्साइड को हटाने में महत्वपूर्ण भूमिका निभाता है।\n\n4. ऊर्जा स्रोत:\nप्रकाश संश्लेषण के दौरान निर्मित ग्लूकोज निम्नलिखित के रूप में कार्य करता है:\n- पौधे के लिए स्वयं एक ऊर्जा स्रोत\n- सेलुलोज, स्टार्च और अन्य जटिल अणुओं को बनाने के लिए निर्माण खंड\n- शाकाहारी और अप्रत्यक्ष रूप से मांसाहारियों के लिए भोजन",
        mr: "प्रकाशसंश्लेषणाचे महत्व\n\nप्रकाशसंश्लेषण पृथ्वीवरील सर्वात महत्वाचा जैविक प्रक्रिया आहे। त्याचे महत्व:\n\n1. ऑक्सिजन उत्पादन:\nप्रकाशसंश्लेषण हे वायुमंडलातील ऑक्सिजनचे मुख्य स्रोत आहे। आज आपण ज्या ऑक्सिजनचा श्वास घेतो, तो प्रकाशसंश्लेषक जीवांद्वारा निर्मित झाला आहे।\n\n2. खाद्य उत्पादन:\nप्रकाशसंश्लेषण लगभक सर्व खाद्य साखळीचा आधार आहे। वनस्पती हे प्राथमिक उत्पादक आहेत जे प्रकाशऊर्जा ग्लुकोजमध्ये रूपांतरित करतात।\n\n3. कार्बन चक्र नियंत्रण:\nप्रकाशसंश्लेषण वायुमंडलातून कार्बन डायऑक्साइड काढून टाकण्यात महत्वपूर्ण भूमिका बजावते।\n\n4. ऊर्जा स्रोत:\nप्रकाशसंश्लेषणात तयार झालेला ग्लुकोज खालील गोष्टींसाठी कार्य करतो:\n- वनस्पतीसाठी स्वयंचा ऊर्जा स्रोत\n- सेलुलोज, स्टार्च आणि इतर जटिल अणु तयार करणे\n- शाकाहारी आणि अप्रत्यक्षपणे मांसाहारींसाठी भोजन"
    },
    quiz: {
        en: "COMPREHENSION CHECK - QUIZ\n\nTest your understanding of photosynthesis:\n\n1. What are the two main ingredients required for photosynthesis?\n   Answer: Carbon dioxide (CO2) from the air and water (H2O) from the soil\n\n2. Which pigment in plants absorbs light energy?\n   Answer: Chlorophyll (the green pigment in chloroplasts)\n\n3. Name the two main stages of photosynthesis.\n   Answer: Light-Dependent Reactions (Light Reactions) and Light-Independent Reactions (Calvin Cycle)\n\n4. Where do the Light-Dependent Reactions occur in the chloroplast?\n   Answer: In the thylakoid membranes\n\n5. Where do the Light-Independent Reactions (Calvin Cycle) occur?\n   Answer: In the stroma of the chloroplast\n\n6. What are the three main products of photosynthesis?\n   Answer: Glucose (C6H12O6), Oxygen (O2), and water (H2O)\n\n7. Why is photosynthesis important for life on Earth?\n   Answer: It produces oxygen for respiration, creates glucose for energy and food, and removes CO2 from the atmosphere\n\n8. What is the role of chlorophyll?\n   Answer: To absorb light energy from the sun and transfer it to electrons\n\n9. Name two electron carriers used in photosynthesis.\n   Answer: ATP (adenosine triphosphate) and NADPH\n\n10. Why do plants appear green?\n    Answer: Because chlorophyll reflects green light and absorbs other colors (red and blue)",
        hi: "समझ की जांच - क्विज\n\nप्रकाश संश्लेषण की अपनी समझ का परीक्षण करें:\n\n1. प्रकाश संश्लेषण के लिए दो मुख्य आवश्यक घटक क्या हैं?\n   उत्तर: कार्बन डाइऑक्साइड (CO2) हवा से और पानी (H2O) मिट्टी से\n\n2. पौधों में कौन सी पिगमेंट प्रकाश ऊर्जा को अवशोषित करती है?\n   उत्तर: क्लोरोफिल (क्लोरोप्लास्ट में हरी पिगमेंट)\n\n3. प्रकाश संश्लेषण के दो मुख्य चरणों का नाम बताएं।\n   उत्तर: प्रकाश पर निर्भर प्रतिक्रियाएं और प्रकाश स्वतंत्र प्रतिक्रियाएं (कैल्विन चक्र)\n\n4. प्रकाश पर निर्भर प्रतिक्रियाएं क्लोरोप्लास्ट में कहां होती हैं?\n   उत्तर: थाइलेकॉइड झिल्ली में\n\n5. प्रकाश स्वतंत्र प्रतिक्रियाएं कहां होती हैं?\n   उत्तर: क्लोरोप्लास्ट के स्ट्रोमा में\n\n6. प्रकाश संश्लेषण के तीन मुख्य उत्पाद क्या हैं?\n   उत्तर: ग्लूकोज, ऑक्सीजन और पानी\n\n7. पृथ्वी पर जीवन के लिए प्रकाश संश्लेषण क्यों महत्वपूर्ण है?\n   उत्तर: यह श्वसन के लिए ऑक्सीजन का उत्पादन करता है, ऊर्जा के लिए ग्लूकोज बनाता है\n\n8. क्लोरोफिल की भूमिका क्या है?\n   उत्तर: सूर्य से प्रकाश ऊर्जा को अवशोषित करना\n\n9. प्रकाश संश्लेषण में उपयोग होने वाले दो इलेक्ट्रॉन वाहकों का नाम बताएं।\n   उत्तर: ATP और NADPH\n\n10. पौधे हरे क्यों दिखाई देते हैं?\n    उत्तर: क्योंकि क्लोरोफिल हरे प्रकाश को प्रतिबिंबित करता है और अन्य रंगों को अवशोषित करता है",
        mr: "समज तपासणी - क्विज\n\nप्रकाशसंश्लेषणाची तुमची समज तपासा:\n\n1. प्रकाशसंश्लेषणासाठी दोन मुख्य घटक कोणते?\n   उत्तर: कार्बन डायऑक्साइड (CO2) हवेतून आणि पाणी (H2O) मातीतून\n\n2. वनस्पतींमधील कोणती रंगद्रव्य प्रकाश उर्जा शोषण करते?\n   उत्तर: क्लोरोफिल (क्लोरोप्लास्टमधील हिरवी रंगद्रव्य)\n\n3. प्रकाशसंश्लेषणाचे दोन मुख्य टप्पे नाव द्या।\n   उत्तर: प्रकाश-अवलंबी प्रतिक्रियाएं आणि प्रकाश स्वतंत्र प्रतिक्रियाएं (कॅल्व्हिन चक्र)\n\n4. प्रकाश-अवलंबी प्रतिक्रियाएं क्लोरोप्लास्टमध्ये कोथे होतात?\n   उत्तर: थाइलेकॉइड झिल्लीमध्ये\n\n5. प्रकाश स्वतंत्र प्रतिक्रियाएं कोथे होतात?\n   उत्तर: क्लोरोप्लास्टच्या स्ट्रोमामध्ये\n\n6. प्रकाशसंश्लेषणाचे तीन मुख्य उत्पाद कोणते?\n   उत्तर: ग्लुकोज, ऑक्सिजन आणि पाणी\n\n7. पृथ्वीवरील जीवनासाठी प्रकाशसंश्लेषण का महत्वाचा आहे?\n   उत्तर: हे श्वसनासाठी ऑक्सिजन तयार करते, ऊर्जा आणि अन्नासाठी ग्लुकोज बनवते\n\n8. क्लोरोफिलची भूमिका काय आहे?\n   उत्तर: सूर्यापासून प्रकाश उर्जा शोषण करणे\n\n9. प्रकाशसंश्लेषणमध्ये वापरल्या जाणार्‍या दोन इलेक्ट्रॉन वाहकांचे नाव द्या।\n   उत्तर: ATP आणि NADPH\n\n10. वनस्पती हिरव्या रंगाचे का दिसतात?\n    उत्तर: कारण क्लोरोफिल हिरवा प्रकाश परावर्तित करते आणि इतर रंग शोषण करते"
    }
};

let currentLesson = "intro";
let isAudioPlaying = false;
let selectedVoice = null;
let availableVoices = [];

function loadCourse() {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("loggedIn");
    const userEmail = localStorage.getItem("userEmail");

    if (loggedIn !== "true" || !userEmail) {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }

    // Load available voices
    populateVoices();
    updateLesson();
}

function populateVoices() {
    availableVoices = window.speechSynthesis.getVoices();
    const voiceSelect = document.getElementById("voiceSelect");
    
    if (!voiceSelect) return;
    
    // Clear existing options except the first one
    while (voiceSelect.options.length > 1) {
        voiceSelect.remove(1);
    }
    
    // Add available voices
    availableVoices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

function updateVoice() {
    const voiceSelect = document.getElementById("voiceSelect");
    if (voiceSelect.value) {
        selectedVoice = availableVoices[voiceSelect.value];
    } else {
        selectedVoice = null;
    }
}

// Load voices when they change
window.speechSynthesis.onvoiceschanged = function() {
    populateVoices();
};

function changeLesson(topic) {
    currentLesson = topic;
    updateLesson();
}

function updateLesson() {
    let langSelect = document.getElementById("languageSelect");
    if (!langSelect) return;

    let lang = langSelect.value;
    let textArea = document.getElementById("lessonText");

    if (lessons[currentLesson] && lessons[currentLesson][lang]) {
        textArea.innerText = lessons[currentLesson][lang];
    } else {
        textArea.innerText = "Content not available.";
    }
}

function changeLanguage() {
    updateLesson();
}

function playAudio() {
    let audioBtn = document.querySelector("button[onclick='playAudio()']");
    
    // If audio is already playing, stop it
    if (isAudioPlaying) {
        window.speechSynthesis.cancel();
        isAudioPlaying = false;
        if (audioBtn) audioBtn.textContent = "🎤 Listen";
        return;
    }

    let lang = document.getElementById("languageSelect").value;
    let text = lessons[currentLesson][lang];

    if (!text) return;

    window.speechSynthesis.cancel();

    let speech = new SpeechSynthesisUtterance(text);

    if (lang === "hi") speech.lang = "hi-IN";
    if (lang === "mr") speech.lang = "mr-IN";
    if (lang === "en") speech.lang = "en-US";

    // Update button text and flag when audio starts
    isAudioPlaying = true;
    if (audioBtn) audioBtn.textContent = "⏹️ Stop Audio";

    // Reset flag when audio ends
    speech.onend = function() {
        isAudioPlaying = false;
        if (audioBtn) audioBtn.textContent = "🎤 Listen";
    };

    window.speechSynthesis.speak(speech);
}

/* ================= TRANSLATION ================= */

async function translateText(text, targetLang = "hi") {
    // targetLang = "hi" for Hindi, "en" for English, etc.
    const encodedText = encodeURIComponent(text);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodedText}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        // data[0][0][0] contains translated text
        return data[0].map(item => item[0]).join('');
    } catch (err) {
        console.error("Translation error:", err);
        return null;
    }
}

async function translateCurrentLesson() {
    const targetLang = document.getElementById("translationLanguage").value;
    const translatedDiv = document.getElementById("translatedText");
    
    if (!targetLang) {
        translatedDiv.innerHTML = "<p style='color: red;'>Please select a language first!</p>";
        return;
    }
    
    translatedDiv.innerHTML = "<p style='color: #6b7280;'>Translating...</p>";
    
    // Get the current lesson text in English
    let sourceText = lessons[currentLesson]["en"];
    
    if (!sourceText) {
        translatedDiv.innerHTML = "<p style='color: red;'>No content to translate!</p>";
        return;
    }
    
    // Translate the text
    const translated = await translateText(sourceText, targetLang);
    
    if (translated) {
        const audioButtonId = "translatedAudioBtn";
        translatedDiv.innerHTML = `<div style='background: #f0f9ff; padding: 16px; border-radius: 8px; margin-top: 12px; border-left: 4px solid #2563eb;'>
            <button id="${audioButtonId}" onclick="playTranslatedAudio('${targetLang}', this)" style='background: #2563eb; color: white; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; margin-bottom: 12px; font-weight: 600;'>🎤 Listen</button>
            <p style='white-space: pre-wrap; word-wrap: break-word;' id="translatedContent">${translated}</p>
        </div>`;
        
        // Store the translated text and language for audio playback
        window.currentTranslatedText = translated;
        window.currentTranslatedLang = targetLang;
        window.isTranslatedAudioPlaying = false;
    } else {
        translatedDiv.innerHTML = "<p style='color: red;'>Translation failed. Please try again.</p>";
    }
}

function playTranslatedAudio(lang, button) {
    // If audio is already playing, stop it
    if (window.isTranslatedAudioPlaying) {
        window.speechSynthesis.cancel();
        window.isTranslatedAudioPlaying = false;
        button.textContent = "🎤 Listen";
        return;
    }

    let text = window.currentTranslatedText;

    if (!text) return;

    window.speechSynthesis.cancel();

    let speech = new SpeechSynthesisUtterance(text);

    // Map language codes to speech synthesis language codes
    const langMap = {
        "hi": "hi-IN",
        "ta": "ta-IN",
        "te": "te-IN",
        "kn": "kn-IN",
        "ml": "ml-IN",
        "mr": "mr-IN",
        "gu": "gu-IN",
        "bn": "bn-IN",
        "pa": "pa-IN",
        "or": "or-IN",
        "en": "en-US"
    };

    speech.lang = langMap[lang] || "en-US";

    // Update button text and flag when audio starts
    window.isTranslatedAudioPlaying = true;
    button.textContent = "⏹️ Stop Audio";

    // Reset flag when audio ends
    speech.onend = function() {
        window.isTranslatedAudioPlaying = false;
        button.textContent = "🎤 Listen";
    };

    window.speechSynthesis.speak(speech);
}

function saveAnswer() {
    let answer = document.getElementById("studentAnswer")?.value;
    if (answer && answer.trim() !== "") {
        alert("✅ Answer saved successfully!");
        document.getElementById("studentAnswer").value = "";
    } else {
        alert("❌ Please write an answer first!");
    }
}