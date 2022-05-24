const paymentStatuses = [
    'New',
    'Accepted',
    'Paid'
  ]
  
  export default function PaymentDescription({ value }) {
    return <a>{paymentStatuses[value]}</a>
  }