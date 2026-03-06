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
// }
const Order = require("../models/Order")
const whatsappService = require("../services/whatsappService")

exports.createOrder = async (req, res) => {
  try {

    const { phone, items, totalAmount } = req.body

    // Save order
    const order = await Order.create(req.body)

    console.log("Order saved:", order)

    // Build summary
    let summary = `🧾 *Order Summary*\n\n`

    items.forEach((item, index) => {
      summary += `${index + 1}. ${item.name} x${item.quantity} = ₹${item.price * item.quantity}\n`
    })

    summary += `\n💰 *Total:* ₹${totalAmount}`

    console.log("Sending WhatsApp message to:", phone)

    // Send message
    await whatsappService.sendTextMessage(phone, summary)

    console.log("WhatsApp summary sent")

    res.json({
      message: "Order placed",
      order
    })

  } catch (error) {
    console.log("Order error:", error.response?.data || error.message)

    res.status(500).json({
      error: "Order failed"
    })
  }
}