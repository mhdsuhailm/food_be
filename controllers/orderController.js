// // // const Order = require("../models/Order")
// // // const whatsappService = require("../services/whatsappService")

// // // exports.createOrder = async (req, res) => {
// // //   try {
// // //     const { phone, category, items, totalAmount } = req.body

// // //     const order = await Order.create({
// // //       phone,
// // //       category,
// // //       items,
// // //       totalAmount
// // //     })

// // //     // Build summary message
// // //     let summary = `🧾 *Order Summary*\n\n`

// // //     items.forEach((item, index) => {
// // //       summary += `${index + 1}. ${item.name} x${item.quantity} = ₹${item.price * item.quantity}\n`
// // //     })

// // //     summary += `\n💰 *Total:* ₹${totalAmount}`

// // //     // Send message to WhatsApp
// // //     await whatsappService.sendTextMessage(phone, summary)
// // //     console.log("WhatsApp message sent successfully")
// // //     res.json({
// // //       success: true,
// // //       message: "Order saved and summary sent to WhatsApp"
// // //     })

// // //   } catch (error) {
// // //     console.log(error)
// // //       console.log("WhatsApp send error:", err.response?.data || err.message)
// // //     res.status(500).json({ success: false })
// // //   }
// // // // }
// // // const Order = require("../models/Order")
// // // const whatsappService = require("../services/whatsappService")

// // // exports.createOrder = async (req, res) => {
// // //   try {

// // //     const { phone, items, totalAmount } = req.body

// // //     const order = await Order.create(req.body)

// // //     console.log("Order saved:", order)

// // //     let summary = `🧾 *Order Summary*\n\n`

// // //     items.forEach((item, index) => {
// // //       summary += `${index + 1}. ${item.name} x${item.quantity} = ₹${item.price * item.quantity}\n`
// // //     })

// // //     summary += `\n💰 Total: ₹${totalAmount}`

// // //     console.log("Sending WhatsApp message to:", phone)

// // //     const result = await whatsappService.sendTextMessage(phone, summary)

// // //     console.log("WhatsApp API response:", result)
// // // await whatsappService.sendTextMessage(phone, summary)

// // // setTimeout(async () => {

// // //   await whatsappService.sendImageMessage(
// // //     phone,
// // //     "https://media.giphy.com/media/gg8Q0J4HD2rFm5LTHe/giphy.gif",
// // //     "👨‍🍳 *Your food is being prepared!*"
// // //   )
// // // }, 3000)
// // //  // 🔹 After 2 minutes send another message
// // //     setTimeout(async () => {
// // //       try {

// // //         await whatsappService.sendTextMessage(
// // //           phone,
// // //           "🍽️ *Update:* Your food will be served in *5 minutes*. Thank you for your patience!"
// // //         )

// // //       } catch (err) {
// // //         console.log("Delayed message error:", err.response?.data || err.message)
// // //       }
// // //     }, 2 * 60 * 1000) // 2 minutes
// // //     res.json({
// // //       message: "Order placed",
// // //       order
// // //     })

// // //   } catch (error) {

// // //     console.log("WhatsApp error:", error.response?.data || error.message)

// // //     res.status(500).json({
// // //       error: "Order failed"
// // //     })
// // //   }
// // // }
// // const Order = require("../models/Order")
// // const whatsappService = require("../services/whatsappService")

// // exports.createOrder = async (req, res) => {
// //   try {

// //     const { phone, items } = req.body

// //     const totalAmount = items.reduce(
// //       (sum, item) => sum + item.price * item.quantity,
// //       0
// //     )

// //     const order = await Order.create({
// //       ...req.body,
// //       totalAmount
// //     })

// //     console.log("Order saved:", order)

// //     let summary = `🧾 *Order Summary*\n\n`

// //     items.forEach((item, index) => {
// //       summary += `${index + 1}. ${item.name} x${item.quantity} = ₹${item.price * item.quantity}\n`
// //     })

// //     summary += `\n💰 Total: ₹${totalAmount}`

// //     console.log("Sending summary...")

// //     // await whatsappService.sendTextMessage(phone, summary)

// //     // console.log("Summary sent successfully")

// //     // // PREPARING MESSAGE
// //     // setTimeout(async () => {
// //     //   try {

// //     //     console.log("Sending preparing message...")

// //     //     await whatsappService.sendImageMessage(
// //     //       phone,
// //     //       "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
// //     //       "👨‍🍳 Your food is being prepared!"
// //     //     )

// //     //     console.log("Preparing message sent")

// //     //   } catch (err) {
// //     //     console.log("Preparing message error:", err.response?.data || err.message)
// //     //   }
// //     // }, 3000)

// //     // // DELAYED MESSAGE
// //     // setTimeout(async () => {
// //     //   try {

// //     //     console.log("Sending ready message...")

// //     //     await whatsappService.sendTextMessage(
// //     //       phone,
// //     //       "🍽️ Update: Your food will be served in 5 minutes!"
// //     //     )

// //     //     console.log("Ready message sent")

// //     //   } catch (err) {
// //     //     console.log("Delayed message error:", err.response?.data || err.message)
// //     //   }
// //     // }, 120000)

// //     // res.json({
// //     //   message: "Order placed",
// //     //   order
// //     // })
// //     await whatsappService.sendTextMessage(phone, summary)

// // console.log("WhatsApp summary sent")

// // // send response first
// // res.json({
// //   message: "Order placed",
// //   order
// // })

// // // THEN schedule background messages
// // // setTimeout(async () => {
// // //   try {

// // //     console.log("Sending preparing message")

// // //     await whatsappService.sendImageMessage(
// // //       phone,
// // //       "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
// // //       "👨‍🍳 Your food is being prepared!"
// // //     )

// // //   } catch (err) {
// // //     console.log("Preparing message error:", err.response?.data || err.message)
// // //   }
// // // }, 3000)

// // // setTimeout(async () => {
// // //   try {

// // //     console.log("Sending ready message")

// // //     await whatsappService.sendTextMessage(
// // //       phone,
// // //       "🍽️ Update: Your food will be served in 5 minutes!"
// // //     )

// // //   } catch (err) {
// // //     console.log("Delayed message error:", err.response?.data || err.message)
// // //   }
// // // }, 120000)
// // await whatsappService.sendTextMessage(phone, summary)

// // console.log("WhatsApp summary sent")

// // // send preparing message immediately
// // await whatsappService.sendImageMessage(
// //   phone,
// //   "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
// //   "👨‍🍳 Your food is being prepared!"
// // )

// // console.log("Preparing message sent")

// // // send ready message
// // await whatsappService.sendTextMessage(
// //   phone,
// //   "🍽️ Your food will be served in about 5 minutes!"
// // )

// // console.log("Ready message sent")

// //   } catch (error) {

// //     console.log("Order error:", error)

// //     res.status(500).json({
// //       error: "Order failed"
// //     })
// //   }
// // }
// const Order = require("../models/Order")
// const whatsappService = require("../services/whatsappService")

// exports.createOrder = async (req, res) => {
//   try {

//     const { phone, items } = req.body

//     const totalAmount = items.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     )

//     const order = await Order.create({
//       ...req.body,
//       totalAmount
//     })

//     console.log("Order saved:", order)

//     // ORDER SUMMARY
//     let summary = `🧾 *Order Summary*\n\n`

//     items.forEach((item, index) => {
//       summary += `${index + 1}. ${item.name} x${item.quantity} = ₹${item.price * item.quantity}\n`
//     })

//     summary += `\n💰 Total: ₹${totalAmount}`

//     console.log("Sending summary")

//     await whatsappService.sendTextMessage(phone, summary)

//     console.log("Summary sent")

//     // PREPARING MESSAGE
//     // await whatsappService.sendImageMessage(
//     //   phone,
//     //   "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
//     //   "👨‍🍳 Your food is being prepared!"
//     // )

//     console.log("Preparing message sent")

//     // READY MESSAGE
//     await whatsappService.sendTextMessage(
//       phone,
//       "🍽️ Your food will be served in about 5 minutes!"
//     )

//     console.log("Ready message sent")

//     // SEND RESPONSE LAST
//     res.json({
//       message: "Order placed",
//       order
//     })

//   } catch (error) {

//     console.log("Order error:", error.response?.data || error.message)

//     res.status(500).json({
//       error: "Order failed"
//     })
//   }
// }
const Order = require("../models/Order")
const whatsappService = require("../services/whatsappService")

exports.createOrder = async (req, res) => {

  console.log("======== ORDER API START ========")

  try {

    console.log("Request body:", req.body)

    const { phone, items } = req.body

    console.log("Phone:", phone)
    console.log("Items:", items)

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    console.log("Calculated total:", totalAmount)

    const order = await Order.create({
      ...req.body,
      totalAmount
    })

    console.log("Order saved in DB:", order._id)

    let summary = `🧾 *Order Summary*\n\n`

    items.forEach((item, index) => {
      summary += `${index + 1}. ${item.name} x${item.quantity} = ₹${item.price * item.quantity}\n`
    })

    summary += `\n💰 Total: ₹${totalAmount}`

    console.log("Summary message built:")
    console.log(summary)

    // ===== SEND SUMMARY =====

    console.log("Sending SUMMARY to WhatsApp...")

    const summaryResult = await whatsappService.sendTextMessage(phone, summary)

    console.log("SUMMARY SENT SUCCESSFULLY")
    console.log("WhatsApp API response:", summaryResult)

    // ===== SEND SECOND MESSAGE =====

    const readyMessage =
      "🍽️ Your food will be served in about 5 minutes!"

    console.log("Sending SECOND message...")

    const readyResult = await whatsappService.sendTextMessage(
      phone,
      readyMessage
    )

    console.log("SECOND MESSAGE SENT SUCCESSFULLY")
    console.log("WhatsApp API response:", readyResult)

    console.log("Sending API response back to frontend")

    res.json({
      message: "Order placed",
      order
    })

    console.log("======== ORDER API END ========")

  } catch (error) {

    console.log("🚨 ERROR OCCURRED")
    console.log(error.response?.data || error.message)

    res.status(500).json({
      error: "Order failed"
    })
  }
}