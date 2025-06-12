export const toFixedIfNecessary = (value: number, decimals = 1) =>
	+parseFloat(value.toString()).toFixed(decimals);
