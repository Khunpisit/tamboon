export const summaryDonations = (danations) => (
  danations.reduce((accumulator, value) => (accumulator + value))
);

export const handlePay = (self, id, amount, currency) => {
  
  return function() {
    fetch('http://localhost:3001/payments', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: `{ "charitiesId": ${id}, "amount": ${amount}, "currency": "${currency}" }`,
    })
      .then(function(resp) { return resp.json(); })
      .then(function() {
        self.props.dispatch({
          type: 'UPDATE_TOTAL_DONATE',
          amount,
        });
        self.props.dispatch({
          type: 'UPDATE_MESSAGE',
          message: `Thanks for donate ${amount}!`,
        });

        setTimeout(function() {
          self.props.dispatch({
            type: 'UPDATE_MESSAGE',
            message: '',
          });
        }, 2000);
      });
  }
}