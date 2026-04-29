document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Burn Rate Ticker
    let burnAmount = 0;
    const burnSpan = document.getElementById('burn-amount');
    const currencyFormatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    });

    if(burnSpan) {
        setInterval(() => {
            burnAmount += Math.floor(Math.random() * 20) + 10; 
            burnSpan.textContent = currencyFormatter.format(burnAmount);
        }, 1000);
    }

    // 2. Interactive Chat Demo Logic (Modified for Rich Calendar UI - IDEA 1)
    const presetBtns = document.querySelectorAll('#chat-presets .preset-btn');
    const chatBody = document.getElementById('chat-body');
    const typingIndicator = document.getElementById('typing-indicator');
    const statusText = document.getElementById('status-text');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    function appendUserMessage(text) {
        const userDiv = document.createElement('div');
        userDiv.className = 'chat-msg user-msg slide-in';
        userDiv.textContent = text;
        chatBody.insertBefore(userDiv, typingIndicator);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function simulateBotResponse(userMsgText) {
        typingIndicator.style.display = 'flex';
        statusText.textContent = "- typing...";
        chatBody.scrollTop = chatBody.scrollHeight;

        if(document.getElementById('chat-presets')) {
            document.getElementById('chat-presets').style.display = 'none';
        }

        setTimeout(() => {
            typingIndicator.style.display = 'none';
            statusText.textContent = "";

            const botDiv = document.createElement('div');
            botDiv.className = 'slide-in';
            botDiv.style.alignSelf = 'flex-start';
            
            // Rich UI Logic for Idea 1
            if (userMsgText.includes("book a demo")) {
                botDiv.innerHTML = `
                    <div class="chat-msg bot-msg mb-2">Select a date for your demo:</div>
                    <div class="calendar-ui slide-in">
                        <div class="text-center font-bold text-white mb-2" style="font-size: 14px;">May 2026</div>
                        <div class="cal-grid">
                            <div class="cal-btn">14th</div>
                            <div class="cal-btn">15th</div>
                            <div class="cal-btn">16th</div>
                            <div class="cal-btn">17th</div>
                            <div class="cal-btn" style="border-color: var(--mongo-green); color: var(--mongo-green);">18th</div>
                            <div class="cal-btn">19th</div>
                        </div>
                    </div>
                `;
                chatBody.insertBefore(botDiv, typingIndicator);
                
                // Add listener to fake calendar buttons
                setTimeout(() => {
                    const calBtns = botDiv.querySelectorAll('.cal-btn');
                    calBtns.forEach(b => {
                        b.addEventListener('click', function() {
                            const dateDiv = document.createElement('div');
                            dateDiv.className = 'chat-msg user-msg slide-in mt-2';
                            dateDiv.textContent = "I selected the " + this.textContent;
                            chatBody.insertBefore(dateDiv, typingIndicator);
                            
                            // Bot confirms
                            typingIndicator.style.display = 'flex';
                            setTimeout(() => {
                                typingIndicator.style.display = 'none';
                                const confDiv = document.createElement('div');
                                confDiv.className = 'chat-msg bot-msg slide-in';
                                confDiv.innerHTML = `<span style="color:var(--mongo-green)">✓ Meeting Confirmed!</span> The calendar invite has been sent.`;
                                chatBody.insertBefore(confDiv, typingIndicator);
                                chatBody.scrollTop = chatBody.scrollHeight;
                            }, 1000);
                        });
                    });
                }, 100);

            } else {
                botDiv.className = 'chat-msg bot-msg slide-in';
                if(userMsgText.includes("cost")) {
                    botDiv.textContent = "Our pricing starts at ₹0/mo for the Starter plan! You can scale up to ₹4,999/mo for full WhatsApp integration. Would you like a 7-day free trial?";
                } else if(userMsgText.includes("WhatsApp")) {
                    botDiv.textContent = "Yes! We are an official Meta Technology Partner. You can connect WhatsApp, Instagram DMs, and Facebook Messenger instantly.";
                } else {
                    botDiv.textContent = "That's a great question! Revbot can learn from your PDFs or website to answer exactly that for your customers. Want to try it out?";
                }
                chatBody.insertBefore(botDiv, typingIndicator);
            }
            
            chatBody.scrollTop = chatBody.scrollHeight;

            if(!userMsgText.includes("book a demo")) {
                setTimeout(() => {
                    if(document.getElementById('chat-presets')) {
                        document.getElementById('chat-presets').style.display = 'flex';
                        chatBody.scrollTop = chatBody.scrollHeight;
                    }
                }, 2500);
            }

        }, 1200);
    }

    presetBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const userMsgText = this.getAttribute('data-msg');
            appendUserMessage(userMsgText);
            simulateBotResponse(userMsgText);
        });
    });

    function handleSend() {
        if(!chatInput) return;
        const text = chatInput.value.trim();
        if(text === '') return;
        
        chatInput.value = '';
        appendUserMessage(text);
        simulateBotResponse(text);
    }

    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', function(e) {
            if(e.key === 'Enter') handleSend();
        });
    }

    // 3. Translation Demo
    const flagBtns = document.querySelectorAll('.flag-btn');
    const transBotReply = document.getElementById('trans-bot-reply');
    
    const translations = {
        'en': 'Yes! We offer free shipping on all orders over ₹999. It usually takes 2-3 business days.',
        'es': '¡Sí! Ofrecemos envío gratuito en todos los pedidos superiores a ₹999. Por lo general, tarda de 2 a 3 días hábiles.',
        'hi': 'हाँ! हम ₹999 से अधिक के सभी ऑर्डर पर मुफ्त शिपिंग प्रदान करते हैं। इसमें आमतौर पर 2-3 कार्य दिवस लगते हैं।',
        'ar': 'نعم! نحن نقدم شحن مجاني على جميع الطلبات التي تزيد عن ₹999. وعادة ما يستغرق 2-3 أيام عمل.'
    };

    flagBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            flagBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const lang = this.getAttribute('data-lang');
            transBotReply.style.opacity = '0.5';
            
            setTimeout(() => {
                transBotReply.textContent = translations[lang];
                transBotReply.style.opacity = '1';
            }, 300);
        });
    });

    // 4. Interactive Drag-Slider ROI Calculator
    const sliderVisitors = document.getElementById('visitors');
    function updateCalc() {
        if(!sliderVisitors) return;
        const visitors = parseFloat(document.getElementById('visitors').value);
        const convRate = parseFloat(document.getElementById('conv-rate').value);
        const aov = parseFloat(document.getElementById('aov').value);
        const tickets = parseFloat(document.getElementById('tickets').value);

        document.getElementById('val-visitors').textContent = visitors.toLocaleString();
        document.getElementById('val-conv-rate').textContent = convRate + '%';
        document.getElementById('val-aov').textContent = currencyFormatter.format(aov);
        document.getElementById('val-tickets').textContent = tickets.toLocaleString();

        const currentOrders = visitors * (convRate / 100);
        const newOrders = visitors * ((convRate * 1.2) / 100);
        const extraOrders = newOrders - currentOrders;
        const additionalRevenue = extraOrders * aov;
        const supportSavings = (tickets * 0.5) * 100;

        document.getElementById('result-revenue').textContent = currencyFormatter.format(additionalRevenue);
        document.getElementById('result-savings').textContent = currencyFormatter.format(supportSavings);
        document.getElementById('result-total').textContent = currencyFormatter.format(additionalRevenue + supportSavings);
    }
    if(sliderVisitors) {
        ['visitors', 'conv-rate', 'aov', 'tickets'].forEach(id => {
            document.getElementById(id).addEventListener('input', updateCalc);
        });
        updateCalc();
    }

    // IDEA 2: Instant Onboarding Visualizer
    const trainBtn = document.getElementById('train-ai-btn');
    const urlInput = document.getElementById('fake-url-input');
    
    if(trainBtn && urlInput) {
        trainBtn.addEventListener('click', function() {
            let targetUrl = urlInput.value.trim();
            if(!targetUrl) {
                targetUrl = "yourcompany.com";
            } else {
                // Strip http/https for cleaner display
                targetUrl = targetUrl.replace(/^https?:\/\//, '');
            }

            this.disabled = true;
            document.getElementById('scanning-state').style.display = 'block';
            document.getElementById('success-state').style.display = 'none';
            
            let dots = 0;
            const scanText = document.getElementById('scan-text');
            const scanInterval = setInterval(() => {
                dots = (dots + 1) % 4;
                scanText.innerHTML = `Scraping <span class="text-white">${targetUrl}</span>` + ".".repeat(dots);
            }, 500);

            setTimeout(() => {
                clearInterval(scanInterval);
                document.getElementById('scanning-state').style.display = 'none';
                document.getElementById('success-state').style.display = 'block';
                this.textContent = "Agent Live!";
                this.style.background = "var(--mongo-green)";
                this.style.color = "var(--forest-black)";
            }, 3000);
        });
    }

    // IDEA 3: Strict vs Creative Toggle
    const toggle = document.getElementById('ai-toggle');
    if(toggle) {
        toggle.addEventListener('change', function() {
            if(this.checked) {
                document.getElementById('label-strict').classList.replace('text-green', 'text-gray');
                document.getElementById('label-strict').classList.remove('font-bold');
                document.getElementById('label-creative').classList.replace('text-gray', 'text-green');
                document.getElementById('label-creative').classList.add('font-bold');
                document.getElementById('ui-strict').style.display = 'none';
                document.getElementById('ui-creative').style.display = 'block';
            } else {
                document.getElementById('label-creative').classList.replace('text-green', 'text-gray');
                document.getElementById('label-creative').classList.remove('font-bold');
                document.getElementById('label-strict').classList.replace('text-gray', 'text-green');
                document.getElementById('label-strict').classList.add('font-bold');
                document.getElementById('ui-creative').style.display = 'none';
                document.getElementById('ui-strict').style.display = 'block';
            }
        });
    }

    // IDEA 3: Interactive Demo Logic
    const demo3ChatBody = document.getElementById('demo3-chat-body');
    const demo3Btns = document.querySelectorAll('.demo3-btn');
    const demo3Input = document.getElementById('demo3-input');
    const demo3SendBtn = document.getElementById('demo3-send-btn');
    const demo3StrictOptions = document.getElementById('demo3-strict-options');

    function addDemo3Message(text, isBot = false) {
        if(!demo3ChatBody) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = isBot ? 'chat-msg bot-msg slide-in mt-2' : 'chat-msg user-msg slide-in mt-2';
        if(isBot) {
            msgDiv.style.alignSelf = 'center';
            msgDiv.style.textAlign = 'center';
        }
        msgDiv.textContent = text;
        demo3ChatBody.appendChild(msgDiv);
        demo3ChatBody.scrollTop = demo3ChatBody.scrollHeight;
    }

    function simulateDemo3Bot(userText) {
        // Show typing
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-msg bot-msg slide-in mt-2';
        typingDiv.style.alignSelf = 'center';
        typingDiv.style.textAlign = 'center';
        typingDiv.textContent = 'typing...';
        typingDiv.style.opacity = '0.5';
        demo3ChatBody.appendChild(typingDiv);
        demo3ChatBody.scrollTop = demo3ChatBody.scrollHeight;

        setTimeout(() => {
            typingDiv.remove();
            let botReply = "Got it! I've added that to your cart. Ready to checkout?";
            
            // If it's a creative open-ended question
            if(userText.length > 10) {
                botReply = "Absolutely! We have oversized fits in XL for our 'Urban Comfort' collection. Shall I send you the link?";
            }
            
            addDemo3Message(botReply, true);
        }, 1000);
    }

    // Strict Buttons Logic
    demo3Btns.forEach(btn => {
        btn.addEventListener('click', function() {
            if(this.classList.contains('disabled')) return;
            
            // Disable all buttons to prevent spam
            demo3Btns.forEach(b => b.classList.add('disabled'));
            demo3StrictOptions.style.opacity = '0.5';

            const choice = this.textContent;
            addDemo3Message(choice, false);
            simulateDemo3Bot(choice);
        });
    });

    // Creative Input Logic
    function handleDemo3Send() {
        if(!demo3Input) return;
        const text = demo3Input.value.trim();
        if(text === '') return;

        demo3Input.value = '';
        addDemo3Message(text, false);
        simulateDemo3Bot(text);
    }

    if(demo3SendBtn && demo3Input) {
        demo3SendBtn.addEventListener('click', handleDemo3Send);
        demo3Input.addEventListener('keypress', function(e) {
            if(e.key === 'Enter') handleDemo3Send();
        });
    }

    // IDEA 4: Live Lead Score Gamification
    const startScoringBtn = document.getElementById('start-scoring-btn');
    if(startScoringBtn) {
        startScoringBtn.addEventListener('click', function() {
            this.disabled = true;
            this.textContent = "Simulating...";
            
            // Reset
            document.getElementById('sim-user-1').style.display = 'none';
            document.getElementById('sim-bot-1').style.display = 'none';
            document.getElementById('sim-user-2').style.display = 'none';
            document.getElementById('routing-alert').style.display = 'none';
            
            const circle = document.getElementById('score-circle');
            const scoreNum = document.getElementById('score-number');
            circle.style.strokeDashoffset = "283";
            scoreNum.textContent = "0";

            let offset = 283;
            
            setTimeout(() => {
                document.getElementById('sim-user-1').style.display = 'block';
                // Score up to 40
                offset = 283 - (283 * 0.4);
                circle.style.strokeDashoffset = offset;
                animateNumber(scoreNum, 0, 40, 1000);
            }, 1000);

            setTimeout(() => {
                document.getElementById('sim-bot-1').style.display = 'block';
            }, 2500);

            setTimeout(() => {
                document.getElementById('sim-user-2').style.display = 'block';
                // Score up to 100
                offset = 0; // 100%
                circle.style.strokeDashoffset = offset;
                circle.style.stroke = "#00ed64"; // bright green
                animateNumber(scoreNum, 40, 100, 1000);
            }, 4000);

            setTimeout(() => {
                document.getElementById('routing-alert').style.display = 'block';
                this.textContent = "Restart Simulation ▶";
                this.disabled = false;
            }, 5500);
        });
    }

    function animateNumber(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // IDEA 4: WhatsApp Simulator
    const waChat = document.getElementById('wa-chat');
    if(waChat) {
        const waTyping = waChat.querySelector('.wa-typing');
        const badges = document.querySelectorAll('.floating-badge');
        
        let observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger badges
                    badges.forEach(b => {
                        b.style.opacity = '1';
                        b.style.transform = 'translateY(0)';
                    });
                    
                    // Trigger WA Chat
                    setTimeout(() => {
                        waTyping.style.display = 'block';
                    }, 1000);
                    
                    setTimeout(() => {
                        waTyping.style.display = 'none';
                        const botMsg = document.createElement('div');
                        botMsg.className = 'wa-msg bot-msg slide-in';
                        botMsg.textContent = 'Yes! We have 2 pairs left in stock. Should I send you the secure payment link?';
                        waChat.appendChild(botMsg);
                    }, 2500);

                    setTimeout(() => {
                        const userMsg = document.createElement('div');
                        userMsg.className = 'wa-msg user-msg slide-in';
                        userMsg.textContent = 'Yes please!';
                        waChat.appendChild(userMsg);
                    }, 4000);

                    setTimeout(() => {
                        waTyping.style.display = 'block';
                    }, 4500);

                    setTimeout(() => {
                        waTyping.style.display = 'none';
                        const botMsg = document.createElement('div');
                        botMsg.className = 'wa-msg bot-msg slide-in';
                        botMsg.innerHTML = '<span style="color:#00ed64;font-weight:bold;">₹4,999</span><br>Click here to pay securely via Stripe: <a href="#" style="color:#00a8ff">stripe.com/pay...</a>';
                        waChat.appendChild(botMsg);
                    }, 6000);

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(document.querySelector('.whatsapp-showcase'));
    }

    // IDEA 4: Timeline Scroll Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineProgress = document.getElementById('timeline-progress');
    
    if(timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Calculate progress based on which items are active
                    const activeItems = document.querySelectorAll('.timeline-item.active');
                    const progressPercentage = (activeItems.length / timelineItems.length) * 100;
                    timelineProgress.style.height = `${progressPercentage}%`;
                }
            });
        }, { threshold: 0.8, rootMargin: "-100px 0px" });

        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }

});
