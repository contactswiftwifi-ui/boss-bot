function generateTicket() {
  return 'TKT-' + Math.floor(1000 + Math.random() * 9000);
}

module.exports = { generateTicket };