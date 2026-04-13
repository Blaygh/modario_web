(() => {
  const pricingButtons = Array.from(document.querySelectorAll('.price-option'));
  const startButton = document.getElementById('startPremiumButton');
  const manageButton = document.getElementById('manageAppleButton');

  if (!pricingButtons.length || !startButton) {
    return;
  }

  const labelByPlan = {
    monthly: 'Start Premium Monthly',
    yearly: 'Start Premium Yearly'
  };

  const selectPlan = (plan) => {
    pricingButtons.forEach((button) => {
      const isSelected = button.dataset.plan === plan;
      button.classList.toggle('is-selected', isSelected);
      button.setAttribute('aria-checked', String(isSelected));
    });

    startButton.dataset.selectedPlan = plan;
    startButton.textContent = labelByPlan[plan] || 'Start Premium';
  };

  pricingButtons.forEach((button) => {
    button.addEventListener('click', () => {
      selectPlan(button.dataset.plan || 'yearly');
    });
  });

  startButton.addEventListener('click', () => {
    const selectedPlan = startButton.dataset.selectedPlan || 'yearly';
    if (typeof window.startPremiumPurchase === 'function') {
      window.startPremiumPurchase(selectedPlan);
      return;
    }

    window.dispatchEvent(new CustomEvent('billing:start-premium', {
      detail: { plan: selectedPlan }
    }));
  });

  manageButton?.addEventListener('click', () => {
    if (typeof window.openAppleSubscriptions === 'function') {
      window.openAppleSubscriptions();
      return;
    }

    window.dispatchEvent(new CustomEvent('billing:open-apple-subscriptions'));
  });

  selectPlan('yearly');
})();
