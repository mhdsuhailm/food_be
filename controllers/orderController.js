const Order = require("../models/Order")
const whatsappService = require("../services/whatsappService")

exports.createOrder = async (req, res) => {
  try {
    const { phone, category, items, totalAmount } = req.body

    const order = await Order.create({
      phone,
      category,
      items,
      totalAmount
    })

    // Build summary message
    let summary = `🧾 *Order Summary*\n\n`

    items.forEach((item, index) => {
      summary += `${index + 1}. ${item.name} x${item.quantity} = ₹${item.price * item.quantity}\n`
    })

    summary += `\n💰 *Total:* ₹${totalAmount}`

    // Send message to WhatsApp
    await whatsappService.sendTextMessage(phone, summary)
    console.log("WhatsApp message sent successfully")
    res.json({
      success: true,
      message: "Order saved and summary sent to WhatsApp"
    })

  } catch (error) {
    console.log(error)
      console.log("WhatsApp send error:", err.response?.data || err.message)
    res.status(500).json({ success: false })
  }
}