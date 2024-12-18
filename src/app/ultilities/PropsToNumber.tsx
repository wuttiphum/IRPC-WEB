export function convertPropertyToNumber(data: any, propertyName: string, rename?: string) {
  // Loop through each element in the data array
  if (!data) return []
  for (let i = 0; i < data.length; i++) {
    const currentItem = data[i];

    // Check if the current item has the specified property
    if (currentItem.hasOwnProperty(propertyName)) {
      const propertyValue = currentItem[propertyName];

      // Attempt conversion using parseFloat (robust for decimals)
      let numericValue: any = parseFloat(propertyValue);

      // Handle cases where conversion is not possible (e.g., "N/A")
      if (isNaN(numericValue)) {
        // Handle "N/A" or other non-numeric values as needed (e.g., set to null)
        numericValue = null;
      }

      // Update the property value in the current item
      currentItem[propertyName] = numericValue;
      if (rename)
        currentItem[rename] = numericValue;
    }
  }

  // Return the modified data array
  return data;
}