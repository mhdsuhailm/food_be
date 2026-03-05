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

    // Prepare summary text
    let summary = `🧾 *Order Summary*\n\n`

    items.forEach(item => {
      summary += `🍽 ${item.name} x${item.quantity} = ₹${item.price * item.quantity}\n`
    })

    summary += `\n💰 Total: ₹${totalAmount}\n\n`
    summary += `Please confirm your order.`

    await whatsappService.sendInteractiveButtonMessage(
      phoneNumber,
      summary,
      [
        { id: `confirm_${order._id}`, title: "✅ Confirm" },
        { id: `cancel_${order._id}`, title: "❌ Cancel" }
      ]
    )

    res.json({ success: true })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false })
  }
}