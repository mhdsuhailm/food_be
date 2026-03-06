const Order = require("../models/Order")
const whatsappService = require("../services/whatsappService")

exports.createOrder = async (req, res) => {
  try {
    const { phoneNumber, category, items, totalAmount } = req.body

    const order = await Order.create({
      phoneNumber,
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
    await whatsappService.sendTextMessage(phoneNumber, summary)

    res.json({
      success: true,
      message: "Order saved and summary sent to WhatsApp"
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false })
  }
}