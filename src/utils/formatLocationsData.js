export const formatLocationsData = (data) => {
    const result = data.map(location => ({
      city: location.name,
      state: location.state || "N/A",
        country: location.country
    }));
    return result;
}

export default formatLocationsData;