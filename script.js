
  function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
      behavior: 'smooth'
    })
  };


  document.addEventListener('DOMContentLoaded', function() {
    const seats = document.querySelectorAll('.sit.btn'); // Select all seat buttons
    const seatCountElement = document.querySelector('svg text');

    const seatNoElement = document.getElementById('seat-no'); // Select the seat number display element
    const seatClassElement = document.getElementById('seat-class'); // Select the seat class display element
    const perSeatPriceElement = document.getElementById('per-seat-price'); 
   
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0; // Initialize total price
    let seatCount = 0;
    let selectedSeats = [];
  
    seats.forEach(seat => {
      seat.addEventListener('click', function() {
        const seatPrice = 550; // Price for each seat
        const seatId = this.textContent; // Get the seat number (e.g., A1, A2)
        const seatClass = 'Economy class';
        if (this.classList.contains('selected')) {
          // If seat is already selected, deselect it
          this.classList.remove('selected');
          totalPrice -= seatPrice;
          seatCount--;
          selectedSeats = selectedSeats.filter(s => s !== seatId);
        } else {
          // If seat is not selected, select it
          this.classList.add('selected');
          totalPrice += seatPrice;
          seatCount++;
          selectedSeats.push(seatId);
        }
        // Update the payment summary
        for(let i=0;i<seatCount;i++){
            seatNoElement.textContent = selectedSeats[i];
            seatClassElement.textContent = seatClass;
        }
        
        // seatNoElement.textContent = selectedSeats.join(', ');
        // seatClassElement.textContent = seatClass;
        totalPriceElement.textContent = `BDT ${totalPrice}`;
        seatCountElement.textContent = seatCount;
      });
     
    });
    
  });


