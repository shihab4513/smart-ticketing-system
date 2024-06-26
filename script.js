function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
    behavior: 'smooth'
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const seats = document.querySelectorAll('.sit.btn'); // Select all seat buttons
  const infoContainer = document.getElementById('info-n'); // Select the container to insert seat details
  let totalPrice = 0; // Initialize total price
  let selectedSeats = []; // Initialize an array to keep track of selected seats
  const seatCountElement = document.querySelector('svg text');
  let seatCount = 0;

  seats.forEach(seat => {
    seat.addEventListener('click', function () {
      const seatPrice = 550; // Price for each seat
      const seatId = this.textContent; // Get the seat number (e.g., A1, A2)
      const seatClass = 'Economy'; // Class for each seat
      if (this.classList.contains('selected')) {
        // If seat is already selected, deselect it
        this.classList.remove('selected');
        totalPrice -= seatPrice;
        seatCount--;
        selectedSeats = selectedSeats.filter(s => s.id !== seatId); // Remove seat from selectedSeats
      } else {
        // If seat is not selected, select it
        this.classList.add('selected');
        totalPrice += seatPrice;
        seatCount++;
        selectedSeats.push({ id: seatId, class: seatClass, price: seatPrice }); // Add seat to selectedSeats
      }
      // Update the total price display
      document.getElementById('total-price').textContent = `BDT ${totalPrice}`;
      seatCountElement.textContent = seatCount;

      // Clear previous seat details
      while (infoContainer.firstChild) {
        infoContainer.removeChild(infoContainer.firstChild);
      }
      // Create a new row for each selected seat
      selectedSeats.forEach(seat => {
        const seatRow = document.createElement('div');
        seatRow.classList.add('seat-row', 'grid', 'grid-cols-3', 'gap-x-24', 'py-2');
        seatRow.innerHTML = `
          <div class="seat-info">${seat.id}</div>
          <div class="seat-info">${seat.class}</div>
          <div class="seat-info">BDT ${seat.price}</div>
        `;
        infoContainer.appendChild(seatRow); // Append the new row to the container
      });
    });
  });
});
const couponInput = document.getElementById('cupon-code');
const applyButton = document.querySelector('.btn-cupon');
const grandTotalElement = document.getElementById('grand-total'); // Make sure this element has the id="grand-total" in your HTML

applyButton.addEventListener('click', function () {
  const couponCode = couponInput.value; // Get the entered coupon code
  let tprice = parseInt(document.getElementById('total-price').textContent.replace('BDT ', ''), 10); // Parse the total price as a number
  let discount = 0;

  if (couponCode === 'NEW15') {
    discount = tprice * 0.15; // 15% discount
  } else if (couponCode === 'Couple 20') {
    discount = tprice * 0.20; // 20% discount
  }

  const grandTotal = tprice - discount;
  grandTotalElement.textContent = `BDT ${grandTotal}`; // Update the grand total price
});
