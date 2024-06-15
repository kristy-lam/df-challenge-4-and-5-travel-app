export const formatLocationsData = (data) => {
  return data.map((location) => ({
    city: location.name,
    state: location.state || "N/A",
    country: location.country,
  }));
};

export default formatLocationsData;
