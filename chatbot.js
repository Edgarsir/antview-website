// Chatbot functionality
class AntviewChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.attachEventListeners();
        this.addWelcomeMessage();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <div id="chatbot-container">
                <div id="chatbot-button">
                    <span class="material-icons">chat</span>
                </div>
                <div id="chatbot-window" style="display:none;">
                    <div id="chatbot-header">
                        <div>
                            <h3>Antview Assistant</h3>
                            <p>Ask us anything</p>
                        </div>
                        <div class="header-actions">
                            <button id="chatbot-refresh" title="Refresh chat">
                                <span class="material-icons">refresh</span>
                            </button>
                            <button id="chatbot-close" title="Close chat">
                                <span class="material-icons">close</span>
                            </button>
                        </div>
                    </div>
                    <div id="chatbot-messages"></div>
                    <div id="chatbot-quick-questions">
                        <button class="quick-question" data-question="What features do you offer?">What features do you offer?</button>
                        <button class="quick-question" data-question="What are your pricing plans?">What are your pricing plans?</button>
                        <button class="quick-question" data-question="How do I get started?">How do I get started?</button>
                    </div>
                    <div id="chatbot-input-container">
                        <input type="text" id="chatbot-input" placeholder="Type your question...">
                        <button id="chatbot-send">
                            <span class="material-icons">send</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
        document.getElementById('chatbot-button').addEventListener('click', () => this.toggleChat());
        document.getElementById('chatbot-close').addEventListener('click', () => this.toggleChat());
        document.getElementById('chatbot-refresh').addEventListener('click', () => this.refreshChat());
        document.getElementById('chatbot-send').addEventListener('click', () => this.sendMessage());
        document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        document.querySelectorAll('.quick-question').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const question = e.target.dataset.question;
                this.handleQuickQuestion(question);
            });
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('chatbot-window');
        const chatButton = document.getElementById('chatbot-button');
        
        if (this.isOpen) {
            chatWindow.style.display = 'flex';
            chatButton.style.display = 'none';
        } else {
            chatWindow.style.display = 'none';
            chatButton.style.display = 'flex';
        }
    }

    addWelcomeMessage() {
        this.addBotMessage("Hello! 👋 I'm the Antview Assistant. How can I help you today?");
    }

    refreshChat() {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.innerHTML = '';
        this.messages = [];
        this.addWelcomeMessage();
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (message) {
            this.addUserMessage(message);
            input.value = '';
            
            setTimeout(() => {
                this.processMessage(message);
            }, 500);
        }
    }

    handleQuickQuestion(question) {
        this.addUserMessage(question);
        setTimeout(() => {
            this.processMessage(question);
        }, 500);
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageHTML = `
            <div class="chat-message user-message">
                <div class="message-content">${message}</div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
    }

    addBotMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageHTML = `
            <div class="chat-message bot-message">
                <div class="message-avatar">
                    <span class="material-icons">support_agent</span>
                </div>
                <div class="message-content">${message}</div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
    }

    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = '';

        if (lowerMessage.includes('feature') || lowerMessage.includes('what do you offer')) {
            response = `We offer comprehensive features including:<br><br>
                • Lead Management<br>
                • Student Management<br>
                • Fee Tracking<br>
                • Batch Allocation<br>
                • WhatsApp Integration<br>
                • Analytics Dashboard<br><br>
                <a href="features.html" style="color:#1a73e8;">View all features →</a>`;
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('plan')) {
            response = `We have 3 pricing plans:<br><br>
                <strong>Starter:</strong> ₹2,999/month (up to 100 students)<br>
                <strong>Professional:</strong> ₹5,999/month (up to 500 students)<br>
                <strong>Enterprise:</strong> Custom pricing (unlimited)<br><br>
                <a href="pricing.html" style="color:#1a73e8;">View detailed pricing →</a>`;
        } else if (lowerMessage.includes('demo') || lowerMessage.includes('trial') || lowerMessage.includes('get started')) {
            response = `Great! You can get started in two ways:<br><br>
                1. <a href="demo.html" style="color:#1a73e8;">Request a demo</a> - Schedule a personalized walkthrough<br>
                2. Start a 14-day free trial (no credit card required)<br><br>
                Would you like me to help you schedule a demo?`;
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('help')) {
            response = `You can reach us through:<br><br>
                📧 Email: support@antviewcrm.com<br>
                📞 Phone: +91 1234567890<br>
                📍 Location: Bangalore, Karnataka<br><br>
                <a href="contact.html" style="color:#1a73e8;">Contact us →</a>`;
        } else if (lowerMessage.includes('about') || lowerMessage.includes('company') || lowerMessage.includes('who are you')) {
            response = `Antview CRM is a smart CRM solution built specifically for coaching centers and educational institutes. We help manage students, leads, fees, and communication in one platform.<br><br>
                <a href="about.html" style="color:#1a73e8;">Learn more about us →</a>`;
        } else if (lowerMessage.includes('whatsapp')) {
            response = `Yes! Our WhatsApp integration allows you to:<br><br>
                • Send automated notifications<br>
                • Bulk messaging to students/parents<br>
                • Use message templates<br>
                • Track delivery status<br><br>
                This feature is available in Professional and Enterprise plans.`;
        } else if (lowerMessage.includes('student') || lowerMessage.includes('how many')) {
            response = `Our plans support different student capacities:<br><br>
                • Starter: Up to 100 students<br>
                • Professional: Up to 500 students<br>
                • Enterprise: Unlimited students<br><br>
                You can upgrade anytime as your institute grows!`;
        } else if (lowerMessage.includes('thank')) {
            response = `You're welcome! 😊 Is there anything else I can help you with?`;
        } else if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
            response = `Hello! 👋 How can I assist you today? Feel free to ask about our features, pricing, or anything else!`;
        } else {
            response = `I'd be happy to help! Here are some things you can ask me about:<br><br>
                • Features and capabilities<br>
                • Pricing plans<br>
                • Getting started / Demo<br>
                • Contact information<br>
                • About Antview CRM<br><br>
                Or you can <a href="contact.html" style="color:#1a73e8;">contact our team</a> directly for specific questions.`;
        }

        this.addBotMessage(response);
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AntviewChatbot();
});
