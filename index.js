let input = document.getElementById("input")
paypal
  .Buttons({
    // Sets up the transaction when a payment button is clicked
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: input.value,
            },
          },
        ],
      })
    },

    onApprove: function (data, actions) {
      return actions.order.capture().then(function (orderData) {
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2),
        )
        var transaction = orderData.purchase_units[0].payments.captures[0]
        alert(
          "Transaction " +
            transaction.status +
            ": " +
            transaction.id +
            "\n\nSee console for all available details",
        )
      })
    },
  })
  .render("#paypal-button")
