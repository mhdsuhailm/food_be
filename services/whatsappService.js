const axios = require('axios');
// const logger = require('../logger');

class WhatsAppService {
  constructor() {
    this.baseURL = `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}`;    
    this.headers = {
      'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json'
    };
  }

  async sendMessage(to, messageData) {
    try {
      const url = `${this.baseURL}/messages`;
      const response = await axios.post(url, messageData, { headers: this.headers });
      
    //   logger.info(`Message sent to ${to}`, {
    //     messageId: response.data?.messages?.[0]?.id,
    //     recipient: to
    //   });
      
      return response.data;
    } 
    catch (error) {
    //   logger.error('Error sending WhatsApp message', {
    //     error: error.response?.data || error.message,
    //     recipient: to,
    //     data: messageData
    //   });
      
  console.log("FULL ERROR:", error.response?.data || error.message)
  // res.sendStatus(500)

      throw error;
    }
  }

  async sendTextMessage(to, text) {
    const messageData = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to,
      type: 'text',
      text: { body: text }
    };
    
    return this.sendMessage(to, messageData);
  }

  async sendInteractiveButtonMessage(to, text, buttons) {
    const messageData = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to,
      type: 'interactive',
      interactive: {
        type: 'button',
        body: { text: text },
        action: {
          buttons: buttons.map((btn, index) => ({
            type: 'reply',
            reply: {
              id: btn.id?? `btn_${index + 1}`,
              title: btn.title
            }
          }))
        }
      }
    };
    
    return this.sendMessage(to, messageData);
  }
async sendCTA(to, text, buttonText, urlLink) {
  const url = `${this.baseURL}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    type: "interactive",
    interactive: {
      type: "cta_url",
      body: { text },
      action: {
        name: "cta_url",
        parameters: {
          display_text: buttonText,
          url: urlLink
        }
      }
    }
  };

  return axios.post(url, payload, { headers: this.headers });
}


async sendImageMessage(to, imageUrl, caption) {
  await axios.post(
    `${this.url}/${this.phoneNumberId}/messages`,
    {
      messaging_product: "whatsapp",
      to: to,
      type: "image",
      image: {
        link: imageUrl,
        caption: caption
      }
    },
    {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    }
  )
}

//   async sendListMessage(to, text, buttonText, sections) {
//     const messageData = {
//       messaging_product: 'whatsapp',
//       recipient_type: 'individual',
//       to: to,
//       type: 'interactive',
//       interactive: {
//         type: 'list',
//         body: { text: text },
//         action: {
//           button: buttonText,
//           sections: sections
//         }
//       }
//     };
    
//     return this.sendMessage(to, messageData);
//   }

//   async sendQuickReply(to, text, options) {
//     const messageData = {
//       messaging_product: 'whatsapp',
//       recipient_type: 'individual',
//       to: to,
//       type: 'interactive',
//       interactive: {
//         type: 'button',
//         body: { text: text },
//         action: {
//           buttons: options.map((opt, index) => ({
//             type: 'reply',
//             reply: {
//               id: `quick_${index}`,
//               title: opt
//             }
//           }))
//         }
//       }
//     };
    
//     return this.sendMessage(to, messageData);
//   }
}

module.exports = new WhatsAppService();