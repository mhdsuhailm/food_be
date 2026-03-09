const User = require('../models/User')
const whatsappService = require('../services/whatsappService')

class MessageController {
  // async verifyWebhook(req, res) {
  //   const mode = req.query["hub.mode"]
  //   const token = req.query["hub.verify_token"]
  //   const challenge = req.query["hub.challenge"]

  //   if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
  //     return res.status(200).send(challenge)
  //   }

  //   res.sendStatus(403)
  // }

  async receiveMessage (req, res) {
    try {
      const message = req.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]

      if (!message) return res.sendStatus(200)

      const from = message.from

      // let user = await User.findOne({ phoneNumber: from })
      let user = await User.findOne({
        $or: [{ phone: from }, { phoneNumber: from }]
      })

      // if (!user) {
      //   user = await User.create({ phoneNumber: from })
      // }

      if (!user) {
        user = await User.create({
          name: 'WhatsApp User',
          phone: from
        })
      }

      // STEP 1 — Greeting
      if (message.type === 'text') {
        const text = message.text.body.trim().toLowerCase()

        if (text === 'hi' || text === 'hello') {
          await whatsappService.sendImageMessage(
    from,
    "https://res.cloudinary.com/dzk3hte2r/image/upload/v1773042235/d765a89349a5fccc1794ec8e7ba5d9a3c57b177b_hpoulz.png",
    "Welcome to Cresent 🍽️\n\nAuthentic South Indian & Non-Veg Specials."
  )
          await whatsappService.sendInteractiveButtonMessage(
            from,
            'Please choose your meal type:',
            [
              { id: 'breakfast', title: '🍳 Breakfast' },
              { id: 'lunch', title: '🍛 Lunch' },
              { id: 'dinner', title: '🌙 Dinner' }
            ]
          )

          user.currentStep = 'WAITING_FOR_CATEGORY'
          await user.save()
        }
      }

      // STEP 2 — Handle Button Click
      if (message.type === 'interactive') {
        const buttonId = message.interactive.button_reply?.id

        if (user.currentStep === 'WAITING_FOR_CATEGORY') {
          let menuType = null

          if (buttonId === 'breakfast') menuType = 'breakfast'
          if (buttonId === 'lunch') menuType = 'lunch'
          if (buttonId === 'dinner') menuType = 'dinner'

          if (menuType) {
            const baseURL = process.env.FRONTEND_URL

            // const menuURL = `${baseURL}/menu/${menuType}?phone=${from}`
            const jwt = require('jsonwebtoken')

            const token = jwt.sign(
              { userId: user._id },
              process.env.JWT_SECRET,
              { expiresIn: '2h' }
            )

            const menuURL = `${baseURL}/menu/${menuType}?token=${token}`
            await whatsappService.sendCTA(
              from,
              `Click below to view ${menuType} menu 🍽️`,
              'Open Menu',
              menuURL
            )

            user.currentStep = 'MENU_OPENED'
            await user.save()
          }
        }
      }

      res.sendStatus(200)
    } catch (error) {
      console.log('Error:', error.message)
      res.sendStatus(500)
    }
  }
}

module.exports = new MessageController()
