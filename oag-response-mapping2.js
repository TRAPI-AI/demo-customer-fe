{
    "mappings": [
      {
        "xml": "Flight.FlightId",
        "json": "sequenceNumber"
      },
      {
        "xml": "Flight.FlightNumber",
        "json": "flightNumber"
      },
      {
        "xml": "Flight.CommercialAirline.AirlineCode",
        "json": "carrier.iata"
      },
      {
        "xml": "Flight.Departure.Airport.AirportCode",
        "json": "departure.airport.iata"
      },
      {
        "xml": "Flight.Departure.DateTime.Date",
        "json": "departure.date.utc"
      },
      {
        "xml": "Flight.Departure.DateTime.Time",
        "json": "departure.time.utc"
      },
      {
        "xml": "Flight.Departure.Airport.Terminal",
        "json": "departure.terminal"
      },
      {
        "xml": "Flight.Arrival.Airport.AirportCode",
        "json": "arrival.airport.iata"
      },
      {
        "xml": "Flight.Arrival.DateTime.Date",
        "json": "arrival.date.utc"
      },
      {
        "xml": "Flight.Arrival.DateTime.Time",
        "json": "arrival.time.utc"
      },
      {
        "xml": "Flight.Arrival.Airport.Terminal",
        "json": "arrival.terminal"
      },
      {
        "xml": "Flight.SvcType",
        "json": "serviceType.iata"
      },
      {
        "xml": "Flight.ScheduleStatus",
        "json": "scheduleInstanceKey"
      }
    ]
}