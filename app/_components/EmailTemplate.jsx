export const EmailTemplate = ({ clientInfo, selectedPlan }) => {
  // Your existing rendering logic here
  const { name: fullName, email, state } = clientInfo;
  const { planName, option, features, extraPrice } = selectedPlan;

  const calculateSubtotal = () => {
    let subtotal = 0;

    if (option) {
      subtotal -= option.discount || 0;
    }

    if (features) {
      Object.values(features)
        .filter((feature) => feature !== undefined)
        .forEach((feature) => {
          subtotal += feature.price || 0;
        });
    }

    if (extraPrice) {
      extraPrice.forEach((extra) => {
        subtotal += extra.price || 0;
      });
    }
    return subtotal;
  };

  const planFeatures = Object.values(features).map(feature => feature.name).join(', ');

  const planExtraPrice = extraPrice.map(extra => extra.name).join(', ');

  return `
    <table width="100%" cellPadding="0" cellSpacing="0">
      <tr>
        <td style="padding: 20px; font-family: Arial, sans-serif; font-size: 16px; color: #333;">
          <h2><strong>Client Full Name:</strong> ${fullName}</h2>
          <h3><strong>Client Email:</strong> ${email}</h3>
          <h3><strong>Client State:</strong> ${state}</h3>
          <hr />
          <h2><strong>Plan Name:</strong> ${planName}</h2>
          <h2><strong>Plan Features:</strong> ${planFeatures}</h2>
          <h2><strong>Plan Agent:</strong> ${option.name}</h2>
          <h2><strong>Extra Price:</strong> ${planExtraPrice}</h2>
          <h2><strong>Total Price:</strong> $${calculateSubtotal()}</h2>
        </td>
      </tr>
    </table>
  `;
};
