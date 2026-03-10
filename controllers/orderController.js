// const Order = require("../models/Order")
// const whatsappService = require("../services/whatsappService")

// exports.createOrder = async (req, res) => {
//   try {
//     const { phone, category, items, totalAmount } = req.body

//     const order = await Order.create({
//       phone,
//       category,
//       items,
//       totalAmount
//     })

//     // Build summary message
//     let summary = `🧾 *Order Summary*\n\n`

//     items.forEach((item, index) => {
//       summary += `${index + 1}. ${item.name} x${item.quantity} = ₹${item.price * item.quantity}\n`
//     })

//     summary += `\n💰 *Total:* ₹${totalAmount}`

//     // Send message to WhatsApp
//     await whatsappService.sendTextMessage(phone, summary)
//     console.log("WhatsApp message sent successfully")
//     res.json({
//       success: true,
//       message: "Order saved and summary sent to WhatsApp"
//     })

//   } catch (error) {
//     console.log(error)
//       console.log("WhatsApp send error:", err.response?.data || err.message)
//     res.status(500).json({ success: false })
//   }
// // }
// const Order = require("../models/Order")
// const whatsappService = require("../services/whatsappService")

// exports.createOrder = async (req, res) => {
//   try {

//     const { phone, items, totalAmount } = req.body

//     const order = await Order.create(req.body)

//     console.log("Order saved:", order)

//     let summary = `🧾 *Order Summary*\n\n`

//     items.forEach((item, index) => {
//       summary += `${index + 1}. ${item.name} x${item.quantity} = ₹${item.price * item.quantity}\n`
//     })

//     summary += `\n💰 Total: ₹${totalAmount}`

//     console.log("Sending WhatsApp message to:", phone)

//     const result = await whatsappService.sendTextMessage(phone, summary)

//     console.log("WhatsApp API response:", result)
// await whatsappService.sendTextMessage(phone, summary)

// setTimeout(async () => {

//   await whatsappService.sendImageMessage(
//     phone,
//     "https://media.giphy.com/media/gg8Q0J4HD2rFm5LTHe/giphy.gif",
//     "👨‍🍳 *Your food is being prepared!*"
//   )
// }, 3000)
//  // 🔹 After 2 minutes send another message
//     setTimeout(async () => {
//       try {

//         await whatsappService.sendTextMessage(
//           phone,
//           "🍽️ *Update:* Your food will be served in *5 minutes*. Thank you for your patience!"
//         )

//       } catch (err) {
//         console.log("Delayed message error:", err.response?.data || err.message)
//       }
//     }, 2 * 60 * 1000) // 2 minutes
//     res.json({
//       message: "Order placed",
//       order
//     })

//   } catch (error) {

//     console.log("WhatsApp error:", error.response?.data || error.message)

//     res.status(500).json({
//       error: "Order failed"
//     })
//   }
// }
const Order = require("../models/Order")
const whatsappService = require("../services/whatsappService")

exports.createOrder = async (req, res) => {
  try {

    const { phone, items, totalAmount } = req.body

    const order = await Order.create(req.body)

    console.log("Order saved:", order)

    let summary = `🧾 *Order Summary*\n\n`

    items.forEach((item, index) => {
      summary += `${index + 1}. ${item.name} x${item.quantity} = ₹${item.price * item.quantity}\n`
    })

    summary += `\n💰 Total: ₹${totalAmount}`

    console.log("Sending WhatsApp message to:", phone)

    // 1️⃣ Send order summary
    await whatsappService.sendTextMessage(phone, summary)

    // 2️⃣ After 3 seconds send preparing message
    setTimeout(async () => {
      try {

        await whatsappService.sendImageMessage(
          phone,
          "https://media.giphy.com/media/gg8Q0J4HD2rFm5LTHe/giphy.gif",
          "👨‍🍳 *Your food is being prepared!*"
        )

      } catch (err) {
        console.log("Preparing message error:", err.response?.data || err.message)
      }
    }, 3000)

    // 3️⃣ After 2 minutes send update message
    setTimeout(async () => {
      try {

        await whatsappService.sendTextMessage(
          phone,
          "🍽️ *Update:* Your food will be served in *5 minutes*. Thank you for your patience!"
        )

      } catch (err) {
        console.log("Delayed message error:", err.response?.data || err.message)
      }
    }, 2 * 60 * 1000)

    res.json({
      message: "Order placed",
      order
    })

  } catch (error) {

    console.log("WhatsApp error:", error.response?.data || error.message)

    res.status(500).json({
      error: "Order failed"
    })
  }
}