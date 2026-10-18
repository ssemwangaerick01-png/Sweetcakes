// Sweet Delights website interactions
// WhatsApp number uses country code + number, digits only.
const WHATSAPP_NUMBER = "256756570327";
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const toast = document.getElementById("toast");
const cakeChoice = document.getElementById("cakeChoice");
document.getElementById("year").textContent = new Date().getFullYear();
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));
document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  const category = button.dataset.filter;
  document.querySelectorAll(".product-card").forEach(card => {
    card.hidden = category !== "all" && card.dataset.category !== category;
  });
}));
document.querySelectorAll(".add-button").forEach(button => button.addEventListener("click", () => {
  cakeChoice.value = button.dataset.product;
  document.getElementById("order").scrollIntoView({behavior:"smooth"});
  showToast(button.dataset.product + " selected. Complete the order form below.");
}));
const eventDate = document.getElementById("eventDate");
const today = new Date();
eventDate.min = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
document.getElementById("orderForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const cake = cakeChoice.value;
  const date = eventDate.value;
  const details = document.getElementById("details").value.trim();
  if (!name || !phone || !cake || !date) {
    document.getElementById("formMessage").textContent = "Please complete all required fields.";
    return;
  }
  const message = `Hello Sweet Delights! I would like to place a cake order.\n\nName: ${name}\nPhone: ${phone}\nCake: ${cake}\nDate needed: ${date}\nDetails: ${details || "Not specified"}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  document.getElementById("formMessage").textContent = "Opening WhatsApp with your order details. Please review and send the message to confirm your request.";
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3200);
}